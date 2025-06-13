import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ConfirmationSection() {
  return (
    <section id="confirmation" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Solicitação enviada com sucesso!
          </h2>
          <p className="text-lg text-green-700 mb-8">
            Nosso time recebeu suas informações e entrará em contato via WhatsApp em breve para avaliar se há fit para nossa solução.
          </p>
          
          <Card className="bg-white border border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-gray-600">
                    <strong>Próximos passos:</strong>
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-left text-sm text-gray-600">
                <p>1. Nosso especialista enviará uma mensagem no WhatsApp</p>
                <p>2. Faremos algumas perguntas de qualificação</p>
                <p>3. Se houver fit, agendaremos uma conversa comercial</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
