import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Zap, Shield } from "lucide-react";

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

  const highlights = [
    {
      icon: Target,
      title: "Precisão Total",
      description: "Dados 100% confiáveis para alimentar seus algoritmos"
    },
    {
      icon: Zap,
      title: "Performance Real",
      description: "Campanhas que escalam com base em dados verdadeiros"
    },
    {
      icon: Shield,
      title: "Proteção Avançada",
      description: "Resistente a iOS, Safari e bloqueadores de anúncios"
    }
  ];

  return (
    <section className="py-24 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Rastreamento Profissional para e-commerces que querem 
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> escalar com precisão</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Implementação completa que resolve todos os problemas de tracking do seu negócio.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-500/30">
                  <highlight.icon className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </div>
            ))}
          </div>
          
          <Card className="backdrop-blur-glass border-slate-700/50">
            <CardContent className="p-10 md:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Tudo que está incluído:
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-lg leading-relaxed">{feature}</span>
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
