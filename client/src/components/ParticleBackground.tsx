interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Top light effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
        }}
      ></div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0.5px, transparent 0.5px)',
          backgroundSize: '25px 25px'
        }}
      ></div>
      
      {/* Rising particles using CSS */}
      <div className="absolute inset-0">
        {/* Batch 1 - Bottom row */}
        <div className="particle absolute bottom-0 left-[5%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-slow"></div>
        <div className="particle absolute bottom-0 left-[12%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-medium" style={{ animationDelay: '1s' }}></div>
        <div className="particle absolute bottom-0 left-[20%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-fast" style={{ animationDelay: '0.5s' }}></div>
        <div className="particle absolute bottom-0 left-[28%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-slow" style={{ animationDelay: '2s' }}></div>
        <div className="particle absolute bottom-0 left-[35%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-medium" style={{ animationDelay: '0.8s' }}></div>
        <div className="particle absolute bottom-0 left-[42%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-fast" style={{ animationDelay: '1.5s' }}></div>
        <div className="particle absolute bottom-0 left-[50%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-slow" style={{ animationDelay: '2.5s' }}></div>
        <div className="particle absolute bottom-0 left-[58%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-medium" style={{ animationDelay: '1.2s' }}></div>
        <div className="particle absolute bottom-0 left-[65%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-fast" style={{ animationDelay: '3s' }}></div>
        <div className="particle absolute bottom-0 left-[72%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-slow" style={{ animationDelay: '0.3s' }}></div>
        <div className="particle absolute bottom-0 left-[80%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-medium" style={{ animationDelay: '1.8s' }}></div>
        <div className="particle absolute bottom-0 left-[88%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-fast" style={{ animationDelay: '2.2s' }}></div>
        <div className="particle absolute bottom-0 left-[95%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-slow" style={{ animationDelay: '1.7s' }}></div>
        
        {/* Batch 2 - Mid level */}
        <div className="particle absolute bottom-[25%] left-[8%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-medium" style={{ animationDelay: '3.5s' }}></div>
        <div className="particle absolute bottom-[30%] left-[25%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-fast" style={{ animationDelay: '0.7s' }}></div>
        <div className="particle absolute bottom-[35%] left-[45%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-slow" style={{ animationDelay: '2.8s' }}></div>
        <div className="particle absolute bottom-[40%] left-[68%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-medium" style={{ animationDelay: '1.3s' }}></div>
        <div className="particle absolute bottom-[45%] left-[85%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-fast" style={{ animationDelay: '3.2s' }}></div>
        
        {/* Batch 3 - Upper level */}
        <div className="particle absolute bottom-[60%] left-[15%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-slow" style={{ animationDelay: '4s' }}></div>
        <div className="particle absolute bottom-[65%] left-[38%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-medium" style={{ animationDelay: '0.9s' }}></div>
        <div className="particle absolute bottom-[70%] left-[62%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-fast" style={{ animationDelay: '2.7s' }}></div>
        <div className="particle absolute bottom-[75%] left-[78%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-slow" style={{ animationDelay: '1.4s' }}></div>
        
        {/* Batch 4 - Scattered extras */}
        <div className="particle absolute bottom-[15%] left-[32%] w-[2px] h-[2px] bg-white/45 rounded-full animate-rise-medium" style={{ animationDelay: '4.5s' }}></div>
        <div className="particle absolute bottom-[55%] left-[92%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-fast" style={{ animationDelay: '0.4s' }}></div>
        <div className="particle absolute bottom-[80%] left-[22%] w-[2px] h-[2px] bg-white/50 rounded-full animate-rise-slow" style={{ animationDelay: '3.8s' }}></div>
        <div className="particle absolute bottom-[85%] left-[52%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-medium" style={{ animationDelay: '2.1s' }}></div>
      </div>
    </div>
  );
};