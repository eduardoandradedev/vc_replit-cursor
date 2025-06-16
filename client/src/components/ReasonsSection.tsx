// src/components/ReasonsSection.tsx
import { FeatureCard } from './FeatureCard';
import { 
  Target, Rocket, ShieldCheck, Zap, LockKeyhole, ToyBrick, Server, GaugeCircle 
} from 'lucide-react';

// 1. Definição dos dados dos cards
const reasonsData = [
  {
    title: "Precisão Total nos Dados",
    description: "Processamento server-side reduz falhas de coleta e garante que cada evento de conversão seja capturado com exatidão.",
    icon: Target,
    color: "#38bdf8" // Azul Céu
  },
  {
    title: "Site Mais Rápido",
    description: "Ao descarregar o trabalho de execução de tags para o servidor, as páginas do seu e-commerce carregam mais rápido e melhoram a experiência do usuário.",
    icon: Rocket,
    color: "#f87171" // Vermelho Claro
  },
  {
    title: "Segurança e Privacidade Reforçadas",
    description: "Dados sensíveis podem ser filtrados e mascarados antes de sair do seu domínio, facilitando a conformidade com GDPR e LGPD.",
    icon: ShieldCheck,
    color: "#4ade80" // Verde Lima
  },
  {
    title: "Imune a Ad Blockers",
    description: "Como o envio ocorre no servidor, bloqueadores de anúncios não conseguem interceptar seus eventos, mantendo a qualidade do tracking.",
    icon: Zap,
    color: "#facc15" // Amarelo
  },
  {
    title: "Resistência ao ITP",
    description: "Estenda o lifetime dos cookies e drible as restrições do Safari para manter o histórico de navegação e personalização intactos.",
    icon: LockKeyhole,
    color: "#c084fc" // Roxo
  },
  {
    title: "Flexibilidade e Escalabilidade",
    description: "Ajuste variáveis e crie novos eventos sem tocar no front-end, permitindo evoluir seu setup à medida que seu negócio cresce.",
    icon: ToyBrick,
    color: "#fb923c" // Laranja
  },
  {
    title: "Configuração Simplificada com Stape.io",
    description: "Use servidores gerenciados otimizados para sGTM, sem necessidade de montar e manter sua própria infraestrutura.",
    icon: Server,
    color: "#94a3b8" // Cinza
  },
  {
    title: "Controle Avançado de Cookies e Latência Baixa",
    description: "Gerencie manualmente os cookies, defina políticas de expiração e reduza atrasos no disparo de tags, garantindo dados sempre atualizados.",
    icon: GaugeCircle,
    color: "#f472b6" // Rosa
  }
];

export default function ReasonsSection() {
  return (
    <section className="bg-[#06070e] pt-6 md:pt-8 pb-20 sm:pb-24">
      <div className="container mx-auto px-6">
        {/* Título da Seção */}
        <div className="max-w-4l mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
            <span className="bg-gradient-to-r from-[#e3e3e3] to-[#b0b0b0] bg-clip-text text-transparent">
              Razões para usar o GTM via servidor
            </span>
          </h2>
        </div>

        {/* Grade de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reasonsData.map((reason, index) => (
            <FeatureCard
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
              iconColor={reason.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}