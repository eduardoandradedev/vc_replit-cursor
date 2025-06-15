/* testando 1234  */
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { Engine } from '@tsparticles/engine';
import { loadFull } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({ className = '' }: ParticleBackgroundProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      console.log('Initializing particles...');
      await loadFull(engine);
      console.log('Particles initialized successfully');
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ['#FF6B00', '#FF8C00', '#FFA500'],
            },
            links: {
              color: '#FF6B00',
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              direction: 'none',
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 0.8,
              straight: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};