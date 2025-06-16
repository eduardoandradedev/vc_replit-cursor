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
    height: 32
  },
  {
    name: 'GTM',
    logo: tagmanagerLogo,
    height: 24
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

// Função para obter o estilo da altura da logo
const getLogoHeight = (height?: number) => {
  return height ? { height: `${height}px` } : { height: '32px' };
};

export default function PlatformCarousel() {
  return (
    <div className="w-full overflow-hidden mt-16">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          <p className="text-sm font-medium text-white/60">
            Integração com as principais plataformas
          </p>
        </div>
      </div>
      
      <div className="relative overflow-hidden py-4">
        {/* Continuous scrolling animation */}
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set */}
          {platforms.map((platform, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center mx-8"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                style={getLogoHeight(platform.height)}
                className="w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          ))}
          
          {/* Second set for seamless loop */}
          {platforms.map((platform, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center mx-8"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                style={getLogoHeight(platform.height)}
                className="w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}