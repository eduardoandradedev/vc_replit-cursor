import HeroSection from "@/components/hero-section";
import TargetAudienceSection from "@/components/target-audience-section";
import ServiceDescriptionSection from "@/components/service-description-section";
import ProblemSection from "@/components/problem-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import ConfirmationSection from "@/components/confirmation-section";
import { useState } from "react";
import ReasonsSection from "@/components/ReasonsSection";
import logoPath from "@assets/logoTrackerPro.png";

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
      
      <ContactFormSection onSuccess={handleFormSuccess} />
      
      {showConfirmation && (
        <ConfirmationSection />
      )}
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src={logoPath} 
                alt="Tracking Pro" 
                className="h-12 md:h-16 w-auto mx-auto mb-4"
              />
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
            </div>
            
            <p className="text-gray-400 text-sm md:text-lg leading-loose mb-8">
              Rastreamento Profissional para E-commerces que faturam acima de R$ 100K+/mês<br />
              <span className="text-orange-400">Dados reais que alimentam o algoritmo de verdade.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm mb-8">
              <span>© 2022 Tracking Pro</span>
              <span className="hidden sm:inline">•</span>
              <span>Implementação Profissional</span>
              <span className="hidden sm:inline">•</span>
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
