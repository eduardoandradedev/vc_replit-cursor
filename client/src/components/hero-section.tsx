import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative brand-gradient min-h-screen">
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white">
            {/* Hero Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-shadow">
              Seus anúncios vendem. <br />
              <span className="text-red-400">Mas seu rastreamento sabota o algoritmo.</span>
            </h1>
            
            {/* Subheadline */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-gray-300 font-medium mb-4">
                Para e-commerces que já faturam, investem em mídia e querem escalar com segurança.
              </p>
              <p className="text-lg md:text-xl text-gray-400">
                Nossa agência implementa rastreamento profissional Web + Server, com dados que alimentam a performance de verdade.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="mb-12">
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-brand-blue hover:bg-cyan-500 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Solicite contato com nosso time especialista
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-cyan rounded-full"></span>
                Implementação Profissional
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-cyan rounded-full"></span>
                Negócios R$ 50K+/mês
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-cyan rounded-full"></span>
                Poucos Clientes/Mês
              </div>
            </div>
          </div>

          {/* Right Dashboard Preview */}
          <div className="relative">
            <div className="dashboard-preview rounded-2xl p-1 animate-float">
              <img 
                src="@assets/image_1749836417293.png" 
                alt="Dashboard mostrando queda nas conversões" 
                className="w-full h-auto rounded-xl"
              />
              
              {/* Overlay indicator */}
              <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Performance em queda
              </div>
              
              {/* Warning badge */}
              <div className="absolute bottom-4 left-4 bg-yellow-500/90 text-black px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                ⚠️ Dados incompletos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
