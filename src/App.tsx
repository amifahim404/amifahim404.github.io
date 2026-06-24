import { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  Paintbrush, 
  Cpu, 
  Radio, 
  Terminal as TermIcon, 
  Sparkles, 
  Mail, 
  Briefcase, 
  Clock, 
  FileText,
  MousePointerClick,
  Send,
  Linkedin,
  X,
  MessageSquare,
  Sun,
  Moon,
  ArrowUp,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import BackgroundEffect from "./components/BackgroundEffect";
import HeroSection from "./components/HeroSection";
import ServiceHub from "./components/ServiceHub";
import SolidityTerminal from "./components/SolidityTerminal";
import StickerPlayground from "./components/StickerPlayground";
import AMAModeratorStage from "./components/AMAModeratorStage";
import AIChatBot from "./components/AIChatBot";
import CryptoPriceFeed from "./components/CryptoPriceFeed";
import BattlePlan from "./components/BattlePlan";
import ContactFormBox from "./components/ContactFormBox";
import WorkExperience from "./components/WorkExperience";
import ThemeAssetPreloader from "./components/ThemeAssetPreloader";
import CustomCursor from "./components/CustomCursor";

type ActiveTab = "services" | "contracts" | "stickers" | "ama";

export default function App() {
  const [activeTab, setActiveTab ] = useState<ActiveTab>("services");
  const [localTime, setLocalTime] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    
    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      root.classList.add("view-transition");
      try {
        const transition = (document as any).startViewTransition(() => {
          setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        });
        
        transition.finished.then(() => {
          root.classList.remove("view-transition");
        }).catch(() => {
          root.classList.remove("view-transition");
        });
      } catch (e) {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        root.classList.remove("view-transition");
      }
    } else {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScrollTop(window.scrollY > 300);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Track simulated local clocks
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      };
      setLocalTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSectionId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Smooth scroll offset recalculation requires layout shift settling
    setTimeout(() => {
      scrollToSectionId(sectionId);
    }, 280);
  };

  // Lock page scrolling when mobile navigation menu is expanded
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [isMobileMenuOpen]);

  const handleScrollToPlayground = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    scrollToSectionId("interactive-playground");
  };

  const handleScrollToConsult = () => {
    scrollToSectionId("consult-panel");
  };

  const openAIDrawer = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen w-full relative bg-zinc-950 font-sans text-zinc-100 overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Preload theme-specific image assets and compile key vector assets off-screen to prevent transition stutters */}
      <ThemeAssetPreloader />

      {/* Premium custom mouse trailing precision ring */}
      <CustomCursor theme={theme} />

      {/* Drifting nodes background effect */}
      <BackgroundEffect />

      {/* Grid overlay for cyberpunk premium texturing */}
      <div className="absolute inset-0 gradient-grid opacity-30 pointer-events-none z-0" />

      {/* Subtle top spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none z-20" />

      {/* Primary Header */}
      <header className={`sticky top-0 z-40 w-full border-b border-zinc-900/30 bg-zinc-950 transition-all duration-300 shadow-xl ${isMobileMenuOpen ? "rounded-b-2xl py-5" : "py-4 bg-zinc-950/95 backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-red-500/15 bg-zinc-900 flex items-center justify-center overflow-hidden select-none shadow-md shadow-red-950/20">
              <img 
                src="/iconist.png" 
                alt="Fahim Farouqe Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-extrabold tracking-widest text-xs md:text-sm uppercase text-zinc-100">FAHIM FAROUQE</span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">WEB3 PORTFOLIO v3.5</span>
            </div>
          </div>

          {/* Desktop Responsive Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-[10px] uppercase font-mono tracking-widest">
            <button 
              onClick={() => scrollToSectionId("market-feed")} 
              className="group transition-all duration-300 cursor-pointer outline-none font-semibold text-zinc-400 hover:text-zinc-100 flex flex-col items-center gap-1 relative py-1.5"
            >
              <span>Market</span>
              <span className="h-[2px] bg-red-500 rounded-full transition-all duration-300 w-0 group-hover:w-4" />
            </button>
            <button 
              onClick={() => scrollToSectionId("interactive-playground")} 
              className="group transition-all duration-300 cursor-pointer outline-none font-semibold text-zinc-400 hover:text-zinc-100 flex flex-col items-center gap-1 relative py-1.5"
            >
              <span>Playgrounds</span>
              <span className="h-[2px] bg-red-500 rounded-full transition-all duration-300 w-0 group-hover:w-4" />
            </button>
            <button 
              onClick={() => scrollToSectionId("work-experience")} 
              className="group transition-all duration-300 cursor-pointer outline-none font-semibold text-zinc-400 hover:text-zinc-100 flex flex-col items-center gap-1 relative py-1.5"
            >
              <span>Experience</span>
              <span className="h-[2px] bg-red-500 rounded-full transition-all duration-300 w-0 group-hover:w-4" />
            </button>
            <button 
              onClick={() => scrollToSectionId("deployment-plan")} 
              className="group transition-all duration-300 cursor-pointer outline-none font-semibold text-zinc-400 hover:text-zinc-100 flex flex-col items-center gap-1 relative py-1.5"
            >
              <span>Blueprint</span>
              <span className="h-[2px] bg-red-500 rounded-full transition-all duration-300 w-0 group-hover:w-4" />
            </button>
            <button 
              onClick={() => scrollToSectionId("consult-panel")} 
              className="group transition-all duration-300 cursor-pointer outline-none font-semibold text-zinc-400 hover:text-zinc-100 flex flex-col items-center gap-1 relative py-1.5"
            >
              <span>Intake</span>
              <span className="h-[2px] bg-red-500 rounded-full transition-all duration-300 w-0 group-hover:w-4" />
            </button>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs">
            {/* Clock Widget */}
            <div className="hidden lg:flex items-center gap-2 text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-3.5 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>GMT UTC-7: {localTime}</span>
            </div>

            {/* Dynamic Theme Toggle controller */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer select-none shrink-0"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <button 
              onClick={handleScrollToConsult}
              className="hidden sm:flex px-4 py-2 bg-zinc-800 hover:bg-zinc-750 hover:text-white text-zinc-300 border border-zinc-700 hover:border-zinc-600 font-sans font-medium rounded-full text-xs transition cursor-pointer"
            >
              Intake Hub
            </button>
            
            {/* CTA */}
            <button 
              onClick={openAIDrawer}
              className="hidden xs:flex bg-red-955/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-500/40 hover:border-red-500 px-4 py-2 rounded-full transition-all items-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/20 font-sans font-semibold tracking-wide text-xs animate-pulse animate-duration-1000"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Instant AI Twin</span>
            </button>

            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden w-9 h-9 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer select-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Smooth Mobile Menu slide-down */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative w-full md:hidden overflow-hidden z-50 mt-4 bg-transparent no-scrollbar"
            >
              <div className="px-4 pb-2 flex flex-col gap-1 font-mono text-xs uppercase tracking-widest text-left">
                <button
                  onClick={() => handleMobileNavClick("market-feed")}
                  className="py-3 px-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:translate-x-1.5 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="font-mono text-[11px] tracking-wider">1.0 / Live Market</span>
                  <Compass className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleMobileNavClick("interactive-playground")}
                  className="py-3 px-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:translate-x-1.5 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="font-mono text-[11px] tracking-wider">2.0 / Playgrounds</span>
                  <TermIcon className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleMobileNavClick("work-experience")}
                  className="py-3 px-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:translate-x-1.5 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="font-mono text-[11px] tracking-wider">3.0 / Experience</span>
                  <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleMobileNavClick("deployment-plan")}
                  className="py-3 px-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:translate-x-1.5 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="font-mono text-[11px] tracking-wider">4.0 / Blueprint</span>
                  <Cpu className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleMobileNavClick("consult-panel")}
                  className="py-3 px-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:translate-x-1.5 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="font-mono text-[11px] tracking-wider">5.0 / Secure Intake</span>
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>

                <div className="flex gap-3 px-4 pt-4 pb-2">
                  <button
                    onClick={() => {
                      handleMobileNavClick("consult-panel");
                    }}
                    className="flex-1 py-3 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-sans font-semibold text-xs transition duration-200 cursor-pointer active:scale-95 text-center"
                  >
                    Intake Hub
                  </button>
                  <button
                    onClick={() => {
                      openAIDrawer();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-3 px-4 rounded-full bg-red-600 hover:bg-red-750 text-white text-center font-sans font-bold text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                    Instant AI Twin
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-20 flex flex-col gap-24">
        
        {/* Hero Banner Section */}
        <HeroSection theme={theme} onNavigate={(section) => {
          if (section === "chat") {
            openAIDrawer();
          } else {
            handleScrollToPlayground(section as ActiveTab);
          }
        }} />

        {/* Live On-chain Sovereign tickers tracker */}
        <motion.div
          id="market-feed"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <CryptoPriceFeed />
        </motion.div>

        {/* Interactive Playgrounds and Demos Container */}
        <motion.section 
          id="interactive-playground" 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-8 scroll-mt-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">Dynamic Demo Hub</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-zinc-100 mt-1">
                Explore Fahim Farouqe's Work Playgrounds
              </h2>
            </div>

            {/* Glowing Selection Tabs Overlay */}
            <div className="flex items-center flex-nowrap overflow-x-auto no-scrollbar gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800/40 max-w-full">
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-2 text-xs font-mono rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  activeTab === "services"
                    ? "bg-red-950 border border-red-500/30 text-red-300"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Services Hub
              </button>
              <button
                onClick={() => setActiveTab("contracts")}
                className={`px-4 py-2 text-xs font-mono rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  activeTab === "contracts"
                    ? "bg-red-950 border border-red-500/30 text-red-300"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <TermIcon className="w-3.5 h-3.5" />
                Solidity EVM
              </button>
              <button
                onClick={() => setActiveTab("stickers")}
                className={`px-4 py-2 text-xs font-mono rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  activeTab === "stickers"
                    ? "bg-red-950 border border-red-500/30 text-red-300"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Paintbrush className="w-3.5 h-3.5" />
                Sticker Lab Max
              </button>
              <button
                onClick={() => setActiveTab("ama")}
                className={`px-4 py-2 text-xs font-mono rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  activeTab === "ama"
                    ? "bg-red-950 border border-red-500/30 text-red-300"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                AMA Broadcasts
              </button>
            </div>
          </div>

          {/* Tab Render panel */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === "services" && <ServiceHub />}
                {activeTab === "contracts" && <SolidityTerminal />}
                {activeTab === "stickers" && <StickerPlayground />}
                {activeTab === "ama" && <AMAModeratorStage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Verified On-Chain Work History Grid */}
        <motion.div
          id="work-experience"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <WorkExperience />
        </motion.div>

        {/* Step-by-Step Delivery Action Blueprint */}
        <motion.div
          id="deployment-plan"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <BattlePlan />
        </motion.div>

        {/* Interactive Secure Contact and Intake social grid */}
        <motion.div
          id="consult-panel"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <ContactFormBox />
        </motion.div>

        {/* Commitment Banner / Values Statement */}
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel rounded-3xl p-8 md:p-12 bg-zinc-950/90 border border-zinc-800/5 relative overflow-hidden text-left flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl"
        >
          <div className="absolute inset-0 radial-crimson-spotlight pointer-events-none z-0" />
          
          <div className="flex-1 flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-2 text-red-500 text-xs font-mono font-bold uppercase tracking-widest">
              <Briefcase className="w-4 h-4 animate-pulse" />
              Core Partnership Foundation
            </div>
            <h3 className="text-2xl md:text-3xl font-black font-sans text-zinc-100 tracking-tight leading-snug">
              Result-Driven Web3 Solutions, <br />
              Anchored In Direct Professionalism.
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xl font-sans">
              Fahim Farouqe collaborates with global teams alongside his highly specialized engineering and creative unit. Delivering top-tier solutions with vertical trust, clear consistency, and long-term joint value within the Web3 ecosystem.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto relative z-10">
            <button 
              onClick={handleScrollToConsult}
              className="px-6 py-4 rounded-xl bg-red-600 hover:bg-red-500 hover:shadow-red-900/10 text-white font-bold text-center text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans border-none outline-none focus:outline-none bg-clip-padding"
            >
              Start Collaboration <Mail className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono text-zinc-500 text-center uppercase">
              REPLY VOW TIME: UNDER 4 HOURS
            </span>
          </div>
        </motion.section>

      </main>

      {/* Global Footer */}
      <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-12 relative z-10 font-mono text-[11px] text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
            <span className="text-zinc-400 font-extrabold tracking-widest uppercase font-sans">FAHIM FAROUQE // WEB3 CONTROLLER</span>
            <span>© {new Date().getFullYear()} All Rights Deserved. Vetted Professional Delivery.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:fahimfarouqe424@gmail.com" className="hover:text-red-500 transition-colors">
              EMAIL
            </a>
            <span className="text-zinc-800">|</span>
            <span className="hover:text-white transition-opacity select-none uppercase">
              CLIENT TRUSTED
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive back-to-top up-button displaying on scroll */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800/80 hover:border-red-500/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer shadow-2xl backdrop-blur-md focus:outline-none focus:ring-0 group hover-glow-red scroll-top-btn"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cybernetic Right Slide-out Drawer Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />

            {/* Slide-out Terminal Drawer */}
            <motion.div
              id="neural-cyber-chat-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg md:max-w-xl h-full bg-zinc-950 border-l border-zinc-900 z-50 flex flex-col shadow-2xl p-6 overflow-hidden selection:bg-red-600 select-text"
            >
              {/* Drawer Premium Command Header */}
              <div id="drawer-header" className="flex flex-col items-center justify-center border-b border-zinc-900 pb-5 mb-4 shrink-0 text-center relative pt-1">
                <button
                  id="drawer-close-btn"
                  onClick={() => setIsChatOpen(false)}
                  className="absolute right-0 top-1 p-1.5 rounded-lg border border-zinc-800 hover:border-red-500 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-red-950/20 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-950 to-red-950 border border-red-500/40 flex items-center justify-center font-bold text-base text-red-500 font-mono mb-2 shrink-0 shadow-lg shadow-red-950/20">
                  🤖
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <h4 className="font-extrabold text-sm md:text-base text-zinc-100 font-sans flex items-center justify-center gap-2">
                    TwinFahim-v3.5 <span className="bg-red-950 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[8px] font-mono font-bold animate-pulse">ACTIVE</span>
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1">Holographic Custom Neural Simulation</p>
                </div>
              </div>

              {/* Mounted Twin Chat Application with expanded custom parameters and live bindings */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <AIChatBot />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
