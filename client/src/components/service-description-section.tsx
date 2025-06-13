import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServiceDescriptionSection() {
  const features = [
    "Implementação Web + Server com GTM e infraestrutura Stape",
    "Deduplicação com event_id (client + server)",
    "Meta Conversions API + Enhanced Conversions Google Ads",
    "Enriquecimento de eventos com dados reais (content_id, value, UTM, etc.)",
    "Cookies persistentes para iOS, Safari, AdBlock",
    "Auditoria de coleta + documentação personalizada",
    "Suporte e validação com plataformas (Meta, Google, GA4)"
  ];

  return (
    <section className="py-20 bg-brand-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Rastreamento Profissional para e-commerces que querem escalar com precisão.
            </h2>
            <p className="text-xl text-gray-400">
              Implementação completa que resolve todos os problemas de tracking do seu negócio.
            </p>
          </div>
          
          <Card className="card-dark border border-brand-blue/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                ✅ Inclui:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="text-brand-cyan w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
