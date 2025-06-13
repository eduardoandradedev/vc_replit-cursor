import { Card, CardContent } from "@/components/ui/card";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: "💼",
      title: "Você preenche o formulário",
      description: "Compartilhe informações básicas sobre seu e-commerce e situação atual."
    },
    {
      number: 2,
      icon: "🔍",
      title: "Nosso time avalia seu perfil",
      description: "(sem auditoria gratuita) - analisamos se há fit para nossa solução."
    },
    {
      number: 3,
      icon: "🤝",
      title: "Implementação completa",
      description: "Se for o momento certo, seguimos com a implementação profissional."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
              Como funciona o processo
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">⛔</div>
              <p className="text-lg text-yellow-800 font-medium">
                <strong>Nós não somos uma agência comum. Não aceitamos qualquer projeto.</strong><br />
                Trabalhamos com poucos clientes por mês para garantir entrega de alto nível.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
