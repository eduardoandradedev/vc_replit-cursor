import HeroSection from "@/components/hero-section";
import TargetAudienceSection from "@/components/target-audience-section";
import ServiceDescriptionSection from "@/components/service-description-section";
import ProblemSection from "@/components/problem-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import ConfirmationSection from "@/components/confirmation-section";
import { useState } from "react";
import ReasonsSection from "@/components/ReasonsSection";
import { PlataformasAtendidasCarousel } from "@/components/PlataformasAtendidasCarousel";

export default function Landing() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSuccess = () => {
    setShowConfirmation(true);
    // Scroll to confirmation section
    setTimeout(() => {
      document.getElementById('confirmation')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ReasonsSection />  
      <TargetAudienceSection />
      <ServiceDescriptionSection />
      <ProblemSection />
      <ProcessSection />
      
      {!showConfirmation && (
        <ContactFormSection onSuccess={handleFormSuccess} />
      )}
      
      {showConfirmation && (
        <ConfirmationSection />
      )}
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Tracking Pro</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Rastreamento Profissional para E-commerces que faturam R$ 50K+/mês<br />
              <span className="text-orange-400">Dados reais que alimentam o algoritmo de verdade.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm mb-8">
              <span>© 2024 Tracking Pro</span>
              <span>•</span>
              <span>Implementação Profissional</span>
              <span>•</span>
              <span>Poucos Clientes/Mês</span>
            </div>
            
            <div className="text-xs text-gray-600">
              Este é um serviço especializado para negócios maduros que reconhecem o valor de dados precisos.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
