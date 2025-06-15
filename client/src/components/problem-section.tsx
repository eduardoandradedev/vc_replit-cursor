import { Card, CardContent } from "@/components/ui/card";
import { XCircle, TrendingDown } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    "Seu pixel dispara tarde demais (ou nem dispara)",
    "Os eventos chegam incompletos no Meta e Google",
    "Seu ROAS é mascarado por dados falsos",
    "Você investe em tráfego, mas entrega dados errados para o algoritmo"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-red-900/20 to-red-800/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white px-4">
            O impacto dos dados ruins no seu 
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"> negócio</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mb-12 md:mb-16"></div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {problems.map((problem, index) => (
              <Card key={index} className="backdrop-blur-glass border-red-700/50 bg-red-900/20">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 border border-red-500/30">
                    <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
                  </div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed">{problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="backdrop-blur-glass border-red-600/50 bg-gradient-to-br from-red-900/40 to-red-800/40">
            <CardContent className="p-8 md:p-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-red-500/30">
                <TrendingDown className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Resultado?</h3>
              <p className="text-lg md:text-xl font-medium text-red-100 leading-relaxed max-w-3xl mx-auto px-4">
                <strong className="text-white">Campanhas que não escalam, públicos que não funcionam, e dinheiro indo pro ralo.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
