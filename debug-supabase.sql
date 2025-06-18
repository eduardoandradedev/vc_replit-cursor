-- ====================================================================
-- DEBUGGING SUPABASE - VERIFICAR SCHEMA
-- ====================================================================

-- 1. Verificar se a tabela existe
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_name = 'leads';

-- 2. Verificar estrutura da tabela
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;

-- 3. Verificar constraints
SELECT 
  constraint_name, 
  constraint_type, 
  table_name
FROM information_schema.table_constraints 
WHERE table_name = 'leads';

-- 4. Verificar triggers
SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'leads';

-- 5. Teste simples de INSERT (para ver erro específico)
INSERT INTO leads (
  name, 
  whatsapp, 
  store_url, 
  monthly_revenue, 
  platform, 
  traffic_investment, 
  agreement
) VALUES (
  'Teste Debug',
  '11999999999',
  'teste.com.br',
  '100k-300k',
  'shopify',
  '10k-30k',
  true
) RETURNING id, uuid, score; 