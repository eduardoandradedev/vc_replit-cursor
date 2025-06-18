-- ====================================================================
-- SCHEMA PARA SUPABASE - RASTREAMENTO PROFISSIONAL LANDING PAGE
-- ====================================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- TABELA LEADS
-- ====================================================================

CREATE TABLE IF NOT EXISTS leads (
  -- Identificadores únicos
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  -- Dados do formulário (obrigatórios)
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  store_url TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL CHECK (monthly_revenue IN ('50k-100k', '100k-300k', '300k+')),
  platform TEXT NOT NULL CHECK (platform IN ('shopify', 'woocommerce', 'nuvemshop', 'other')),
  traffic_investment TEXT NOT NULL CHECK (traffic_investment IN ('up-to-10k', '10k-30k', '30k+')),
  agreement BOOLEAN NOT NULL DEFAULT false,
  
  -- Dados de tracking/analytics
  source TEXT DEFAULT 'landing_page',
  domain TEXT,
  user_agent TEXT,
  referrer TEXT,
  session_id UUID,
  
  -- Dados de qualificação (para n8n/vendas)
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'disqualified', 'converted')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  
  -- Dados de contato/vendas
  contacted_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  
  -- Metadados
  ip_address INET,
  country TEXT,
  city TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- ====================================================================

COMMENT ON TABLE leads IS 'Tabela principal para armazenar leads capturados da landing page de rastreamento profissional';
COMMENT ON COLUMN leads.uuid IS 'UUID único para referência externa (n8n, APIs)';
COMMENT ON COLUMN leads.monthly_revenue IS 'Faturamento mensal: 50k-100k, 100k-300k, 300k+';
COMMENT ON COLUMN leads.platform IS 'Plataforma de e-commerce: shopify, woocommerce, nuvemshop, other';
COMMENT ON COLUMN leads.traffic_investment IS 'Investimento mensal em tráfego: up-to-10k, 10k-30k, 30k+';
COMMENT ON COLUMN leads.status IS 'Status do lead no funil de vendas';
COMMENT ON COLUMN leads.score IS 'Score de qualificação (0-100)';

-- ====================================================================
-- ÍNDICES PARA PERFORMANCE
-- ====================================================================

-- Índices principais
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_uuid ON leads(uuid);

-- Índices compostos para analytics
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source_created ON leads(source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_platform_revenue ON leads(platform, monthly_revenue);

-- Índice para busca por período (removido - CURRENT_DATE não é IMMUTABLE)
-- CREATE INDEX IF NOT EXISTS idx_leads_date_range ON leads(created_at) WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';

-- Índice simples para data (mais eficiente para consultas temporais)
CREATE INDEX IF NOT EXISTS idx_leads_created_at_btree ON leads USING btree(created_at DESC);

-- ====================================================================
-- TRIGGER PARA UPDATED_AT
-- ====================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================================

-- Habilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT anônimo (webhook n8n)
CREATE POLICY "Permitir INSERT de leads via webhook"
ON leads FOR INSERT
WITH CHECK (true);

-- Política para SELECT apenas para usuários autenticados
CREATE POLICY "Permitir SELECT para usuários autenticados"
ON leads FOR SELECT
USING (auth.role() = 'authenticated');

-- Política para UPDATE apenas para usuários autenticados
CREATE POLICY "Permitir UPDATE para usuários autenticados"
ON leads FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ====================================================================
-- VIEWS PARA ANALYTICS
-- ====================================================================

-- View para dashboard de leads
CREATE VIEW leads_dashboard AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as leads_today,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as leads_week,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_month,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
  COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'qualified')::NUMERIC / NULLIF(COUNT(*), 0)) * 100, 2
  ) as qualification_rate,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'converted')::NUMERIC / NULLIF(COUNT(*), 0)) * 100, 2
  ) as conversion_rate
FROM leads;

