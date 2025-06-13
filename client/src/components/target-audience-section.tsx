import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function TargetAudienceSection() {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              🎯 Essa solução é para você se:
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ideal Client Criteria */}
            <Card className="card-dark shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-brand-green rounded-full"></span>
                  Você está aqui se:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Seu e-commerce fatura acima de <strong className="text-white">R$ 50 mil/mês</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Você investe constantemente em tráfego pago</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Suas métricas não batem entre plataformas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Suas campanhas caíram de performance sem motivo aparente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-green w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Já contratou "instalações básicas" e continua cego</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Important Notice */}
            <Card className="bg-red-900/30 border-2 border-red-500/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
                  <AlertTriangle className="text-red-400 w-6 h-6" />
                  Importante:
                </h3>
                <div className="space-y-4">
                  <p className="text-red-300 font-medium">
                    Se você ainda precisa confirmar se o rastreamento está quebrado, esta solução <strong className="text-white">não é para você.</strong>
                  </p>
                  <p className="text-red-200">
                    Nós atuamos com <strong className="text-white">negócios maduros que sabem o valor de dados reais.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
