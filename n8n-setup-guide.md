# 🔧 Guia de Configuração N8N - Passo a Passo

## 📋 **PAYLOAD DE TESTE**
Use este JSON para testar o webhook:
```json
{
  "name": "João Silva da Costa",
  "whatsapp": "(11) 99876-5432", 
  "storeUrl": "loja-joao-silva.com.br",
  "monthlyRevenue": "100k-300k",
  "platform": "shopify",
  "trafficInvestment": "10k-30k",
  "agreement": true,
  "timestamp": "2024-01-15T14:30:45.123Z",
  "source": "landing_page",
  "domain": "e2no.com.br",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "referrer": "https://google.com/search?q=rastreamento+ecommerce",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 🔗 **SEQUÊNCIA DE NÓS DO WORKFLOW**

### **1. Webhook - Captura Lead**
- **Tipo:** `Webhook`
- **Método:** `POST`
- **Path:** `webhook/897f39f5-1956-4147-88e4-9d48b44b6234`
- **Response Mode:** `Response Node`

### **2. Function - Validar Dados**
- **Tipo:** `Function`
- **Código JavaScript:**
```javascript
// Validar dados obrigatórios
const requiredFields = ['name', 'whatsapp', 'storeUrl', 'monthlyRevenue', 'platform', 'trafficInvestment', 'agreement'];

for (const field of requiredFields) {
  if (!$json.body[field]) {
    throw new Error(`Campo obrigatório ausente: ${field}`);
  }
}

// Limpar e formatar dados
const cleanData = {
  name: $json.body.name.trim(),
  whatsapp: $json.body.whatsapp.replace(/\D/g, ''), // Remove caracteres não numéricos
  store_url: $json.body.storeUrl.toLowerCase().trim(),
  monthly_revenue: $json.body.monthlyRevenue,
  platform: $json.body.platform,
  traffic_investment: $json.body.trafficInvestment,
  agreement: $json.body.agreement,
  source: $json.body.source || 'landing_page',
  domain: $json.body.domain,
  user_agent: $json.body.userAgent,
  referrer: $json.body.referrer,
  session_id: $json.body.sessionId
};

return [{ json: cleanData }];
```

### **3. Supabase - Inserir Lead**
- **Tipo:** `Supabase`
- **Operação:** `Insert`
- **Tabela:** `leads`
- **Campos:**
  - `name`: `={{ $json.name }}`
  - `whatsapp`: `={{ $json.whatsapp }}`
  - `store_url`: `={{ $json.store_url }}`
  - `monthly_revenue`: `={{ $json.monthly_revenue }}`
  - `platform`: `={{ $json.platform }}`
  - `traffic_investment`: `={{ $json.traffic_investment }}`
  - `agreement`: `={{ $json.agreement }}`
  - `source`: `={{ $json.source }}`
  - `domain`: `={{ $json.domain }}`
  - `user_agent`: `={{ $json.user_agent }}`
  - `referrer`: `={{ $json.referrer }}`
  - `session_id`: `={{ $json.session_id }}`

### **4. IF - Verificar Score**
- **Tipo:** `IF`
- **Condição:** `Number`
- **Valor 1:** `={{ $json.score }}`
- **Operação:** `Larger Equal`
- **Valor 2:** `70`

### **5A. WhatsApp - Alta Prioridade (Score >= 70)**
- **Tipo:** `HTTP Request`
- **Método:** `POST`
- **URL:** `SUA_URL_WHATSAPP_API`
- **Body:**
```json
{
  "phone": "={{ $json.whatsapp }}",
  "message": "🚀 Olá {{ $json.name }}! Vi que você tem um e-commerce que fatura {{ $json.monthly_revenue.replace('k', ' mil').replace('+', ' ou mais') }} por mês na plataforma {{ $json.platform }}. \n\nSeu perfil é EXATO para nossa solução de Rastreamento Profissional! \n\nQuando podemos conversar sobre como aumentar a precisão dos seus dados e escalar suas campanhas? \n\n📱 Responda aqui mesmo para agendar."
}
```

### **5B. WhatsApp - Padrão (Score < 70)**
- **Tipo:** `HTTP Request`
- **Método:** `POST` 
- **URL:** `SUA_URL_WHATSAPP_API`
- **Body:**
```json
{
  "phone": "={{ $json.whatsapp }}",
  "message": "Olá {{ $json.name }}! Obrigado pelo interesse em nossa solução de Rastreamento Profissional. \n\nEm breve nossa equipe entrará em contato para apresentar como podemos ajudar seu e-commerce {{ $json.store_url }} a ter dados mais precisos. \n\nAguarde nosso retorno! 📊"
}
```

### **6. Supabase - Atualizar Status**
- **Tipo:** `Supabase`
- **Operação:** `Update`
- **Tabela:** `leads`
- **Filtro:** `uuid = {{ $json.uuid }}`
- **Campos:**
  - `status`: `contacted`
  - `contacted_at`: `={{ new Date().toISOString() }}`

### **7. Webhook Response - Sucesso**
- **Tipo:** `Respond to Webhook`
- **Formato:** `JSON`
- **Body:**
```json
{
  "success": true,
  "message": "Lead processado com sucesso",
  "leadId": "{{ $json.uuid }}",
  "score": {{ $json.score }}
}
```

## ⚙️ **CONFIGURAÇÕES ESSENCIAIS**

### **Credenciais Supabase:**
- **URL:** `https://SEU_PROJECT_ID.supabase.co`
- **Key:** `SUA_ANON_KEY`

### **Credenciais WhatsApp:**
Substitua `SUA_URL_WHATSAPP_API` pela URL da sua API WhatsApp:
- Evolution API
- 360Dialog
- Twilio
- Ou outra de sua preferência

## 🔗 **CONEXÕES ENTRE NÓS**

```
Webhook → Validar Dados → Supabase Insert → Verificar Score
                                              ↓
                                         Score >= 70?
                                        ↙         ↘
                              WhatsApp Alto    WhatsApp Padrão
                                        ↘         ↙
                                     Atualizar Status
                                            ↓
                                    Webhook Response
```

## 🧪 **COMO TESTAR**

1. **Copie o payload de teste** acima
2. **Cole no teste do webhook** n8n
3. **Execute o workflow**
4. **Verifique no Supabase** se o lead foi inserido
5. **Confirme o score calculado** automaticamente
6. **Teste o WhatsApp** (se configurado)

## 📊 **SCORES ESPERADOS**

### **Lead de Teste (payload acima):**
- Faturamento `100k-300k`: **+60 pontos**
- Investimento `10k-30k`: **+20 pontos**  
- Plataforma `shopify`: **+10 pontos**
- **Total: 90 pontos** (Alta prioridade)

### **Outros Exemplos:**
- E-commerce pequeno (50k-100k + up-to-10k + other): **40 pontos**
- E-commerce grande (300k+ + 30k+ + shopify): **130 → 100 pontos**

## ✅ **CHECKLIST FINAL**

- [ ] Webhook configurado e testado
- [ ] Supabase credenciais corretas
- [ ] Schema da tabela `leads` criado
- [ ] Triggers de score funcionando
- [ ] WhatsApp API configurada
- [ ] Teste completo executado
- [ ] Leads aparecendo no Supabase

**Pronto! Seu funil automatizado está funcionando!** 🚀 