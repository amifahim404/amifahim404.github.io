import React from "react";
import { Briefcase, Calendar, ShieldCheck, Flame, Cpu, Globe, Users } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  description: string;
  skills: string[];
  status: "ongoing" | "completed";
  highlight: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Zugchain",
    period: "2026 - PRESENT",
    role: "Lead Node & Web3 Specialist",
    description: "Developing high-performance sovereign node architectures and smart contracts, optimizing chain integrations and advanced transaction pipelines.",
    skills: ["Solidity", "Node Optimization", "Smart Audits", "EVM Assemblies"],
    status: "ongoing",
    highlight: true,
  },
  {
    company: "Igse",
    period: "2025 - PRESENT",
    role: "Core Smart Contract Architect",
    description: "Architecting decentralized systems, gas-optimized token pools, and advanced security constraints for corporate multi-chain ecosystems.",
    skills: ["DeFi Protocols", "Security Engineering", "React dApps", "Multi-Sig"],
    status: "ongoing",
    highlight: false,
  },
  {
    company: "Renewlabs",
    period: "2024 - 2025",
    role: "Web3 Developer & Consultant",
    description: "Shipped highly responsive dApp interfaces, customized web platforms, and automated sentiment monitoring pipelines for community launch stages.",
    skills: ["Next.js/React", "Web3 Integration", "Sentiment Engines", "UI Design"],
    status: "completed",
    highlight: false,
  },
  {
    company: "Vica Foundation",
    period: "2023 - PRESENT",
    role: "Senior Blockchain Liaison & Moderator",
    description: "Hosting and organizing professional, engaging speaker sessions, community stages, and direct Web3 outreach campaigns.",
    skills: ["AMA Hosting", "Community Architecture", "Strategic Liaison", "Branding"],
    status: "ongoing",
    highlight: true,
  },
  {
    company: "Dynex",
    period: "2022 - PRESENT",
    role: "Decentralized Infrastructure Contributor",
    description: "Assisting in building consensus client utilities and providing rapid response support for customized automation bot nodes.",
    skills: ["Solidity Compiler", "Bot Automation", "EVM Mechanics", "Rust"],
    status: "ongoing",
    highlight: true,
  },
  {
    company: "Bull run Ai",
    period: "2022 - PRESENT",
    role: "Autonomous Agent & Bot Developer",
    description: "Created high-fps trading companion bots, customized sentiment and moderator algorithms, and high-fidelity Telegram stickers packs.",
    skills: ["Telegram Emojis", "Trading Bots", "Graphics Styling", "AI Systems"],
    status: "ongoing",
    highlight: false,
  },
  {
    company: "Omega Network",
    period: "2022 - 2023",
    role: "Web3 UI/UX & Contract Developer",
    description: "Designed core platform features and deployed secure ERC20 distribution logic for large pool holders.",
    skills: ["Tokenomics Design", "Figma Design", "React", "Audit Checks"],
    status: "completed",
    highlight: false,
  },
  {
    company: "Ibt",
    period: "2021",
    role: "Smart Contract Developer",
    description: "Created early token prototypes, launched testing contracts in EVM testnets, and developed initial responsive layouts.",
    skills: ["Solidity", "Tailwind CSS", "Testing Nets", "Dapp Layouts"],
    status: "completed",
    highlight: false,
  }
];

