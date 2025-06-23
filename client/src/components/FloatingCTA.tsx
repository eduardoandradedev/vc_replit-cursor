import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { trackEvent } from "@/lib/analytics";

export default function FloatingCTA() {
  const { showFloatingButton } = useScrollPosition();

  const scrollToForm = () => {
    // Track analytics
    trackEvent('floating_cta_click', 'navigation', 'mobile');
    
    // Scroll to form
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (!showFloatingButton) {
    return null;
  }

  return (
    <div 
      className={`
        fixed bottom-16 left-1/2 transform -translate-x-1/2 z-[60]
        md:hidden
        transition-all duration-500 ease-out
        ${showFloatingButton 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-full opacity-0 scale-95'
        }
      `}
    >
      <Button
        onClick={scrollToForm}
        size="lg"
        className="
          bg-gradient-to-r from-orange-500 to-orange-600 
          text-white text-base font-semibold 
          px-6 py-3 rounded-xl
          shadow-2xl shadow-orange-500/40
          transition-all duration-300 ease-out
          hover:scale-105
          hover:-translate-y-1
          hover:shadow-2xl hover:shadow-orange-500/50
          active:scale-95
          min-w-[200px]
        "
      >
        Entrar em contato
      </Button>
    </div>
  );
} 