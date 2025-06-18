# 🔗 Guia de Integração n8n + Supabase

## 📋 Dados que chegam no Webhook n8n

```json
{
  "name": "João Silva",
  "whatsapp": "(11) 99999-9999",
  "storeUrl": "loja-joao.com.br",
  "monthlyRevenue": "100k-300k",
  "platform": "shopify",
  "trafficInvestment": "10k-30k",
  "agreement": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "landing_page",
  "domain": "e2no.com.br",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit",
  "referrer": "https://google.com",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 🔧 Query para Inserir no Supabase (nó SQL)

```sql
INSERT INTO leads (
  name, 
  whatsapp, 
  store_url, 
  monthly_revenue, 
  platform, 
  traffic_investment, 
  agreement,
  source,
  domain,
  user_agent,
  referrer,
  session_id
) VALUES (
  $json.name,
  $json.whatsapp,
  $json.storeUrl,
  $json.monthlyRevenue,
  $json.platform,
  $json.trafficInvestment,
  $json.agreement,
  $json.source,
  $json.domain,
  $json.userAgent,
  $json.referrer,
  $json.sessionId::uuid
) RETURNING id, uuid, score;
```

## 📊 Queries Úteis para Analytics

### Dashboard Principal
```sql
SELECT * FROM leads_dashboard;
```

### Leads por Status
```sql
SELECT 
  status,
  COUNT(*) as total,
  AVG(score) as avg_score
FROM leads 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY status
ORDER BY total DESC;
```

### Leads de Hoje
```sql
SELECT 
  id,
  name,
  whatsapp,
  monthly_revenue,
  platform,
  score,
  created_at
FROM leads 
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC;
```

### Top Leads por Score
```sql
SELECT 
  name,
  whatsapp,
  store_url,
  monthly_revenue,
  platform,
  score,
  status
FROM leads 
WHERE score >= 70 
  AND status = 'new'
ORDER BY score DESC, created_at DESC
LIMIT 10;
```

## 🤖 Fluxo n8n Recomendado

1. **Webhook** - Recebe dados do formulário
2. **Supabase Insert** - Insere lead na tabela
3. **Conditional** - Verifica score (>= 70 = alta prioridade)
4. **WhatsApp** - Envia mensagem personalizada
5. **Supabase Update** - Atualiza status para 'contacted'

## 🎯 Campos de Score (Automático)

- **Faturamento**:
  - 50k-100k: +30 pontos
  - 100k-300k: +60 pontos  
  - 300k+: +90 pontos

- **Investimento**:
  - até 10k: +10 pontos
  - 10k-30k: +20 pontos
  - 30k+: +30 pontos

- **Plataforma**:
  - Shopify: +10 pontos
  - WooCommerce/Nuvemshop: +5 pontos
  - Outras: +0 pontos

**Score máximo**: 100 pontos

## 🔒 Segurança

- RLS habilitado
- INSERT permitido para anônimos (webhook)
- SELECT/UPDATE apenas para autenticados
- Validação de dados via CHECK constraints 