const getCompanyLogo = (company: string, isHighlight: boolean) => {
  const colorClass = isHighlight ? "text-red-400" : "text-zinc-400";
  
  switch (company.toLowerCase()) {
    case "zugchain":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="zugchainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbef3a" />
              <stop offset="100%" stopColor="#9cb31c" />
            </linearGradient>
            <filter id="zugchainGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Upper interlocking winged curve */}
          <path 
            d="M 5 9.5 C 14 9.5, 27 10, 27 16 H 18 C 18 16, 12 16, 5 9.5 Z" 
            fill="url(#zugchainGrad)" 
            filter="url(#zugchainGlow)"
          />
          {/* Lower interlocking winged curve */}
          <path 
            d="M 27 22.5 C 18 22.5, 5 22, 5 16 H 14 C 14 16, 20 16, 27 22.5 Z" 
            fill="url(#zugchainGrad)" 
            filter="url(#zugchainGlow)"
          />
        </svg>
      );
    case "igse":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Capital loop of the letter g */}
          <circle cx="16" cy="12" r="8" fill="#ffffff" />
          <circle cx="16" cy="12" r="5" fill="#09090b" />
          
          {/* Tail loop of the letter g */}
          <path 
            d="M 11.5 15 C 11.5 19, 11 25.5, 16 25.5 C 21 25.5, 20.5 19.5, 20.5 17.5" 
            stroke="#ffffff" 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Slogan "coin IGS" printed cleanly in the dark center card ring */}
          <text x="16" y="11" fill="white" fontSize="2.2" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.1">COIN</text>
          <text x="16" y="15" fill="white" fontSize="3.8" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">igs</text>
        </svg>
      );
    case "renewlabs":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 8-blade premium folded pinwheel logo */}
          <g transform="translate(16, 16)">
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" fill="#22c55e" /> {/* Green */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(45)" fill="#a3e635" /> {/* Yellow-Green */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(90)" fill="#eab308" /> {/* Yellow */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(135)" fill="#fb923c" /> {/* Orange */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(180)" fill="#ef4444" /> {/* Red */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(225)" fill="#ec4899" /> {/* Pink */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(270)" fill="#3b82f6" /> {/* Blue */}
            <path d="M 0 0 L 0 -11 L 5.5 -5.5 Z" transform="rotate(315)" fill="#06b6d4" /> {/* Cyan */}
          </g>
          <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
        </svg>
      );
    case "vica foundation":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vicaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
          </defs>
          
          {/* Back half of the tilted ring going behind the letter V */}
          <path 
            d="M 5 16 C 5 12, 27 12, 27 16" 
            stroke="url(#vicaBlue)" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.6"
          />

          {/* Futuristic clean V shape */}
          <path 
            d="M 7 7 L 13.5 25.5 C 13.8 26.3, 14.8 26.3, 15.1 25.5 L 25 7 H 19.5 L 14.3 21 L 11.5 7 H 7 Z" 
            fill="url(#vicaBlue)" 
          />

          {/* Front half of the tilted ring going in front of the letter V */}
          <path 
            d="M 5 16 C 5 21, 27 21, 27 16" 
            stroke="url(#vicaBlue)" 
            strokeWidth="3.2" 
            fill="none" 
          />
        </svg>
      );
    case "dynex":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dnxNeon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#4facfe" />
            </linearGradient>
            <filter id="dnxGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Glowing outer hexagon path */}
          <polygon 
            points="16,3 27.5,9.6 27.5,22.4 16,29 4.5,22.4 4.5,9.6" 
            stroke="url(#dnxNeon)" 
            strokeWidth="2" 
            fill="#09090b" 
            fillOpacity="0.4"
            strokeLinejoin="round" 
            filter="url(#dnxGlow)"
          />
          {/* Center portal peak arch chevron */}
          <path 
            d="M 10.5 17.5 L 16 12 L 21.5 17.5" 
            stroke="url(#dnxNeon)" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Multi-tier parallel gateway rails */}
          <line x1="12.5" y1="18.5" x2="12.5" y2="23" stroke="url(#dnxNeon)" strokeWidth="2" strokeLinecap="round" />
          <line x1="19.5" y1="18.5" x2="19.5" y2="23" stroke="url(#dnxNeon)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "bull run ai":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bullGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe259" />
              <stop offset="100%" stopColor="#ffa751" />
            </linearGradient>
          </defs>
          
          {/* Shield backdrop */}
          <path d="M 5 6 L 16 3 L 27 6 V 17 C 27 23, 21 27, 16 29 C 11 27, 5 23, 5 17 Z" fill="#14532d" fillOpacity="0.3" stroke="url(#bullGold)" strokeWidth="1.2" />

          {/* Highly stylized emerald green and gold premium bull horns & head */}
          <path d="M 6.5 11 C 7 7, 11 5, 14.5 7.5 C 12.5 8.5, 11 11, 11.5 13 C 12 11.5, 14 11.5, 16 11.5 C 18 11.5, 20 11.5, 20.5 13 C 21 11, 19.5 8.5, 17.5 7.5 C 21 5, 25 7, 25.5 11 C 26 14, 23.5 18, 16 23 C 8.5 18, 6 14, 6.5 11 Z" fill="#22c55e" />
          
          {/* Majestic gold crown plates on helmet nose ridge */}
          <path d="M 12 11.5 L 16 6.5 L 20 11.5 L 16 13.5 Z" fill="url(#bullGold)" />
          <path d="M 13.5 14.5 L 16 20.5 L 18.5 14.5 Z" fill="url(#bullGold)" />
          
          <circle cx="12.5" cy="12" r="1" fill="#ffe259" />
          <circle cx="19.5" cy="12" r="1" fill="#ffe259" />
        </svg>
      );
    case "omega network":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="omegaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          
          {/* Golden inner circular coin base with micro-rimming */}
          <circle cx="16" cy="16" r="14.5" fill="#09090b" stroke="url(#omegaGold)" strokeWidth="2.2" />
          
          {/* Authentic Omega insignia featuring the horizontal splits on left and right */}
          <g stroke="url(#omegaGold)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Top half semi-circular arch */}
            <path d="M 8.5 15 A 7.5 7.5 0 0 1 23.5 15" />
            {/* Bottom-left foot and rising curve */}
            <path d="M 7 21 H 11 A 5.5 5.5 0 0 1 9.2 17" />
            {/* Bottom-right foot and rising curve */}
            <path d="M 25 21 H 21 A 5.5 5.5 0 0 0 22.8 17" />
          </g>
        </svg>
      );
    case "ibt":
      return (
        <svg className="w-6 h-6 select-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ibtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6a018" />
              <stop offset="100%" stopColor="#e06c07" />
            </linearGradient>
          </defs>
          {/* Golden Hexagonal Plate base */}
          <polygon 
            points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" 
            fill="url(#ibtGrad)" 
          />
          
          {/* Dark Charcoal circuit branch tree mapping */}
          <path 
            d="M 16 25 V 17 M 16 19 L 11 15.5 M 16 17 L 21 13.5 M 11 15.5 V 10 M 21 13.5 V 11 M 16 14 V 8" 
            stroke="#1c1917" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          {/* Digital hardware circular tree nodes */}
          <circle cx="16" cy="8" r="1.8" fill="#1c1917" />
          <circle cx="11" cy="9.5" r="1.8" fill="#1c1917" />
          <circle cx="11" cy="15.5" r="1.8" fill="#1c1917" />
          <circle cx="21" cy="11.5" r="1.8" fill="#1c1917" />
          <circle cx="21" cy="16.5" r="1.8" fill="#1c1917" />
        </svg>
      );
    default:
      return (
        <Briefcase className={`w-5 h-5 ${colorClass}`} />
      );
  }
};

