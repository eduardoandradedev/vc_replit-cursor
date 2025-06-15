import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageCircle, Calendar, Users } from "lucide-react";

export default function ConfirmationSection() {
  const steps = [
    {
      icon: MessageCircle,
      text: "Nosso especialista enviará uma mensagem no WhatsApp"
    },
    {
      icon: Users,
      text: "Faremos algumas perguntas de qualificação"
    },
    {
      icon: Calendar,
      text: "Se houver fit, agendaremos uma conversa comercial"
    }
  ];

  return (
    <section id="confirmation" className="py-24 bg-gradient-to-br from-green-900/20 to-emerald-900/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/30">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Solicitação enviada com sucesso!
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Nosso time recebeu suas informações e entrará em contato via WhatsApp em breve para avaliar se há fit para nossa solução.
          </p>
          
          <Card className="backdrop-blur-glass border-green-600/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <CardContent className="p-10">
              <h3 className="text-2xl font-bold text-white mb-8">
                Próximos passos:
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-10"></div>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-green-500/30 flex-shrink-0">
                      <step.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-300 text-lg">{step.text}</p>
                    </div>
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
