import { useEffect, useState } from 'react';

interface Platform {
  name: string;
  logo: string;
}

const platforms: Platform[] = [
  {
    name: 'Meta Ads',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzdGRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDEyLjA3M0MyNCA1LjQwNSAxOC42MjcgMCAxMiAwUzAgNS40MDUgMCAxMi4wNzNDMCAxOC4xIDQuMzg4IDIzLjA5NCA5Ljg3NSAyNHYtOC40MzlINi45MDNWMTIuMDczSDkuODc1VjkuNDEzYzAtMi45NDQgMS43OTQtNC41NTYgNC41MzMtNC41NTYgMS4zMTIgMCAyLjY4Ni4yMjUgMi42ODYuMjI1djIuOTcySDE1LjgzYy0xLjQ5MSAwLTEuOTU2LjkxOS0xLjk1NiAxLjg1OXYyLjE2aDMuMzI4bC0uNTMyIDMuNDg4aC0yLjc5NlYyNEMxOS42MTIgMjMuMDk0IDI0IDE4LjEgMjQgMTIuMDczWiIvPgo8L3N2Zz4K'
  },
  {
    name: 'Google Ads',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRBOUJGRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjggMTJjMC02LjYyNy01LjM3My0xMi0xMi0xMlMtLjIgNS4zNzMtLjIgMTJzNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTJaTTE3LjUgMTJjMCAwIDMuNS0xLjYgMy41LTQgMC0xLjktMS42LTMuNS0zLjUtMy41cy0zLjUgMS42LTMuNSAzLjUgMS42IDMuNSAzLjUgMy41aDEuNVoiLz4KPC9zdmc+'
  },
  {
    name: 'GTM',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRBOUJGRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBTMiAxNy41MjMgMiAxMiA2LjQ3NyAyIDEyIDJabTcuNzUgMTBjMCA0LjI3Ny0zLjQ3MyA3Ljc1LTcuNzUgNy43NVM0LjI1IDE2LjI3NyA0LjI1IDEyIDcuNzIzIDQuMjUgMTIgNC4yNXM3Ljc1IDMuNDczIDcuNzUgNy43NVoiLz4KPC9zdmc+'
  },
  {
    name: 'Shopify',
    logo: '/attached_assets/Shopify.com_Logo_2_1750070139007.webp'
  },
  {
    name: 'WooCommerce',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk2NTg4QSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjEgMTBjLS43LTEuNy0yLjMtMy01LjEtM2gtLjZjLS44IDAtMS41LjYtMS43IDEuNGwtMS4xIDQuNEwxMiA3LjZjLS4yLS44LS45LTEuNC0xLjctMS40aC0uN2MtMi44IDAtNC4zIDEuMy01LjEgM0MzLjcgMTEuNyAzIDEzLjkgMyAxNi41YzAgMi42LjcgNC44IDEuNSA2LjUuNyAxLjcgMi4zIDMgNS4xIDNoLjdjLjggMCAxLjUtLjYgMS43LTEuNGwxLjEtNC40IDIuNSA1LjJjLjIuOC45IDEuNCAxLjcgMS40aC43YzIuOCAwIDQuMy0xLjMgNS4xLTMgLjctMS43IDEuNS0zLjkgMS41LTYuNXMtLjctNC44LTEuNS02LjVaIi8+Cjwvc3ZnPgo='
  },
  {
    name: 'NuvemShop',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzdGRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMlptMCAxOGMtNC40MjEgMC04LTMuNTc5LTgtOHMzLjU3OS04IDgtOCA4IDMuNTc5IDggOC0zLjU3OSA4LTggOFptMy01YzEuMzggMCAyLjUtMS4xMiAyLjUtMi41UzE2LjM4IDEwIDEzIDEwIDEwLjUgMTEuMTIgMTAuNSAxMi41IDExLjYyIDE1IDEzIDE1WiIvPgo8L3N2Zz4K'
  },
  {
    name: 'VTEX',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGMDA1NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgOGgyMGwtOCA4TDIgOFptMTAgOUwyIDlIMjJMMTIgMTdaIi8+Cjwvc3ZnPgo='
  },
  {
    name: 'Loja Integrada',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzdGRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDEgMCAyMCAxMCAxMCAwIDAgMSAwLTIwWm0wIDJhOCA4IDAgMSAwIDAgMTYgOCA4IDAgMCAwIDAtMTZaIi8+Cjwvc3ZnPgo='
  },
  {
    name: 'Magento',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0VFNjcyRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMy41IDYuNXYxMS4zTDEyIDIybDguNS00LjJWNi41TDEyIDJabTUuNSAxNC41TDEyIDE5bC01LjUtMi41VjguNUwxMiA2bDUuNSAyLjV2OFoiLz4KPC9zdmc+'
  }
];

export default function PlatformCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-white/60 mb-6">
          Integração com as principais plataformas
        </p>
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
                className="h-8 w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
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
                className="h-8 w-auto object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
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