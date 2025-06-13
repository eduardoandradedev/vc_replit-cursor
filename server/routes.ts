import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertLeadSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Get n8n webhook URL from environment
      const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error("N8N_WEBHOOK_URL not configured");
        return res.status(500).json({ 
          success: false, 
          message: "Configuração do webhook não encontrada" 
        });
      }

      // Send data to n8n webhook
      console.log('Sending to webhook:', webhookUrl);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          timestamp: new Date().toISOString(),
          source: 'landing_page'
        })
      });

      if (!response.ok) {
        console.error(`Webhook failed with status: ${response.status}`);
        console.error('Response text:', await response.text());
        throw new Error(`Webhook request failed: ${response.status}`);
      }

      res.json({ 
        success: true, 
        message: "Lead enviado com sucesso" 
      });
      
    } catch (error) {
      console.error("Error processing lead:", error);
      
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

  const httpServer = createServer(app);
  return httpServer;
}
