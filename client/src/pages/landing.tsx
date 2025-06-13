import HeroSection from "@/components/hero-section";
import TargetAudienceSection from "@/components/target-audience-section";
import ServiceDescriptionSection from "@/components/service-description-section";
import ProblemSection from "@/components/problem-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import ConfirmationSection from "@/components/confirmation-section";
import { useState } from "react";

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
      <footer className="bg-brand-navy text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            © 2024 - Rastreamento Profissional para E-commerces<br />
            Dados reais que alimentam o algoritmo de verdade.
          </p>
        </div>
      </footer>
    </div>
  );
}
