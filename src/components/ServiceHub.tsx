import { useState, useEffect } from "react";
import { Paintbrush, MessageSquare, ShieldCheck, FileText, Settings, Radio, Cpu, Sparkles, Shield, ChevronRight, Activity, Zap, Flame, Key } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceItem {
  id: string;
  title: string;
  icon: any;
  badge: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  color: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "blockchain",
    title: "Blockchain Dev & Contracts",
    icon: ShieldCheck,
    badge: "Solidity / Audits",
    shortDesc: "Vetted and optimized Solidity-based configurations tailored for secure dApps.",
    longDesc: "Deep smart contract writing covering tokenomics modules (burn rates, automated buybacks), custom escrow frameworks, NFT marketplaces, and core test suite auditing to avoid exploit vectors.",
    features: ["Custom Solidity Architecture", "ERC20, ERC721 & ERC1155 Standards", "Auditing support & detailed gas reports", "Vested Token locks & Escrow systems"],
    color: "from-rose-950/30 via-red-950/15 to-transparent backdrop-blur-xl hover:border-red-500/40"
  },
  {
    id: "telegram-bots",
    title: "AI-Powered Telegram Bots",
    icon: Cpu,
    badge: "NodeJS / Automation",
    shortDesc: "Automation bots that secure, moderate, and trade inside active chats.",
    longDesc: "Building custom bot applications integrated with advanced data layers. These bots run analytical calculations, notify developers of on-chain activities, guard public spaces against bot spam, and moderate naturally.",
    features: ["Anti-Raid and captcha gates", "Custom price tracking calculators", "Solana / Ethereum contract alert systems", "Interactive reward gamification engines"],
    color: "from-zinc-950/35 via-zinc-900/15 to-transparent backdrop-blur-xl hover:border-orange-500/40"
  },
  {
    id: "graphics-stickers",
    title: "Graphics & Sticker Designs",
    icon: Paintbrush,
    badge: "Vector Branding",
    shortDesc: "Premium vector Telegram sticker packs, branding decks, and custom emojis 😮.",
    longDesc: "Creative asset development that fuels organic community excitement. High-fidelity typography, crisp custom sticker series representing your coin's signature memes, and vector infographics.",
    features: ["Custom Telegram Sticker series", "Bespoke dynamic custom emojis", "Pitch decks & Whitepaper graphical layouts", "Social banner designs & brand styleguides"],
    color: "from-purple-950/30 via-zinc-950/15 to-transparent backdrop-blur-xl hover:border-purple-500/40"
  },
  {
    id: "ama-moderation",
    title: "AMA Hosting & Moderator",
    icon: Radio,
    badge: "Public Speaker",
    shortDesc: "Experienced voice moderator handling highly professional founders interview setups.",
    longDesc: "Experienced in managing and presenting live AMAs across Twitter Spaces or premium Telegram voice hubs. Vetting your project’s core tech points with logical progression for high investor confidence.",
    features: ["Highly targeted code auditing review", "Interactive listener reward distribution", "Pre-event AMA coordinate structure", "Viewer statistics analytics reporting"],
    color: "from-blue-950/30 via-zinc-950/15 to-transparent backdrop-blur-xl hover:border-blue-500/40"
  },
  {
    id: "web-dev",
    title: "Full-Stack Website Dev",
    icon: Sparkles,
    badge: "React / Vite / Tailwind",
    shortDesc: "Responsive premium websites built with state-of-the-art styling.",
    longDesc: "Designing and developing stunning React applications matching your brand’s prestige. Highly polished, lightweight interfaces featuring glassmorphic themes, modular CSS structures, and lightning-fast scrolling speeds.",
    features: ["Modern React & Vite configuration", "Tailwind styling & full fluid responsiveness", "Dynamic Web3 wallet connection adapters", "Interactive tokenomics dashboards"],
    color: "from-emerald-950/30 via-zinc-950/15 to-transparent backdrop-blur-xl hover:border-emerald-500/40"
  },
  {
    id: "community",
    title: "Community Management",
    icon: MessageSquare,
    badge: "Telegram & Discord",
    shortDesc: "Securing spaces with strict community guidelines and organic growth loops.",
    longDesc: "Keeping group dynamics active, safe, and positive. Establishing clear moderation guidelines, organizing viral community contests, and maintaining stable investor sentiment.",
    features: ["Telegram & Discord server building", "Spam filter fine-tuning setups", "High-sentiment engagement loops", "Moderators roster coordinating and scheduling"],
    color: "from-amber-950/30 via-zinc-950/15 to-transparent backdrop-blur-xl hover:border-amber-500/40"
  },
  {
    id: "content-writing",
    title: "Educational Content Writing",
    icon: FileText,
    badge: "Crypto & Tech",
    shortDesc: "Professional Web3 columns, technical documentation, and explanatory posts.",
    longDesc: "Simplifying deep blockchain topics into engaging reading material. Writing educative blog posts, drafting smart contract technical guides, and composing newsletters.",
    features: ["Comprehensive educational token logs", "In-depth smart contract breakdowns", "Medium & Substack technology columns", "Slick project pitch deck scripts"],
    color: "from-stone-900/30 via-zinc-950/15 to-transparent backdrop-blur-xl hover:border-stone-500/40"
  }
];

