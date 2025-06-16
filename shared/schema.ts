import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  storeUrl: text("store_url").notNull(),
  monthlyRevenue: text("monthly_revenue").notNull(),
  platform: text("platform").notNull(),
  trafficInvestment: text("traffic_investment").notNull(),
  acknowledgment: boolean("acknowledgment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  whatsapp: z.string().min(10, "WhatsApp deve ter pelo menos 10 dígitos"),
  storeUrl: z.string().min(3, "Digite o domínio da sua loja").regex(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/, "Digite um domínio válido (ex: minhaloja.com.br)"),
  monthlyRevenue: z.enum(["50k-100k", "100k-300k", "300k+"], {
    required_error: "Selecione o faturamento mensal",
  }),
  platform: z.enum(["shopify", "woocommerce", "nuvemshop", "other"], {
    required_error: "Selecione a plataforma",
  }),
  trafficInvestment: z.enum(["up-to-10k", "10k-30k", "30k+"], {
    required_error: "Selecione o investimento em tráfego",
  }),
  acknowledgment: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar que este é um serviço pago",
  }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
