interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Rising particles */}
        <div className="absolute bottom-0 left-[10%] w-1 h-1 bg-orange-400/30 rounded-full animate-rise-slow"></div>
        <div className="absolute bottom-0 left-[25%] w-2 h-2 bg-orange-500/20 rounded-full animate-rise-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-[40%] w-1 h-1 bg-orange-600/25 rounded-full animate-rise-fast" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-[55%] w-3 h-3 bg-orange-400/15 rounded-full animate-rise-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-0 left-[70%] w-1 h-1 bg-orange-500/35 rounded-full animate-rise-medium" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[85%] w-2 h-2 bg-orange-600/20 rounded-full animate-rise-fast" style={{ animationDelay: '4s' }}></div>
        
        {/* More particles at different heights */}
        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-orange-400/25 rounded-full animate-rise-medium" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-[30%] left-[35%] w-2 h-2 bg-orange-500/20 rounded-full animate-rise-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[40%] left-[60%] w-1 h-1 bg-orange-600/30 rounded-full animate-rise-fast" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-[50%] left-[80%] w-2 h-2 bg-orange-400/20 rounded-full animate-rise-medium" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-[60%] left-[20%] w-1 h-1 bg-orange-500/25 rounded-full animate-rise-slow" style={{ animationDelay: '4.2s' }}></div>
        <div className="absolute bottom-[70%] left-[45%] w-3 h-3 bg-orange-600/15 rounded-full animate-rise-fast" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute bottom-[80%] left-[75%] w-1 h-1 bg-orange-400/30 rounded-full animate-rise-medium" style={{ animationDelay: '2.8s' }}></div>
        
        {/* Additional scattered particles */}
        <div className="absolute bottom-[10%] left-[5%] w-1 h-1 bg-orange-500/20 rounded-full animate-rise-slow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-[25%] left-[90%] w-2 h-2 bg-orange-600/25 rounded-full animate-rise-fast" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-[45%] left-[8%] w-1 h-1 bg-orange-400/35 rounded-full animate-rise-medium" style={{ animationDelay: '3.8s' }}></div>
        <div className="absolute bottom-[65%] left-[95%] w-2 h-2 bg-orange-500/15 rounded-full animate-rise-slow" style={{ animationDelay: '1.2s' }}></div>
        
        {/* Grid dots */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #fb923c 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0, 40px 40px',
          }}
        ></div>
        
        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-blue-500/3 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};