import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";
import SuccessPopup from "./SuccessPopup";

interface ContactFormSectionProps {
  onSuccess: () => void;
}

export default function ContactFormSection({ onSuccess }: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime] = useState(Date.now());
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      storeUrl: "",
      monthlyRevenue: undefined,
      platform: undefined,
      trafficInvestment: undefined,
    },
  });

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length >= 7) {
      return numbers.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (numbers.length >= 3) {
      return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    }
    return numbers;
  };

  const onSubmit = async (data: InsertLead) => {
    // Anti-bot protection: Check if form was filled too quickly
    const timeSinceLoad = Date.now() - formLoadTime;
    if (timeSinceLoad < 3000) {
      setError('Erro: Envio muito rápido. Tente novamente.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Track form submission attempt
      trackEvent('form_submit_attempt', 'lead_form', 'contact');

      const response = await apiRequest('POST', '/api/leads', data);
      
      if (response.ok) {
        // Track successful submission
        trackEvent('form_submit_success', 'lead_form', 'contact');
        
        // Reset form
        form.reset();
        
        // Show success popup
        setShowSuccessPopup(true);
        
        // Call onSuccess callback
        onSuccess();
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      
      // Track form submission error
      trackEvent('form_submit_error', 'lead_form', 'contact');
      
      if (err.message.includes('400')) {
        setError('Dados inválidos. Verifique os campos e tente novamente.');
      } else {
        setError('Erro ao enviar formulário. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Track form field interactions
  const trackFieldFocus = (fieldName: string) => {
    trackEvent('form_field_focus', 'lead_form', fieldName);
  };

  const trackFieldChange = (fieldName: string, value: string) => {
    trackEvent('form_field_change', 'lead_form', `${fieldName}:${value}`);
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-slate-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight drop-shadow-md">
              <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
                Solicite contato com nosso time
              </span>
            </h2>
            <p className="text-lg md:text-x2 text-gray-300 leading-relaxed px-4">
              Preencha os dados abaixo para avaliarmos se está elegível para nossa solução.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-6 md:mt-8"></div>
          </div>
          
          <Card className="backdrop-blur-glass border-slate-700/50">
            <CardContent className="p-6 md:p-10 lg:p-12">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                {/* Nome */}
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-white mb-3 block">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    onFocus={() => trackFieldFocus('name')}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="Seu nome completo"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                {/* WhatsApp */}
                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-semibold text-white mb-3 block">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    {...form.register("whatsapp")}
                    onFocus={() => trackFieldFocus('whatsapp')}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      form.setValue("whatsapp", formatted);
                    }}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="(11) 99999-9999"
                  />
                  {form.formState.errors.whatsapp && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.whatsapp.message}</p>
                  )}
                </div>
                
                {/* Link da loja */}
                <div>
                  <Label htmlFor="storeUrl" className="text-sm font-semibold text-white mb-3 block">
                    Link da loja *
                  </Label>
                  <Input
                    id="storeUrl"
                    type="text"
                    {...form.register("storeUrl")}
                    onFocus={() => trackFieldFocus('storeUrl')}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="sualojaexemplo.com.br"
                  />
                  {form.formState.errors.storeUrl && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.storeUrl.message}</p>
                  )}
                </div>
                
                {/* Faturamento mensal */}
                <div>
                  <Label htmlFor="monthlyRevenue" className="text-sm font-semibold text-white mb-3 block">
                    Faturamento mensal da loja *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("monthlyRevenue", value as any);
                      trackFieldChange('monthlyRevenue', value);
                    }}
                    onOpenChange={() => trackFieldFocus('monthlyRevenue')}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-orange-500 focus:ring-orange-500/20">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="50k-100k">R$ 50 mil a R$ 100 mil</SelectItem>
                      <SelectItem value="100k-300k">R$ 100 mil a R$ 300 mil</SelectItem>
                      <SelectItem value="300k+">Acima de R$ 300 mil</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.monthlyRevenue && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.monthlyRevenue.message}</p>
                  )}
                </div>
                
                {/* Plataforma */}
                <div>
                  <Label htmlFor="platform" className="text-sm font-semibold text-white mb-3 block">
                    Plataforma *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("platform", value as any);
                      trackFieldChange('platform', value);
                    }}
                    onOpenChange={() => trackFieldFocus('platform')}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-orange-500 focus:ring-orange-500/20">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      <SelectItem value="nuvemshop">Nuvemshop</SelectItem>
                      <SelectItem value="other">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.platform && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.platform.message}</p>
                  )}
                </div>
                
                {/* Investimento em tráfego */}
                <div>
                  <Label htmlFor="trafficInvestment" className="text-sm font-semibold text-white mb-3 block">
                    Quanto investe em tráfego por mês *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("trafficInvestment", value as any);
                      trackFieldChange('trafficInvestment', value);
                    }}
                    onOpenChange={() => trackFieldFocus('trafficInvestment')}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-orange-500 focus:ring-orange-500/20">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="up-to-10k">Até R$ 10 mil</SelectItem>
                      <SelectItem value="10k-30k">De R$ 10 mil a R$ 30 mil</SelectItem>
                      <SelectItem value="30k+">Acima de R$ 30 mil</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.trafficInvestment && (
                    <p className="text-red-400 text-sm mt-2">{form.formState.errors.trafficInvestment.message}</p>
                  )}
                </div>

                
                {/* Error message */}
                {error && (
                  <Alert variant="destructive" className="bg-red-900/20 border-red-600/50 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-xl shadow-orange-500/30 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      Solicitar contato com especialista
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </section>
  );
}
