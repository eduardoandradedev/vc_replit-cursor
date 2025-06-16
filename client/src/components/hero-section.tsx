// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import PlatformCarousel from "@/components/PlatformCarousel";
import logoPath from "@assets/logo_1750068927420.png";

export default function HeroSection() {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0d1020] via-[#0a0d1a] to-[#06070e]"
    >
      {/* Fundo de partículas */}
      <ParticleBackground className="z-0" />

      {/* Navegação */}
      <nav className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <img 
            src={logoPath} 
            alt="Tracking Pro" 
            className="h-8 md:h-10 w-auto"
          />

          <Button
            onClick={scrollToForm}
            variant="outline"
            size="sm"
            className="border-white/20 text-white/70 hover:bg-white/10 text-sm md:text-base px-3 md:px-4 py-2"
          >
            <span className="hidden sm:inline">Solicitar contato</span>
            <span className="sm:hidden">Contato</span>
          </Button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Título */}
          <h1 className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-md">
            <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
              Seus anúncios vendem.
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Mas seu rastreamento sabota o algoritmo?
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto mb-8 md:mb-12 max-w-4xl text-base md:text-lg lg:text-xl leading-relaxed text-gray-300/70 px-4">
            Para e-commerces que já faturam, investem em mídia e querem escalar
            com segurança. Nossa agência implementa rastreamento profissional
            Web + Server, entregando dados que alimentam a performance de
            verdade.
          </p>

          {/* ✨ BOTÃO CTA COM ESTILO DA IMAGEM ✨ */}
          <Button
            onClick={scrollToForm}
            size="lg"
            className="
              bg-gradient-to-r from-orange-500 to-orange-600 
              text-white text-lg font-semibold 
              px-8 py-4 rounded-xl
              shadow-xl shadow-orange-500/30
              transition-all duration-300 ease-out
              hover:scale-105
              hover:-translate-y-1
              hover:shadow-2xl hover:shadow-orange-500/40
            "
          >
            Entrar em contato
          </Button>

          {/* Indicadores de confiança */}
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs sm:text-sm text-gray-400/70">
            {[
              "Implementação Profissional",
              "Negócios R$ 50K+/mês",
              "Poucos Clientes/Mês",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                <span className="whitespace-nowrap">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Carrossel de Plataformas - Full Width */}
      <div className="absolute bottom-16 md:bottom-20 left-0 right-0 z-10">
        <PlatformCarousel />
      </div>
    </section>
  );
}