-- View para análise por plataforma
CREATE VIEW leads_by_platform AS
SELECT 
  platform,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
  COUNT(*) FILTER (WHERE status = 'converted') as converted,
  ROUND(AVG(score)::NUMERIC, 2) as avg_score
FROM leads
GROUP BY platform
ORDER BY total DESC;

-- View para análise por faturamento
CREATE VIEW leads_by_revenue AS
SELECT 
  monthly_revenue,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
  COUNT(*) FILTER (WHERE status = 'converted') as converted,
  ROUND(AVG(score)::NUMERIC, 2) as avg_score
FROM leads
GROUP BY monthly_revenue
ORDER BY 
  CASE monthly_revenue
    WHEN '50k-100k' THEN 1
    WHEN '100k-300k' THEN 2
    WHEN '300k+' THEN 3
  END;

-- ====================================================================
-- FUNÇÃO PARA CALCULAR SCORE AUTOMÁTICO
-- ====================================================================

CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  base_score INTEGER := 0;
BEGIN
  -- Score base por faturamento
  CASE NEW.monthly_revenue
    WHEN '50k-100k' THEN base_score := base_score + 30;
    WHEN '100k-300k' THEN base_score := base_score + 60;
    WHEN '300k+' THEN base_score := base_score + 90;
  END CASE;
  
  -- Score por investimento em tráfego
  CASE NEW.traffic_investment
    WHEN 'up-to-10k' THEN base_score := base_score + 10;
    WHEN '10k-30k' THEN base_score := base_score + 20;
    WHEN '30k+' THEN base_score := base_score + 30;
  END CASE;
  
  -- Bonus por plataforma (Shopify tem melhor fit)
  CASE NEW.platform
    WHEN 'shopify' THEN base_score := base_score + 10;
    WHEN 'woocommerce' THEN base_score := base_score + 5;
    WHEN 'nuvemshop' THEN base_score := base_score + 5;
    WHEN 'other' THEN base_score := base_score + 0;
  END CASE;
  
  -- Garantir que não passe de 100
  NEW.score := LEAST(base_score, 100);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para calcular score automaticamente
CREATE TRIGGER calculate_score_trigger
  BEFORE INSERT OR UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION calculate_lead_score();

-- ====================================================================
-- DADOS DE TESTE (OPCIONAL - REMOVER EM PRODUÇÃO)
-- ====================================================================

-- Comentar/descomentar conforme necessário
/*
INSERT INTO leads (name, whatsapp, store_url, monthly_revenue, platform, traffic_investment, agreement) VALUES
('João Silva', '(11) 99999-9999', 'loja-joao.com.br', '100k-300k', 'shopify', '10k-30k', true),
('Maria Santos', '(21) 88888-8888', 'maria-store.com.br', '300k+', 'woocommerce', '30k+', true),
('Pedro Costa', '(31) 77777-7777', 'pedro-shop.com.br', '50k-100k', 'nuvemshop', 'up-to-10k', true);
*/

-- ====================================================================
-- GRANTS E PERMISSÕES FINAIS
-- ====================================================================

-- Garantir que o usuário anônimo possa inserir
GRANT INSERT ON leads TO anon;
GRANT USAGE ON SEQUENCE leads_id_seq TO anon;

-- Usuários autenticados podem ver e atualizar
GRANT SELECT, UPDATE ON leads TO authenticated;

-- ====================================================================
-- CONCLUSÃO DO SETUP
-- ====================================================================

-- Log de confirmação
DO $$
BEGIN
  RAISE NOTICE 'Schema de leads criado com sucesso!';
  RAISE NOTICE 'Tabelas: leads';
  RAISE NOTICE 'Views: leads_dashboard, leads_by_platform, leads_by_revenue';
  RAISE NOTICE 'Triggers: score automático, updated_at';
  RAISE NOTICE 'RLS: habilitado com políticas de segurança';
  RAISE NOTICE 'Pronto para receber dados do webhook n8n!';
END $$; 