const COMPANY_COLORS: Record<
  string,
  {
    darkBorder: string;
    darkBorderHover: string;
    lightBorder: string;
    lightBorderHover: string;
    darkGlow: string;
    lightGlow: string;
    badgeText: string;
    badgeBg: string;
    badgeBorder: string;
    badgeTextLight: string;
    badgeBgLight: string;
    badgeBorderLight: string;
  }
> = {
  zugchain: {
    darkBorder: "rgba(203, 239, 58, 0.16)",
    darkBorderHover: "rgba(203, 239, 58, 0.45)",
    lightBorder: "rgba(131, 150, 28, 0.22)",
    lightBorderHover: "rgba(131, 150, 28, 0.65)",
    darkGlow: "rgba(203, 239, 58, 0.1)",
    lightGlow: "rgba(131, 150, 28, 0.08)",
    badgeText: "#cbef3a",
    badgeBg: "rgba(203, 239, 58, 0.11)",
    badgeBorder: "rgba(203, 239, 58, 0.22)",
    badgeTextLight: "#74870c",
    badgeBgLight: "rgba(131, 150, 28, 0.09)",
    badgeBorderLight: "rgba(131, 150, 28, 0.22)"
  },
  igse: {
    darkBorder: "rgba(255, 255, 255, 0.15)",
    darkBorderHover: "rgba(255, 255, 255, 0.45)",
    lightBorder: "rgba(82, 82, 91, 0.22)",
    lightBorderHover: "rgba(82, 82, 91, 0.65)",
    darkGlow: "rgba(255, 255, 255, 0.08)",
    lightGlow: "rgba(82, 82, 91, 0.06)",
    badgeText: "#e4e4e7",
    badgeBg: "rgba(255, 255, 255, 0.08)",
    badgeBorder: "rgba(255, 255, 255, 0.18)",
    badgeTextLight: "#3f3f46",
    badgeBgLight: "rgba(82, 82, 91, 0.09)",
    badgeBorderLight: "rgba(82, 82, 91, 0.22)"
  },
  renewlabs: {
    darkBorder: "rgba(20, 184, 166, 0.16)",
    darkBorderHover: "rgba(20, 184, 166, 0.46)",
    lightBorder: "rgba(15, 118, 110, 0.24)",
    lightBorderHover: "rgba(15, 118, 110, 0.65)",
    darkGlow: "rgba(20, 184, 166, 0.1)",
    lightGlow: "rgba(15, 118, 110, 0.08)",
    badgeText: "#14b8a6",
    badgeBg: "rgba(20, 184, 166, 0.11)",
    badgeBorder: "rgba(20, 184, 166, 0.22)",
    badgeTextLight: "#0f766e",
    badgeBgLight: "rgba(15, 118, 110, 0.09)",
    badgeBorderLight: "rgba(15, 118, 110, 0.22)"
  },
  "vica foundation": {
    darkBorder: "rgba(59, 130, 246, 0.16)",
    darkBorderHover: "rgba(59, 130, 246, 0.46)",
    lightBorder: "rgba(29, 78, 216, 0.24)",
    lightBorderHover: "rgba(29, 78, 216, 0.65)",
    darkGlow: "rgba(59, 130, 246, 0.1)",
    lightGlow: "rgba(29, 78, 216, 0.08)",
    badgeText: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.11)",
    badgeBorder: "rgba(59, 130, 246, 0.22)",
    badgeTextLight: "#1d4ed8",
    badgeBgLight: "rgba(29, 78, 216, 0.09)",
    badgeBorderLight: "rgba(29, 78, 216, 0.22)"
  },
  dynex: {
    darkBorder: "rgba(6, 182, 212, 0.16)",
    darkBorderHover: "rgba(6, 182, 212, 0.46)",
    lightBorder: "rgba(8, 145, 178, 0.24)",
    lightBorderHover: "rgba(8, 145, 178, 0.65)",
    darkGlow: "rgba(6, 182, 212, 0.1)",
    lightGlow: "rgba(8, 145, 178, 0.08)",
    badgeText: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.11)",
    badgeBorder: "rgba(6, 182, 212, 0.22)",
    badgeTextLight: "#0891b2",
    badgeBgLight: "rgba(8, 145, 178, 0.09)",
    badgeBorderLight: "rgba(8, 145, 178, 0.22)"
  },
  "bull run ai": {
    darkBorder: "rgba(34, 197, 94, 0.16)",
    darkBorderHover: "rgba(34, 197, 94, 0.46)",
    lightBorder: "rgba(21, 128, 61, 0.24)",
    lightBorderHover: "rgba(21, 128, 61, 0.65)",
    darkGlow: "rgba(34, 197, 94, 0.1)",
    lightGlow: "rgba(21, 128, 61, 0.08)",
    badgeText: "#22c55e",
    badgeBg: "rgba(34, 197, 94, 0.11)",
    badgeBorder: "rgba(34, 197, 94, 0.22)",
    badgeTextLight: "#15803d",
    badgeBgLight: "rgba(21, 128, 61, 0.09)",
    badgeBorderLight: "rgba(21, 128, 61, 0.22)"
  },
  "omega network": {
    darkBorder: "rgba(245, 158, 11, 0.16)",
    darkBorderHover: "rgba(245, 158, 11, 0.46)",
    lightBorder: "rgba(180, 83, 9, 0.24)",
    lightBorderHover: "rgba(180, 83, 9, 0.65)",
    darkGlow: "rgba(245, 158, 11, 0.1)",
    lightGlow: "rgba(180, 83, 9, 0.08)",
    badgeText: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.11)",
    badgeBorder: "rgba(245, 158, 11, 0.22)",
    badgeTextLight: "#b45309",
    badgeBgLight: "rgba(180, 83, 9, 0.09)",
    badgeBorderLight: "rgba(180, 83, 9, 0.22)"
  },
  ibt: {
    darkBorder: "rgba(246, 160, 24, 0.16)",
    darkBorderHover: "rgba(246, 160, 24, 0.46)",
    lightBorder: "rgba(194, 65, 12, 0.24)",
    lightBorderHover: "rgba(194, 65, 12, 0.65)",
    darkGlow: "rgba(246, 160, 24, 0.1)",
    lightGlow: "rgba(194, 65, 12, 0.08)",
    badgeText: "#f6a018",
    badgeBg: "rgba(246, 160, 24, 0.11)",
    badgeBorder: "rgba(246, 160, 24, 0.22)",
    badgeTextLight: "#c2410c",
    badgeBgLight: "rgba(194, 65, 12, 0.09)",
    badgeBorderLight: "rgba(194, 65, 12, 0.22)"
  }
};

