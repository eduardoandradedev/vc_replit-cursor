interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-500/15 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-orange-600/25 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-orange-400/20 rounded-full animate-pulse-soft" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-orange-500/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
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