import React, { useMemo } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
}

export const ParticleBackground = ({ 
  className = '',
  particleCount = 25   
}: ParticleBackgroundProps) => {

  const particles = useMemo(() => {
    const particleArray = [];
    const animationTypes = [
      'animate-rise-slow', 
      'animate-rise-medium', 
      'animate-rise-fast', 
      'animate-rise-float',
      'animate-sparkle'
    ];
    
    for (let i = 0; i < particleCount; i++) {
      // ✨ 1. GERANDO TAMANHOS DE FONTE ADEQUADOS ✨
      // ✨ Gera tamanhos menores, de 8 a 18px para a fonte.
      const size = Math.floor(Math.random() * 11) + 8; 
      
      const opacity = (Math.random() * 0.4 + 0.2).toFixed(2); // Opacidade entre 20% e 60%
      const left = `${Math.random() * 100}%`; 
      const bottom = `${Math.random() * 100}%`; 
      const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      const animationDelay = `${(Math.random() * 8).toFixed(2)}s`; // Aumentei o delay para espalhar mais
      
      particleArray.push({ id: i, size, opacity, left, bottom, animationType, animationDelay });
    }
    return particleArray;
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* ...seus outros elementos de fundo (luz, grade) continuam aqui... */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0.5px, transparent 0.5px)',
          backgroundSize: '25px 25px'
        }}
      ></div>

      {/* Contêiner das partículas '$' geradas dinamicamente - DESABILITADO */}
      {/* 
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className={`particle absolute text-slate-500 font-bold ${p.animationType}`}
            style={{
              left: p.left,
              bottom: p.bottom,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: p.animationDelay,
            }}
          >
            $
          </div>
        ))}
      </div>
      */}
    </div>
  );
};