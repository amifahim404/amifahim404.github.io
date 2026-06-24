import { useState } from "react";
import { Terminal, Bot, Sparkles, Radio, ArrowRight, ShieldAlert, Cpu, Heart, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StepItem {
  id: number;
  label: string;
  icon: any;
  title: string;
  subtitle: string;
  desc: string;
  benefit: string;
  techStack: string[];
}

const PLAN_STEPS: StepItem[] = [
  {
    id: 1,
    label: "PHASE 01",
    icon: Code,
    title: "Secure Solidity Architecture",
    subtitle: "Mathematical Verification & Reentrancy Audits",
    desc: "We analyze tokenomics, lockboxes, tax tiers, and custom routing handlers. Code is built from verified templates to ensure infinite immutability and complete resistance to sandwich attacks/frontrunning exploits.",
    benefit: "Out-of-the-box resistance to gas-siphon attacks and malicious flash loans.",
    techStack: ["Solidity", "Hardhat", "Foundry", "Slither", "Ethers.js"]
  },
  {
    id: 2,
    label: "PHASE 02",
    icon: Bot,
    title: "Bot Engine & Telemetry Hookups",
    subtitle: "Instant Alerting Node Frameworks",
    desc: "We deploy custom node gateways and Telegram chat simulators to orchestrate instant buy-alerts, real-time token tracking statistics, premium custom user commands, and multi-sig wallets trackers.",
    benefit: "Keeps community developers, project leaders, and users synchronized instantly with zero lag.",
    techStack: ["Node.js", "Web3.js", "Ethers", "Docker", "TG API"]
  },
  {
    id: 3,
    label: "PHASE 03",
    icon: Sparkles,
    title: "Viral Sticker & Aesthetic Design",
    subtitle: "High-Immersive Custom Brand Assets",
    desc: "A custom curated graphic bundle containing bespoke community vector icons, premium vector logo modifications, high-compression meme stickers, and dynamic social media banner kits.",
    benefit: "Drives authentic user adoption and establishes massive visual recognition across social feeds.",
    techStack: ["Inkscape", "Figma", "Sticker Max", "Optimizers"]
  },
  {
    id: 4,
    label: "PHASE 04",
    icon: Radio,
    title: "Coordinated AMA Broadcaster",
    subtitle: "Max-Immersion Technical Moderation Stage",
    desc: "Fahim Farouqe and his team take active control of your voice/video staging. Running custom community Q&As, managing high-fidelity visual streams, compiling questions, and executing engaging community AMAs with verified security.",
    benefit: "Converts passive social watchers into bullish, loyal long-term holders.",
    techStack: ["OBS Studio", "TG Voice", "Discord Streams", "Moderator Nodes"]
  }
];

export default function BattlePlan() {
  const [activeStepId, setActiveStepId] = useState<number>(1);

  const activeStep = PLAN_STEPS.find((s) => s.id === activeStepId) || PLAN_STEPS[0];

  return (
    <div className="w-full flex flex-col gap-8 text-left relative z-10 py-4">
      
      {/* Informative Header */}
      <div>
        <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">The Decisive Formula</span>
        <h3 className="text-2xl md:text-3xl font-black font-sans text-zinc-100 mt-1 tracking-tight">
          Sovereign Delivery Battle Plan
        </h3>
        <p className="text-sm text-zinc-400 mt-1.5 font-sans">
          How Fahim Farouqe and his specialized team secure, design, and propagate your Web3 project from first commit to viral launch.
        </p>
      </div>

      {/* Grid: Left Column Stages, Right Column High Fidelity details card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:h-[450px]">
        
        {/* Stages list (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3 h-full">
          {PLAN_STEPS.map((step) => {
            const isSelected = step.id === activeStepId;
            const IconComp = step.icon;

            return (
              <motion.button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`p-4 rounded-xl border text-left flex items-start gap-4 focus:outline-none focus:ring-0 cursor-pointer relative overflow-hidden transition-colors duration-300 lg:flex-1 ${
                  isSelected
                    ? "border-transparent bg-zinc-950/60"
                    : "border-zinc-900/30 bg-zinc-950/40 text-zinc-500 hover:text-zinc-350"
                }`}
              >
                {/* Smooth sliding active pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activePhaseBg"
                    className="absolute inset-0 bg-red-950/20 border border-red-500/30 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}

                {/* Numeric/Icon node badge */}
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold tracking-tight text-xs border shrink-0 transition-colors relative z-10 ${
                  isSelected 
                    ? "text-red-400 bg-red-950/30 border-red-500/20" 
                    : "text-zinc-600 bg-zinc-900/30 border-zinc-800/40"
                }`}>
                  <IconComp className="w-4 h-4" />
                </span>

                <div className="flex flex-col gap-0.5 relative z-10">
                  <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-red-500">{step.label}</span>
                  <h4 className={`font-extrabold text-sm font-sans tracking-tight transition-colors ${
                    isSelected ? "text-zinc-100" : "text-zinc-400"
                  }`}>{step.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono line-clamp-1">{step.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detailed Stage Card Panel (7 columns) */}
        <div 
          className="lg:col-span-7 bg-zinc-950/95 border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden h-full shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle decoration background grids */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-500/[0.01]" />
          
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 flex flex-col gap-5 h-full justify-between"
          >
            <div>
              {/* Header indicators */}
              <div className="flex justify-between items-center border-b border-zinc-900/60 pb-3">
                <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-wider bg-red-950/40 px-2.5 py-1 rounded border border-red-500/15">
                  {activeStep.label} DIRECTIVES
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <Terminal className="w-3.5 h-3.5 text-zinc-600 animate-pulse" />
                  <span>SECURE PROCESS</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-100 font-sans mt-4 tracking-tight leading-tight">
                {activeStep.title} // {activeStep.subtitle}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm font-sans leading-relaxed mt-3">
                {activeStep.desc}
              </p>

              {/* Vouched outcomes benefits */}
              <div className="mt-5 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-850 flex gap-2.5 items-start">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Client Yield / Core Outcome</span>
                  <span className="text-zinc-300 text-xs leading-normal mt-0.5 font-sans font-medium">{activeStep.benefit}</span>
                </div>
              </div>
            </div>

            {/* Verified Stack Tech Badges bottom panel */}
            <div className="border-t border-zinc-900/60 pt-4 mt-6 flex flex-wrap gap-2.5 items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest select-none">
                <Cpu className="w-4 h-4 text-zinc-600 animate-pulse" />
                <span>Deployment Stack:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeStep.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-850/60 rounded text-[9px] font-mono font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

      </div>

    </div>
  );
}
