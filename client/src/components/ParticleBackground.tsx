import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional callback when particles are loaded
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Top light effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)'
        }}
      ></div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0.5px, transparent 0.5px)',
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      {/* TSParticles */}
      <Particles
        id="tsparticles"
        particlesInit={particlesInit}
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            move: {
              direction: "top",
              enable: true,
              outModes: {
                default: "out",
              },
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 25,
            },
            opacity: {
              value: 0.3,
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 2,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};