export default function WorkExperience() {
  return (
    <section id="work-experience" className="w-full text-left scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-5 mb-8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">Proven On-Chain History</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-zinc-100 mt-1">
            Proven Industry Experience
          </h2>
        </div>
        <p className="text-zinc-500 text-xs md:text-sm font-sans max-w-md">
          A continuous timeline of high-impact technical executions, smart contract assemblies, and marketing campaigns across top guilds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXPERIENCES.map((exp, idx) => {
          const colors = COMPANY_COLORS[exp.company.toLowerCase()] || COMPANY_COLORS.zugchain;
          const cardStyle = {
            "--company-border-dark": colors.darkBorder,
            "--company-border-hover-dark": colors.darkBorderHover,
            "--company-border-light": colors.lightBorder,
            "--company-border-hover-light": colors.lightBorderHover,
            "--company-glow-dark": colors.darkGlow,
            "--company-glow-light": colors.lightGlow,
            "--company-badge-text-dark": colors.badgeText,
            "--company-badge-bg-dark": colors.badgeBg,
            "--company-badge-border-dark": colors.badgeBorder,
            "--company-badge-text-light": colors.badgeTextLight,
            "--company-badge-bg-light": colors.badgeBgLight,
            "--company-badge-border-light": colors.badgeBorderLight,
          } as React.CSSProperties;

          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 25 },
                opacity: { duration: 0.4, delay: idx * 0.05, ease: "easeOut" }
              }}
              whileHover={{ 
                y: -5 
              }}
              style={cardStyle}
              className="company-card p-5 rounded-2xl border relative overflow-hidden backdrop-blur-xl flex flex-col justify-between min-h-[250px] shadow-lg"
            >
              {/* Unique beautiful custom radial glow for top-right background of each status card */}
              <div className="company-card-glow absolute top-0 right-0 w-32 h-32 blur-xl rounded-full pointer-events-none opacity-80" />

              <div className="flex flex-col gap-3.5 relative z-10">
                {/* Header Company & Period */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="company-logo-container w-10 h-10 rounded-xl flex items-center justify-center border font-semibold select-none">
                      {getCompanyLogo(exp.company, exp.highlight)}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-sm text-zinc-100 font-sans tracking-tight">{exp.company}</h3>
                      <span className="text-[10px] font-mono text-zinc-400">{exp.role}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      exp.status === "ongoing"
                        ? "status-badge-active animate-pulse"
                        : "status-badge-completed"
                    }`}>
                      {exp.status === "ongoing" ? "Active" : "Completed"}
                    </span>
                  </div>
                </div>

                {/* Description body */}
                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[64px]">
                  {exp.description}
                </p>
              </div>

              {/* Bottom Meta & Skills list */}
              <div className="flex flex-col gap-2.5 border-t border-zinc-900/60 pt-3.5 mt-4 relative z-10">
                <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[9px]">
                  <Calendar className="company-calendar-icon w-3 h-3" />
                  <span className="font-medium">{exp.period}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[8px] font-mono bg-zinc-900/60 border border-zinc-850 text-zinc-400 px-1.5 py-0.5 rounded-md hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

