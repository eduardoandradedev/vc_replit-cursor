import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function TargetAudienceSection() {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Essa solução é para você se:
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ideal Client Criteria */}
            <Card className="backdrop-blur-glass border-slate-700/50">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">
                    Você está aqui se:
                  </h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Seu e-commerce fatura acima de <strong className="text-white">R$ 50 mil/mês</strong></span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Você investe constantemente em tráfego pago</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Suas métricas não batem entre plataformas</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Suas campanhas caíram de performance sem motivo aparente</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Já contratou "instalações básicas" e continua cego</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Important Notice */}
            <Card className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-700/50 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-8">
                  <AlertTriangle className="text-red-400 w-7 h-7" />
                  <h3 className="text-xl font-bold text-red-100">
                    Importante:
                  </h3>
                </div>
                <div className="space-y-6">
                  <p className="text-red-200 font-medium text-lg">
                    Se você ainda precisa confirmar se o rastreamento está quebrado, esta solução <strong className="text-white">não é para você.</strong>
                  </p>
                  <p className="text-red-300 text-lg">
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
