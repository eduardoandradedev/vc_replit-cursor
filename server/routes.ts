import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertLeadSchema } from "@shared/schema";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Save lead locally first
      const savedLead = await storage.createLead(validatedData);
      console.log("Lead saved locally:", savedLead.id);
      
      // Get n8n webhook URL from environment
      const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.log("N8N_WEBHOOK_URL not configured, lead saved locally only");
        return res.json({ 
          success: true, 
          message: "Lead recebido e será processado em breve" 
        });
      }

      // Try to send to webhook (but don't fail if it doesn't work)
      try {
        console.log("Attempting to send to webhook:", webhookUrl);

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...validatedData,
            timestamp: new Date().toISOString(),
            source: 'landing_page',
            leadId: savedLead.id
          })
        });

        console.log("Webhook response status:", response.status);
        
        if (response.ok) {
          console.log("Lead successfully sent to webhook");
        } else {
          console.log("Webhook failed, but lead is saved locally");
        }
      } catch (webhookError) {
        console.log("Webhook error (lead still saved locally):", webhookError);
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
      console.error("Error fetching leads:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar leads"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
