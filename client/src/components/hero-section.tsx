// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function HeroSection() {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      /* ↓ gradiente azul-cobalto.  Altere se tiver sua própria classe utilitária */
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#0d1020] via-[#0a0d1a] to-[#06070e]"
    >
      {/* Fundo de partículas  ─ z-0 garante ficar atrás do texto/menu */}
      <ParticleBackground className="z-0" />

      {/* Navegação */}
      <nav className="absolute top-0 left-0 right-0 p-6 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-white font-bold text-xl">Tracking Pro</span>

          <Button
            onClick={scrollToForm}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Solicitar contato
          </Button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Título */}
          <h1 className="mb-8 text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-md">
            Seus anúncios vendem.
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Mas seu rastreamento sabota o algoritmo.
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto mb-12 max-w-4xl text-lg md:text-xl leading-relaxed text-gray-300">
            Para e-commerces que já faturam, investem em mídia e querem escalar
            com segurança. Nossa agência implementa rastreamento profissional
            Web + Server, entregando dados que alimentam a performance de
            verdade.
          </p>

          {/* CTA */}
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-transform duration-300 hover:scale-105 shadow-2xl"
          >
            Entrar em contato
          </Button>

          {/* Indicadores de confiança */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            {[
              "Implementação Profissional",
              "Negócios R$ 50K+/mês",
              "Poucos Clientes/Mês",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
