import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative brand-gradient min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Hero Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-shadow">
            Seus anúncios vendem. <br />
            <span className="text-red-400">Mas seu rastreamento sabota o algoritmo.</span>
          </h1>
          
          {/* Subheadline */}
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-4">
              Para e-commerces que já faturam, investem em mídia e querem escalar com segurança.
            </p>
            <p className="text-lg md:text-xl text-blue-200">
              Nossa agência implementa rastreamento profissional Web + Server, com dados que alimentam a performance de verdade.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="mb-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🔍 Solicite contato com nosso time especialista
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-blue-200 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Implementação Profissional
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Negócios R$ 50K+/mês
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Poucos Clientes/Mês
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
