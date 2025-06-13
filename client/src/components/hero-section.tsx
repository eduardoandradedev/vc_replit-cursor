import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative cobalt-gradient min-h-screen flex items-center overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Tracking Pro</div>
          <Button 
            onClick={scrollToForm}
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10"
          >
            Solicitar contato
          </Button>
        </div>
      </nav>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-24 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-white text-shadow">
            Seus anúncios vendem. 
            <br />
            <span className="text-glow bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Mas seu rastreamento sabota o algoritmo.
            </span>
          </h1>
          
          {/* Subheadline */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6 leading-relaxed">
              Para e-commerces que já faturam, investem em mídia e querem escalar com segurança.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Nossa agência implementa rastreamento profissional Web + Server, com dados que alimentam a performance de verdade.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
            >
              Solicitar contato especialista
            </Button>
            <Button 
              variant="ghost"
              className="text-gray-300 hover:text-white border border-gray-600 hover:bg-white/5 px-8 py-4 rounded-xl"
            >
              Saiba mais
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              Implementação Profissional
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              Negócios R$ 50K+/mês
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              Poucos Clientes/Mês
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
