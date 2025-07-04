// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import PlatformCarousel from "@/components/PlatformCarousel";
import logoPath from "@assets/logo-e2.png";

export default function HeroSection() {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0d1020] via-[#0a0d1a] to-[#06070e]"
    >
      {/* Fundo de partículas */}
      <ParticleBackground className="z-0" />

      {/* Navegação */}
      <nav className="absolute top-0 left-0 right-0 px-4 py-6 md:p-12 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <img 
            src={logoPath} 
            alt="Tracking Pro" 
            className="h-6 md:h-8 w-auto"
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
      <div className="relative z-10 container mt-2 sm:mt-12 lg:mt-24 mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Título */}
          <h1 className="mt-10 mb-6 md:mb-8 lg:mb-12 text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.10] drop-shadow-md">
            <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
              Seus anúncios vendem.
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Mas seu rastreamento sabota o algoritmo?
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto mb-8 md:mb-12 max-w-4xl text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.80] text-gray-300/70 px-4">
          Ative o rastreamento Web + Server e escale seu e-commerce de forma segura, inteligente e muito mais lucrativa. Implemente tracking profissional que alimenta o algoritmo de verdade.
          </p>

          {/* ✨ BOTÃO CTA COM ESTILO DA IMAGEM ✨ */}
          <Button
            onClick={scrollToForm}
            size="lg"
            className="
              hidden md:inline-flex
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
          <div className={`mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs sm:text-sm text-gray-400/70

            /* 4º filho ocupa 100% da linha e centraliza seu conteúdo */
            [&>*:nth-child(4)]:w-full 
            [&>*:nth-child(4)]:justify-center
            `}
        >
          {[
            "Alimente o algoritmo com dados reais",
            "Maximize seu ROAS e aumente seu faturamento",
            "Integração com as principais plataformas"
          ].map(item => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
              <span className="whitespace-nowrap">{item}</span>
            </span>
          ))}
        </div>

        </div>
      {/* Carrossel de Plataformas - Full Width */}
      <div className="bottom-8 md:bottom-12 left-0 right-0 z-10">
        <PlatformCarousel />
      </div>
      </div>
    </section>
  );
}