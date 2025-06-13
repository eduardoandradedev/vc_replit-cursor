import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";

interface ContactFormSectionProps {
  onSuccess: () => void;
}

export default function ContactFormSection({ onSuccess }: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime] = useState(Date.now());
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      storeUrl: "",
      monthlyRevenue: undefined,
      platform: undefined,
      trafficInvestment: undefined,
      acknowledgment: false,
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
    <section id="contact-form" className="py-20 bg-brand-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              📥 Solicite contato com nosso time
            </h2>
            <p className="text-lg text-gray-400">
              Preencha os dados abaixo para avaliarmos se há fit para nossa solução.
            </p>
          </div>
          
          <Card className="card-dark border border-brand-blue/20">
            <CardContent className="p-8">
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
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-300">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    onFocus={() => trackFieldFocus('name')}
                    className="mt-2"
                    placeholder="Seu nome completo"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                {/* WhatsApp */}
                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-semibold text-gray-300">
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
                    className="mt-2"
                    placeholder="(11) 99999-9999"
                  />
                  {form.formState.errors.whatsapp && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.whatsapp.message}</p>
                  )}
                </div>
                
                {/* Link da loja */}
                <div>
                  <Label htmlFor="storeUrl" className="text-sm font-semibold text-gray-300">
                    Link da loja *
                  </Label>
                  <Input
                    id="storeUrl"
                    type="url"
                    {...form.register("storeUrl")}
                    onFocus={() => trackFieldFocus('storeUrl')}
                    className="mt-2"
                    placeholder="https://sualojaexemplo.com.br"
                  />
                  {form.formState.errors.storeUrl && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.storeUrl.message}</p>
                  )}
                </div>
                
                {/* Faturamento mensal */}
                <div>
                  <Label htmlFor="monthlyRevenue" className="text-sm font-semibold text-gray-300">
                    Faturamento mensal da loja *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("monthlyRevenue", value as any);
                      trackFieldChange('monthlyRevenue', value);
                    }}
                    onOpenChange={() => trackFieldFocus('monthlyRevenue')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50k-100k">R$ 50 mil a R$ 100 mil</SelectItem>
                      <SelectItem value="100k-300k">R$ 100 mil a R$ 300 mil</SelectItem>
                      <SelectItem value="300k+">Acima de R$ 300 mil</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.monthlyRevenue && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.monthlyRevenue.message}</p>
                  )}
                </div>
                
                {/* Plataforma */}
                <div>
                  <Label htmlFor="platform" className="text-sm font-semibold text-gray-300">
                    Plataforma *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("platform", value as any);
                      trackFieldChange('platform', value);
                    }}
                    onOpenChange={() => trackFieldFocus('platform')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      <SelectItem value="nuvemshop">Nuvemshop</SelectItem>
                      <SelectItem value="other">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.platform && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.platform.message}</p>
                  )}
                </div>
                
                {/* Investimento em tráfego */}
                <div>
                  <Label htmlFor="trafficInvestment" className="text-sm font-semibold text-gray-300">
                    Quanto investe em tráfego por mês *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("trafficInvestment", value as any);
                      trackFieldChange('trafficInvestment', value);
                    }}
                    onOpenChange={() => trackFieldFocus('trafficInvestment')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up-to-10k">Até R$ 10 mil</SelectItem>
                      <SelectItem value="10k-30k">De R$ 10 mil a R$ 30 mil</SelectItem>
                      <SelectItem value="30k+">Acima de R$ 30 mil</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.trafficInvestment && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.trafficInvestment.message}</p>
                  )}
                </div>
                
                {/* Checkbox obrigatório */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="acknowledgment"
                    checked={form.watch("acknowledgment")}
                    onCheckedChange={(checked) => {
                      form.setValue("acknowledgment", checked as boolean);
                      trackFieldChange('acknowledgment', checked ? 'true' : 'false');
                    }}
                    onFocus={() => trackFieldFocus('acknowledgment')}
                    className="mt-1"
                  />
                  <Label htmlFor="acknowledgment" className="text-sm text-gray-300">
                    <strong>Estou ciente de que este é um serviço pago e para negócios em escala</strong>
                  </Label>
                </div>
                {form.formState.errors.acknowledgment && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.acknowledgment.message}</p>
                )}
                
                {/* Error message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>🔒 Solicitar contato com especialista</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
