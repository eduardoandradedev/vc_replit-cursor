import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function TargetAudienceSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="mb-6 md:mb-8 lg:mb-12 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.20] drop-shadow-md">
              <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
                Essa solução é para você se:
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Ideal Client Criteria */}
            <Card className="backdrop-blur-glass border-slate-700/50">
              <CardContent className="p-6 md:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">
                    Você está aqui se:
                  </h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-base md:text-lg">Seu e-commerce fatura acima de <strong className="text-white">R$ 50 mil/mês</strong></span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-base md:text-lg">Você investe constantemente em tráfego pago</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-base md:text-lg">Suas métricas não batem entre plataformas</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-base md:text-lg">Suas campanhas caíram de performance sem motivo aparente</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-orange-400 w-6 h-6 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-base md:text-lg">Já contratou "instalações básicas" e continua cego</span>
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
                  <p className="text-red-200 font-medium text-base md:text-lg">
                    Se você ainda precisa confirmar se o rastreamento está quebrado, esta solução <strong className="text-white">não é para você.</strong>
                  </p>
                  <p className="text-red-300 text-base md:text-lg">
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
