import React from "react";
import { ArrowRight, Mail, Compass, FileText, CheckCircle, Shield, Users, Brain, Paintbrush, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

interface HeroSectionProps {
  theme?: "dark" | "light";
  onNavigate: (section: string) => void;
}

export default function HeroSection({ theme = "dark", onNavigate }: HeroSectionProps) {
  return (
    <div className="w-full relative py-12 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Pitch Copy column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10">
          
          {/* Animated active badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="self-start flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-xs font-mono font-medium text-red-400"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Vetted Web3 Specialist • Available for Serious Partnerships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans leading-tight text-zinc-100"
          >
            Fahim Farouqe <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl lg:text-5xl block mt-2">
              Web3 Developer, Designer & Expert Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl font-sans"
          >
            I lead a vetted, high-octane engineering and creative agency. Together with my team of expert blockchain developers, graphic artists, and community liaisons, we deploy optimized Solidity architecture, code AI automation bots, deliver bespoke brand stickers, and host professional AMAs. We align pristine technical code with powerful organic growth vectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <button
              onClick={() => onNavigate("chat")}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-sm tracking-wide text-white transition-all shadow-md hover:shadow-red-500/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer group font-sans border-none outline-none focus:outline-none bg-clip-padding"
            >
              Consult AI twin <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/Curriculum_Vitae_Fahim_F.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 font-bold text-sm text-zinc-300 border border-zinc-800 hover:border-red-500/40 hover:text-red-400 transition-all flex items-center gap-2 cursor-pointer font-sans shadow-md"
            >
              <FileText className="w-4 h-4 text-red-500" /> View CV
            </a>
            <a
              href="mailto:fahimfarouqe424@gmail.com"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 font-bold text-sm text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer font-sans"
            >
              <Mail className="w-4 h-4 text-red-400" /> fahimfarouqe424@gmail.com
            </a>
          </motion.div>

          {/* Quick value indicators bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-900">
            <motion.div 
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/80 hover:bg-zinc-900/40 transition-colors duration-300 hover-glow-red cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-black font-sans text-zinc-100">
                <AnimatedCounter end={5} suffix="+ Years" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Industry Mastery</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/80 hover:bg-zinc-900/40 transition-colors duration-300 hover-glow-red cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-black font-sans text-zinc-100">
                <AnimatedCounter end={80} suffix="+ Hosted" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Community AMAs</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/80 hover:bg-zinc-900/40 transition-colors duration-300 hover-glow-red cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-black font-sans text-zinc-100">
                <AnimatedCounter end={100} suffix="%" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Audited Security</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/80 hover:bg-zinc-900/40 transition-colors duration-300 hover-glow-red cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-black font-sans text-zinc-100">
                <AnimatedCounter end={24} />/<AnimatedCounter end={7} />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Active Support</span>
            </motion.div>
          </div>

        </div>

        {/* Floating Custom Avatar Card col */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          
          <div className="absolute top-[20%] left-[10%] w-[120%] h-[60%] bg-red-950/20 blur-3xl rounded-full z-0 pointer-events-none" />

          {/* Clean Avatar Card Frame with elegant entering and hover scaling transitions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              delay: 0.1
            }}
            className="w-full max-w-[340px] glass-panel rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-5 shadow-2xl relative z-10 flex flex-col gap-4 overflow-hidden group hover:shadow-red-500/20 cursor-pointer transition-colors duration-500"
          >
            {/* Glossy overlay effect details */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

            {/* Avatar frame */}
            <div className="relative w-full aspect-[4/5] rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center transition-colors duration-500">
              
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Light PFP - Rendered absolutely to support crossfade transition */}
                <motion.img
                  src="/pfp_light.png"
                  alt="Fahim Farouqe (Light Mode)"
                  initial={{ opacity: theme === "light" ? 1 : 0 }}
                  animate={{ opacity: theme === "light" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                {/* Dark PFP - Rendered absolutely to support crossfade transition */}
                <motion.img
                  src="/pfp_dark.png"
                  alt="Fahim Farouqe (Dark Mode)"
                  initial={{ opacity: theme === "dark" ? 1 : 0 }}
                  animate={{ opacity: theme === "dark" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

            {/* Profile meta info */}
            <div className="flex flex-col gap-1 text-center transition-colors duration-500">
              <h4 className="font-extrabold text-lg text-zinc-100 font-sans tracking-tight transition-colors duration-500">Fahim Farouqe</h4>
              <p className="text-[10px] font-mono text-zinc-500 transition-colors duration-500">MEMBER SINCE 2021 | 0xFAHIM...8888</p>
            </div>

            {/* Mini core statements checklist */}
            <div className="flex flex-col gap-1.5 border-t border-zinc-900/60 pt-3 transition-colors duration-500">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 transition-colors duration-500">
                <Shield className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Transparent Deliveries</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 transition-colors duration-500">
                <Briefcase className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Verified Core Contributor</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
