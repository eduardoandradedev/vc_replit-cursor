import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertLeadSchema } from "@shared/schema";
import { storage } from "./storage";
import crypto from "crypto";

// Função para gerar assinatura HMAC no servidor
async function generateServerHmacSignature(payload: any, secret: string): Promise<string> {
  try {
    // Converter o payload para string JSON
    const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    // Criar HMAC usando SHA-256
    const hmac = crypto.createHmac('sha256', secret);
    
    // Atualizar com o payload
    hmac.update(payloadString);
    
    // Retornar digest em formato hexadecimal
    return hmac.digest('hex');
  } catch (error) {
    console.error('Erro ao gerar assinatura HMAC no servidor:', error);
    throw new Error('Falha ao gerar assinatura de segurança');
  }
}

// Utilitário de log seguro para o servidor
export const safeLog = {
  // Determina se estamos em ambiente de produção
  isProd: () => {
    return process.env.NODE_ENV === 'production';
  },
  
  // Log informativo - versão reduzida em produção
  info: (message: string, data?: any) => {
    if (safeLog.isProd()) {
      // Em produção, log apenas a mensagem sem dados sensíveis
      console.log(`[INFO] ${message}`);
      return;
    }
    
    // Em desenvolvimento, log completo
    if (data) {
      console.log(`[INFO] ${message}`, safeLog.sanitize(data));
    } else {
      console.log(`[INFO] ${message}`);
    }
  },
  
  // Log de erro - versão sanitizada em produção
  error: (message: string, error?: any) => {
    if (safeLog.isProd()) {
      // Em produção, log apenas a mensagem sem detalhes sensíveis
      console.error(`[ERROR] ${message}`);
      return;
    }
    
    // Em desenvolvimento, log completo
    if (error) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  },
  
  // Sanitiza dados sensíveis
  sanitize: (data: any): any => {
    if (!data) return data;
    
    // Para strings, não há necessidade de sanitização profunda
    if (typeof data === 'string') return data;
    
    // Para objetos, sanitizar recursivamente
    if (typeof data === 'object') {
      const sanitized = { ...data };
      
      // Campos sensíveis a serem mascarados
      const sensitiveFields = [
        'name', 'whatsapp', 'storeUrl', 'password', 'token', 'key', 'secret', 
        'webhook', 'url', 'auth', 'api', 'credential'
      ];
      
      for (const key in sanitized) {
        // Mascara campos sensíveis
        if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
          if (typeof sanitized[key] === 'string') {
            // Preserva o tipo de dado mas mascara o conteúdo
            sanitized[key] = '[REDACTED]';
          }
        } 
        // Sanitiza objetos aninhados
        else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = safeLog.sanitize(sanitized[key]);
        }
      }
      
      return sanitized;
    }
    
    return data;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Save lead locally first
      const savedLead = await storage.createLead(validatedData);
      safeLog.info("Lead saved locally", { leadId: savedLead.id });
      
      // Get n8n webhook URL from environment
      const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.WEBHOOK_URL;
      
      if (!webhookUrl) {
        safeLog.info("Webhook URL not configured, lead saved locally only");
        return res.json({ 
          success: true, 
          message: "Lead recebido e será processado em breve" 
        });
      }

      // Try to send to webhook (but don't fail if it doesn't work)
      try {
        safeLog.info("Attempting to send to webhook");
        
        // Gerar timestamp e requestId para segurança
        const timestamp = new Date().toISOString();
        const requestId = crypto.randomUUID();
        
        // Preparar payload com metadados de segurança
        const payload = {
          ...validatedData,
          timestamp,
          source: 'landing_page',
          leadId: savedLead.id,
          requestId
        };
        
        // Obter chave secreta para assinatura HMAC
        const webhookSecret = process.env.WEBHOOK_SECRET;
        
        // Headers padrão
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        // Adicionar headers de segurança se tiver a chave secreta
        if (webhookSecret) {
          // Gerar assinatura HMAC (implementação simplificada para servidor)
          const hmacSignature = await generateServerHmacSignature(payload, webhookSecret);
          
          // Adicionar headers de autenticação
          headers['X-Webhook-Signature'] = hmacSignature;
          headers['X-Request-Timestamp'] = timestamp;
          headers['X-Request-ID'] = requestId;
          headers['X-API-Source'] = 'e2no-server';
        } else {
          safeLog.info("Webhook secret not configured, sending without signature");
        }

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        safeLog.info(`Webhook response status: ${response.status}`);
        
        if (response.ok) {
          safeLog.info("Lead successfully sent to webhook");
        } else {
          safeLog.info("Webhook failed, but lead is saved locally");
        }
      } catch (webhookError) {
        safeLog.error("Webhook error (lead still saved locally)", webhookError);
      }

      res.json({ 
        success: true, 
        message: "Lead enviado com sucesso" 
      });
      
    } catch (error) {
      safeLog.error("Error processing lead", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  });

  // Get all leads endpoint (for testing/admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json({
        success: true,
        leads: leads,
        count: leads.length
      });
    } catch (error) {
      safeLog.error("Error fetching leads", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar leads"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
