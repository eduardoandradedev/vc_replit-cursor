import { CheckCircle, X } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0a0b14] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-500/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Solicitação Enviada!
          </h3>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Obrigado pelo seu interesse! Nossa equipe vai avaliar sua solicitação e entrar em contato em breve para discutir como podemos ajudar seu negócio.
          </p>

          <div className="space-y-2 text-sm text-gray-400 mb-6">
            <p>✓ Solicitação recebida com sucesso</p>
            <p>✓ Análise em andamento</p>
            <p>✓ Retorno em até 24h</p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}