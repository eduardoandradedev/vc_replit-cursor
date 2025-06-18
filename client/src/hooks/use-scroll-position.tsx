import { useState, useEffect } from 'react';

interface UseScrollPositionReturn {
  scrollY: number;
  isFormVisible: boolean;
  showFloatingButton: boolean;
}

export function useScrollPosition(): UseScrollPositionReturn {
  const [scrollY, setScrollY] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Verificar se o formulário está visível na tela
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const isVisible = formRect.top <= window.innerHeight * 0.8; // 80% da altura da tela
        setIsFormVisible(isVisible);
      }

      // Mostrar botão com delay após scroll inicial (hero section)
      const heroHeight = window.innerHeight * 0.8; // 80vh aproximadamente
      const shouldShow = currentScrollY > heroHeight + 200; // 200px de delay extra
      setShowFloatingButton(shouldShow);

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    const handleScroll = () => requestTick();

    // Configuração inicial
    updateScrollPosition();

    // Adicionar listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY,
    isFormVisible,
    showFloatingButton: showFloatingButton && !isFormVisible, // Ocultar quando formulário estiver visível
  };
} 