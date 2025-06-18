# 🔧 N8N DEBUGGING - VERSÃO SIMPLIFICADA

## 🚨 **PROBLEMA IDENTIFICADO**
Erro "case not found" geralmente indica:
1. Campo inexistente na tabela
2. Tipo de dado incorreto  
3. Constraint violada
4. Credenciais Supabase incorretas

## 🧪 **TESTE SIMPLIFICADO**

### **PASSO 1: Execute as queries de debug no Supabase**
Cole o conteúdo de `debug-supabase.sql` no SQL Editor do Supabase e execute cada query separadamente para verificar:
- Se a tabela `leads` existe
- Se todos os campos estão corretos
- Se o INSERT manual funciona

### **PASSO 2: Workflow N8N Simplificado**

**Substitua temporariamente o nó Supabase por este código simplificado:**

#### **Nó Function - Teste Supabase Manual**
```javascript
// Dados limpos vindos do nó anterior
const leadData = $json;

// Fazer requisição HTTP direta para Supabase (bypass do nó oficial)
const supabaseUrl = 'https://SEU_PROJECT_ID.supabase.co';
const supabaseKey = 'SUA_ANON_KEY';

const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({
    name: leadData.name,
    whatsapp: leadData.whatsapp,
    store_url: leadData.store_url,
    monthly_revenue: leadData.monthly_revenue,
    platform: leadData.platform,
    traffic_investment: leadData.traffic_investment,
    agreement: leadData.agreement
    // REMOVI os campos extras por enquanto para teste
  })
});

const result = await response.json();

if (!response.ok) {
  throw new Error(`Supabase Error: ${JSON.stringify(result)}`);
}

return [{ json: result[0] }];
```

### **PASSO 3: Payload Mínimo para Teste**
```json
{
  "name": "Teste Simples",
  "whatsapp": "11999999999", 
  "storeUrl": "teste.com.br",
  "monthlyRevenue": "100k-300k",
  "platform": "shopify",
  "trafficInvestment": "10k-30k",
  "agreement": true
}
```

## 🔍 **POSSÍVEIS CAUSAS E SOLUÇÕES**

### **Causa 1: Credenciais Supabase Incorretas**
**Verificar:**
- URL: `https://SEU_PROJECT_ID.supabase.co`
- Key: Usar a `anon` key, não a `service_role`

### **Causa 2: Tabela não criada ou campos diferentes**
**Executar:** As queries de `debug-supabase.sql`

### **Causa 3: RLS bloqueando INSERT**
**Solução temporária:**
```sql
-- Desabilitar RLS temporariamente para teste
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

### **Causa 4: Campos obrigatórios ausentes**
**Verificar se todos estes campos existem:**
- `name` (TEXT)
- `whatsapp` (TEXT) 
- `store_url` (TEXT)
- `monthly_revenue` (TEXT)
- `platform` (TEXT)
- `traffic_investment` (TEXT)
- `agreement` (BOOLEAN)

## 📋 **CHECKLIST DE DEBUGGING**

1. [ ] Execute `debug-supabase.sql` no Supabase
2. [ ] Verifique se INSERT manual funciona
3. [ ] Confirme credenciais Supabase no n8n
4. [ ] Teste com nó Function (HTTP direto)
5. [ ] Use payload mínimo
6. [ ] Verifique logs detalhados do n8n

## 🎯 **PRÓXIMOS PASSOS**

1. **Execute as queries de debug** e me envie os resultados
2. **Teste o INSERT manual** no Supabase
3. **Substitua o nó Supabase** pelo Function acima temporariamente
4. **Me informe** qual etapa funcionou/falhou

Assim conseguiremos identificar exatamente onde está o problema! 🔍 