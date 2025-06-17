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
  heightClasses: string;
}

const platforms: Platform[] = [
  { name: 'Meta Ads',       logo: metaLogo,          heightClasses: 'h-6 sm:h-8 md:h-7'  },
  { name: 'Google Ads',     logo: googleAdsLogo,     heightClasses: 'h-7 sm:h-9 md:h-10' },
  { name: 'GTM',            logo: tagmanagerLogo,    heightClasses: 'h-8 sm:h-10 md:h-11'},
  { name: 'Shopify',        logo: shopifyLogo,       heightClasses: 'h-6 sm:h-8 md:h-9' },
  { name: 'WooCommerce',    logo: woocommerceLogo,   heightClasses: 'h-8 sm:h-10 md:h-12'},
  { name: 'NuvemShop',      logo: nuvemshopLogo,     heightClasses: 'h-9 sm:h-11 md:h-14'},
  { name: 'VTEX',           logo: vtexLogo,          heightClasses: 'h-5 sm:h-7 md:h-8'  },
  { name: 'Loja Integrada', logo: lojaintegradaLogo, heightClasses: 'h-10 sm:h-11 md:h-14'},
  { name: 'Magento',        logo: magentoLogo,       heightClasses: 'h-8 sm:h-11 md:h-9' }
];

export default function PlatformCarousel() {
  // Duplicação simples para loop perfeito
  const trackItems = [...platforms, ...platforms];

  return (
    <div className="relative w-full overflow-hidden mt-3 sm:mt-6 lg:mt-6">
      <div className="relative overflow-hidden py-2 sm:py-4">
        {/* Track animado com Tailwind: mais lento no mobile, mais rápido no desktop */}
        <div
          className="flex min-w-max whitespace-nowrap will-change-transform items-center animate-infinite-scroll-mobile sm:animate-infinite-scroll"
        >
          {trackItems.map((plat, idx) => (
            <div
              key={idx}
              className={`
                flex-shrink-0 flex items-center justify-center
                mx-4 sm:mx-6 lg:mx-8
                ${plat.heightClasses}
              `}
            >
              <img
                src={plat.logo}
                alt={plat.name}
                className="
                  h-full w-auto object-contain
                  grayscale opacity-60 hover:opacity-80
                  transition-opacity duration-300
                  mx-auto
                "
                style={{ display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* Gradientes para o fade nas bordas */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[#06070e] via-[#06070e]/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
