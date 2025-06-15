import React, { useMemo } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number; // Prop opcional para controlar o número de partículas
}

export const ParticleBackground = ({ 
  className = '',
  particleCount = 50 // Definimos um número padrão de 50 partículas
}: ParticleBackgroundProps) => {

  // useMemo garante que as partículas só sejam calculadas uma vez
  const particles = useMemo(() => {
    const particleArray = [];
    
    // ✨ AQUI ESTÁ A MUDANÇA: Adicionamos a nova animação à lista
    const animationTypes = [
      'animate-rise-slow', 
      'animate-rise-medium', 
      'animate-rise-fast', 
      'animate-rise-float',
      'animate-sparkle' // <--- ADICIONADO!
    ];
    
    for (let i = 0; i < particleCount; i++) {
      // Gera um tamanho entre 1px e 3px
      const size = Math.floor(Math.random() * 3) + 1; 
      // Opacidade entre 30% e 60%
      const opacity = (Math.random() * 0.3 + 0.3).toFixed(2); 
      // Posição horizontal aleatória
      const left = `${Math.random() * 100}%`; 
      // Posição vertical aleatória na base da tela
      const bottom = `${Math.random() * 100}%`; 
       // Seleciona um tipo de animação aleatório
      const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      // Atraso de animação aleatório para que não comecem todas juntas
      const animationDelay = `${(Math.random() * 5).toFixed(2)}s`; 
      
      particleArray.push({
        id: i,
        size,
        opacity,
        left,
        bottom,
        animationType,
        animationDelay
      });
    }
    return particleArray;
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Efeito de luz no topo */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
        }}
      ></div>
      
      {/* Padrão de grade */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0.5px, transparent 0.5px)',
          backgroundSize: '25px 25px'
        }}
      ></div>
      
      {/* Contêiner das partículas geradas dinamicamente */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className={`particle absolute bg-white rounded-full ${p.animationType}`}
            style={{
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: p.animationDelay,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};