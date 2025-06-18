import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Rocket } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: "Você preenche o formulário",
      description: "Compartilhe informações básicas sobre seu e-commerce e situação atual."
    },
    {
      number: 2,
      icon: Search,
      title: "Nosso time avalia seu perfil",
      description: "Realizamos uma análise de qualificação para garantir que nossa solução é a ideal para o seu negócio."
    },
    {
      number: 3,
      icon: Rocket,
      title: "Implementação completa",
      description: "Se for o momento certo, seguimos com a implementação profissional."
    }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-6 md:mb-8 lg:mb-12 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.20] drop-shadow-md">
              <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
                Como funciona o processo
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                {/* Connection Line */}
                {step.number < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent transform translate-x-6"></div>
                )}
                
                <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-8 shadow-2xl">
                  {step.number}
                </div>
                
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange-500/30">
                  <step.icon className="w-10 h-10 text-orange-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          <Card className="backdrop-blur-glass border-yellow-600/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
            <CardContent className="p-6 md:p-16 text-center">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
                <div className="text-3xl">⚡</div>
              </div>
              <p className="text-base md:text-lg text-yellow-100 font-medium leading-relaxed max-w-3xl mx-auto">
                <strong className="text-white">Nós não somos uma agência comum. Não aceitamos qualquer projeto.</strong><br />
                Trabalhamos com poucos clientes por mês para garantir entrega de alto nível.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
