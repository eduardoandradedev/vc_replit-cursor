import { Card, CardContent } from "@/components/ui/card";

export default function ProblemSection() {
  const problems = [
    "Seu pixel dispara tarde demais (ou nem dispara)",
    "Os eventos chegam incompletos no Meta e Google",
    "Seu ROAS é mascarado por dados falsos",
    "Você investe em tráfego, mas entrega dados errados para o algoritmo"
  ];

  return (
    <section className="py-20 bg-red-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            O impacto dos dados ruins no seu negócio
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {problems.map((problem, index) => (
              <Card key={index} className="bg-red-800/50 border border-red-700">
                <CardContent className="p-6">
                  <div className="text-red-300 text-4xl mb-4">🔴</div>
                  <p className="text-lg">{problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-red-800 border border-red-600">
            <CardContent className="p-8">
              <div className="text-5xl mb-4">📉</div>
              <h3 className="text-2xl font-bold mb-4">Resultado?</h3>
              <p className="text-xl font-medium">
                <strong>Campanhas que não escalam, públicos que não funcionam, e dinheiro indo pro ralo.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
