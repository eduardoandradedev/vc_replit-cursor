import { useEffect, useState } from 'react';
import shopifyLogo from '@assets/Shopify.com_Logo_2_1750070139007.webp';
import nuvemshopLogo from '@assets/NuvemShop.png';
import woocommerceLogo from '@assets/WooCommerce.png';
import lojaintegradaLogo from '@assets/lojaIntegrada.png';
import vtexLogo from '@assets/VTEX.png';
import magentoLogo from '@assets/magentoLogo.png';
import googleAdsLogo from '@assets/googleadsLogo.png';
import metaLogo from '@assets/metaLogo.png';
import tagmanagerLogo from '@assets/tagmanagerLogo.png';

interface Platform {
  name: string;
  logo: string;
  height?: number; // altura em pixels
}

const platforms: Platform[] = [
  {
    name: 'Meta Ads',
    logo: metaLogo,
    height: 40
  },
  {
    name: 'Google Ads',
    logo: googleAdsLogo,
    height: 44
  },
  {
    name: 'GTM',
    logo: tagmanagerLogo,
    height: 48
  },
  {
    name: 'Shopify',
    logo: shopifyLogo,
    height: 40
  },
  {
    name: 'WooCommerce',
    logo: woocommerceLogo,
    height: 50
  },
  {
    name: 'NuvemShop',
    logo: nuvemshopLogo,
    height: 58
  },
  {
    name: 'VTEX',
    logo: vtexLogo,
    height: 32
  },
  {
    name: 'Loja Integrada',
    logo: lojaintegradaLogo,
    height: 56
  },
  {
    name: 'Magento',
    logo: magentoLogo,
    height: 56
  }
];

// Função para obter classes responsivas baseadas na altura
const getResponsiveClasses = (height?: number) => {
  // Tamanhos extremamente pequenos para garantir compatibilidade total
  return "h-2.5 xs:h-3 sm:h-4 md:h-6 lg:h-8"; // Todos os tamanhos muito reduzidos
};

export default function PlatformCarousel() {
  return (
    <div className="w-full overflow-hidden mt-4 sm:mt-6 lg:mt-12">
      <div className="text-center mb-3 sm:mb-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white/60">
            Integração com as principais plataformas
          </p>
        </div>
      </div>
      
      <div className="relative overflow-hidden py-0.5 sm:py-1 md:py-2">
        {/* Continuous scrolling animation */}
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set */}
          {platforms.map((platform, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center mx-1 sm:mx-2 md:mx-4 lg:mx-6"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className={`w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300 ${getResponsiveClasses(platform.height)}`}
              />
            </div>
          ))}
          
          {/* Second set for seamless loop */}
          {platforms.map((platform, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center mx-1 sm:mx-2 md:mx-4 lg:mx-6"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className={`w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300 ${getResponsiveClasses(platform.height)}`}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute top-0 left-0 w-4 sm:w-8 md:w-16 lg:w-24 h-full bg-gradient-to-r from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 sm:w-8 md:w-16 lg:w-24 h-full bg-gradient-to-l from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}