-- ====================================================================
-- SCHEMA BÁSICO SUPABASE - APENAS DADOS ESSENCIAIS
-- ====================================================================

-- Dropar tabela se existir (para recomeçar limpo)
DROP TABLE IF EXISTS leads;

-- Criar tabela leads básica
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  
  -- Dados do formulário
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL UNIQUE, -- Identificador único do cliente
  store_url TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL,
  platform TEXT NOT NULL,
  traffic_investment TEXT NOT NULL,
  agreement BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps básicos
  timestamp TIMESTAMPTZ, -- Timestamp do frontend
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Comentários básicos
COMMENT ON TABLE leads IS 'Tabela básica de leads da landing page';
COMMENT ON COLUMN leads.whatsapp IS 'WhatsApp como identificador único do cliente';

-- Índice básico para performance
CREATE INDEX idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Inserir dados de teste para validar
INSERT INTO leads (name, whatsapp, store_url, monthly_revenue, platform, traffic_investment, agreement, timestamp) 
VALUES (
  'Teste Básico',
  '11999999999',
  'teste.com.br',
  '100k-300k',
  'shopify',
  '10k-30k',
  true,
  NOW()
);

-- Verificar se funcionou
SELECT * FROM leads; 