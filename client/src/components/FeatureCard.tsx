// src/components/FeatureCard.tsx
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string; // ex: '#22d3ee'
}

export const FeatureCard = ({ title, description, icon: Icon, iconColor }: FeatureCardProps) => {
  return (
    // Contêiner principal relativo para o posicionamento do brilho
    <div className="relative p-px rounded-2xl overflow-hidden">
      
      <div className="relative flex flex-col h-full bg-slate-900 p-8 rounded-2xl">
        {/* Ícone com Efeito Neon */}
        <div className="mb-6">
          <Icon
            className="w-10 h-10"
            strokeWidth={1.5}
            style={{
              color: iconColor,
              // O filtro drop-shadow cria o brilho neon
              filter: `drop-shadow(0 0 10px ${iconColor})`
            }}
          />
        </div>
        
        {/* Conteúdo de Texto */}
        <h3 className="text-xl font-bold text-white/90 mb-4">{title}</h3>
        <p className="text-base text-slate-400/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Efeito de Borda Brilhante */}
      {/* Div posicionado absolutamente atrás do conteúdo com um gradiente cônico */}
      <div 
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${iconColor}20, transparent)`
        }}
      >
      </div>
    </div>
  );
};