export default function ServiceHub() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Simulated live on-chain stats
  const [ethGas, setEthGas] = useState(14);
  const [solFee, setSolFee] = useState(0.00005);
  const [blockHeight, setBlockHeight] = useState(20268516);
  const [arbGas, setArbGas] = useState(0.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setEthGas((prev) => Math.max(8, Math.min(45, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSolFee((prev) => parseFloat(Math.max(0.00003, Math.min(0.0001, prev + (Math.random() - 0.5) * 0.00001)).toFixed(5)));
      setArbGas((prev) => parseFloat(Math.max(0.05, Math.min(0.25, prev + (Math.random() - 0.5) * 0.02)).toFixed(3)));
      setBlockHeight((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 text-left">
      
      {/* Live On-Chain Parameter Hub Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        
        {/* Card 1: ETH Mainnet Gas */}
        <div className="glass-panel rounded-2xl p-4 bg-zinc-950/15 hover:bg-zinc-950/20 border border-zinc-800/10 hover:border-zinc-800/25 transition-all duration-300 backdrop-blur-xl flex items-center gap-3 hover-glow-red">
          <div className="p-2.5 bg-red-950/30 border border-red-500/10 rounded-lg text-red-500 shrink-0 select-none">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">ETH Mainnet Gas</div>
            <div className="text-sm font-mono font-bold text-zinc-100 flex items-baseline gap-1 mt-0.5">
              <span>{ethGas}</span> <span className="text-[9px] text-red-500 font-normal">Gwei</span>
            </div>
          </div>
        </div>

        {/* Card 2: Solana TX Speed */}
        <div className="glass-panel rounded-2xl p-4 bg-zinc-950/15 hover:bg-zinc-950/20 border border-zinc-800/10 hover:border-zinc-800/25 transition-all duration-300 backdrop-blur-xl flex items-center gap-3 hover-glow-red">
          <div className="p-2.5 bg-orange-950/30 border border-orange-500/10 rounded-lg text-orange-400 shrink-0 select-none">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Solana TX Speed</div>
            <div className="text-sm font-mono font-bold text-zinc-100 flex items-baseline gap-1 mt-0.5">
              <span>{solFee}</span> <span className="text-[9px] text-orange-400 font-normal">SOL</span>
            </div>
          </div>
        </div>

        {/* Card 3: Arbitrum Gas */}
        <div className="glass-panel rounded-2xl p-4 bg-zinc-950/15 hover:bg-zinc-950/20 border border-zinc-800/10 hover:border-zinc-800/25 transition-all duration-300 backdrop-blur-xl flex items-center gap-3 hover-glow-red">
          <div className="p-2.5 bg-blue-950/30 border border-blue-500/10 rounded-lg text-blue-400 shrink-0 select-none">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Arbitrum Gas</div>
            <div className="text-sm font-mono font-bold text-zinc-100 flex items-baseline gap-1 mt-0.5">
              <span>{arbGas}</span> <span className="text-[9px] text-blue-400 font-normal">Gwei</span>
            </div>
          </div>
        </div>

        {/* Card 4: EVM Block Index */}
        <div className="glass-panel rounded-2xl p-4 bg-zinc-950/15 hover:bg-zinc-950/20 border border-zinc-800/10 hover:border-zinc-800/25 transition-all duration-300 backdrop-blur-xl flex items-center gap-3 hover-glow-red">
          <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/10 rounded-lg text-emerald-400 shrink-0 select-none">
            <Shield className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">EVM Block Index</div>
            <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5 transition-all">
              #{blockHeight.toLocaleString()}
            </div>
          </div>
        </div>

      </div>

      {/* Bento grid services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
        
        {SERVICES.map((srv, idx) => {
          const isFullWidthOnLg = idx === 0 || idx === 1; // span more for highlighting
          const spanClass = isFullWidthOnLg ? "lg:col-span-6" : "lg:col-span-4";
          const isActive = activeCardId === srv.id;

          return (
            <motion.div
              key={srv.id}
              onClick={() => setActiveCardId(isActive ? null : srv.id)}
              className={`p-6 rounded-2xl bg-gradient-to-tr border text-left cursor-pointer transition-colors duration-300 hover-glow-red ${srv.color} ${spanClass} ${
                isActive ? "border-red-500/50 shadow-xl" : "border-zinc-850"
              }`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                  <srv.icon className="w-6 h-6 text-red-500" />
                </span>
                <span className="text-[10px] font-mono tracking-widest bg-red-950 text-red-400 px-2.5 py-1 rounded border border-red-500/20 font-bold uppercase">
                  {srv.badge}
                </span>
              </div>

              <h4 className="text-lg font-bold font-sans text-zinc-100 mb-2 tracking-tight">
                {srv.title}
              </h4>
              
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-4 font-sans">
                {srv.shortDesc}
              </p>

              {/* Expand section */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-zinc-900/80 flex flex-col gap-4 pb-4">
                      <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                        {srv.longDesc}
                      </p>

                      <div className="flex flex-col gap-1.5 bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">Key Features:</span>
                        {srv.features.map((ft, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                            <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{ft}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-red-400">
                <span>{isActive ? "Tap to Minimise" : "Tap for Features"}</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? "rotate-90 text-white" : "text-red-500"}`} />
              </div>

            </motion.div>
          );
        })}
        
      </div>
    </div>
  );
}
