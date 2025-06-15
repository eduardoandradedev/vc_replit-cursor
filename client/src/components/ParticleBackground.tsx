interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Top light effect - like Cobalt */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/8 via-white/2 to-transparent blur-3xl"></div>
      
      {/* Grid pattern - consistent with Cobalt */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Rising particles - all same size like Cobalt */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-[8%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-slow"></div>
        <div className="absolute bottom-0 left-[15%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-[22%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-fast" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-[30%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-0 left-[38%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-medium" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[45%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-fast" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-0 left-[52%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-0 left-[60%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-medium" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-0 left-[68%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-fast" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-0 left-[75%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-slow" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-0 left-[82%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-medium" style={{ animationDelay: '4.2s' }}></div>
        <div className="absolute bottom-0 left-[90%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-fast" style={{ animationDelay: '1.8s' }}></div>
        
        {/* More particles scattered at different heights */}
        <div className="absolute bottom-[20%] left-[12%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-medium" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute bottom-[35%] left-[28%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-slow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-[50%] left-[42%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-fast" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-[65%] left-[58%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-medium" style={{ animationDelay: '3.8s' }}></div>
        <div className="absolute bottom-[80%] left-[72%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-slow" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-[25%] left-[85%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-fast" style={{ animationDelay: '4.5s' }}></div>
        
        {/* Additional particles for density */}
        <div className="absolute bottom-[10%] left-[5%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-medium" style={{ animationDelay: '2.2s' }}></div>
        <div className="absolute bottom-[40%] left-[18%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-slow" style={{ animationDelay: '3.7s' }}></div>
        <div className="absolute bottom-[55%] left-[35%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-fast" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute bottom-[70%] left-[48%] w-[2px] h-[2px] bg-white/25 rounded-full animate-rise-medium" style={{ animationDelay: '4.8s' }}></div>
        <div className="absolute bottom-[85%] left-[65%] w-[2px] h-[2px] bg-white/35 rounded-full animate-rise-slow" style={{ animationDelay: '1.7s' }}></div>
        <div className="absolute bottom-[15%] left-[88%] w-[2px] h-[2px] bg-white/30 rounded-full animate-rise-fast" style={{ animationDelay: '3.2s' }}></div>
        <div className="absolute bottom-[30%] left-[95%] w-[2px] h-[2px] bg-white/40 rounded-full animate-rise-medium" style={{ animationDelay: '2.9s' }}></div>
      </div>
    </div>
  );
};