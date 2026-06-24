import React, { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Smartphone,
  Cpu,
  Mail,
  User,
  Info,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Toast from "./Toast";

interface SocialItem {
  name: string;
  url: string;
  handle: string;
  platform: string;
  color: string;
  iconBg: string;
}

const PROJECT_TYPES = [
  "Smart Contracts & Security Audit",
  "Community AMA Hosting & Moderator Stages",
  "Telegram Bot Optimization & Nodes",
  "Stickers & Professional Brand Styling",
  "Full Stack Web3 Applet Suite"
];

const SOCIAL_SERVICES: SocialItem[] = [
  {
    name: "Telegram Portal",
    url: "https://t.me/FAHIM888",
    handle: "@FAHIM888",
    platform: "tg",
    color: "text-sky-400 border-sky-500/10 hover:border-sky-500/40 hover:bg-sky-950/10",
    iconBg: "bg-sky-950/40 text-sky-400"
  },
  {
    name: "Discord Direct",
    url: "https://discord.com/users/fahim4978",
    handle: "fahim4978",
    platform: "discord",
    color: "text-indigo-400 border-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-950/10",
    iconBg: "bg-indigo-950/40 text-indigo-400"
  },
  {
    name: "Twitter / X Profile",
    url: "https://x.com/Fahim_farouqe?s=20",
    handle: "@Fahim_farouqe",
    platform: "twitter",
    color: "text-zinc-300 border-zinc-500/10 hover:border-zinc-500/40 hover:bg-zinc-900/10",
    iconBg: "bg-zinc-900/40 text-zinc-300"
  },
  {
    name: "GitHub Profile",
    url: "https://github.com/amifahim404",
    handle: "amifahim404",
    platform: "github",
    color: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-900/10",
    iconBg: "bg-emerald-900/40 text-emerald-400"
  }
];

export default function ContactFormBox() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [projectType, setProjectType] = useState("Smart Contracts & Security Audit");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [budgetVal, setBudgetVal] = useState(5000);
  const [timeline, setTimeline] = useState("Immediate");
  const [userMessage, setUserMessage] = useState("");
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("fahimfarouqe424@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+8801948186265");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WEB3SPECIAL") {
      setPromoApplied(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName || !userMessage) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xvzjolvn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          projectType: projectType,
          timeline: timeline,
          estimatedBudget: budgetVal === 15000 ? "$15,000+ Unlimited" : `$${budgetVal.toLocaleString()} USD`,
          message: userMessage,
          promoCode: promoCode || "None",
          promoApplied: promoApplied ? "Yes" : "No"
        })
      });

      if (response.ok) {
        setStatus("success");
        setShowToast(true);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Formspree submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 text-left relative z-10 scroll-mt-24" id="consult-panel">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">Consolidated Intake Center</span>
        <h3 className="text-2xl md:text-3xl font-black font-sans text-zinc-100 mt-1 tracking-tight">
          Initiate High-Velocity Collaboration
        </h3>
        <p className="text-sm text-zinc-400 mt-1.5 font-sans">
          Lock in your smart contract, interactive artwork, sticker design suite, or Telegram bot parameters directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Intake (6 columns for equal balance) */}
        <div className="lg:col-span-6 bg-zinc-950/90 border border-zinc-850 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-red-500/[0.01]" />
          
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 select-none">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-zinc-100 font-sans mt-2">Intake Transmission Saved!</h4>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-sans">
                  The client packet was synchronized with Fahim’s prioritizer. A verified technical reply will generate in your inbox at <b>{userEmail}</b> inside of 4 hours. Thank you!
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setUserName("");
                    setUserEmail("");
                    setUserMessage("");
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono hover:text-white transition-colors cursor-pointer"
                >
                  TRANSMIT ADDITIONAL BRIEF
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="intake-form"
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-5 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-zinc-500" /> Client Title / Contact Name
                    </label>
                    <input
                      required
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Alice / CEO ZenithDAO"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" /> Secure Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g. alice@domain.com"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Selected service line */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Required Scope Line
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-700 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-zinc-100 outline-none transition-all font-mono flex items-center justify-between cursor-pointer"
                    >
                      <span>{projectType}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40 cursor-default" 
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-zinc-950/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl p-1.5 flex flex-col gap-1"
                          >
                            {PROJECT_TYPES.map((type) => {
                              const isSelected = projectType === type;
                              return (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setProjectType(type);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? "bg-red-950 text-red-300 font-bold border border-red-500/20"
                                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
                                  }`}
                                >
                                  <span>{type}</span>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-md shadow-red-500/50" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Delivery Speed timeline */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Delivery Timelines
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-850">
                      {["Immediate", "<1 Month", "Flexible"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`py-2 text-[9px] font-mono uppercase rounded-lg transition-all ${
                            timeline === t
                              ? "bg-red-950 text-red-300 border border-red-500/20 font-bold"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estimate Budget Slider with custom reactive UI */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/10 border border-zinc-900/80">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-400 uppercase">Estimated Budget Limit</span>
                    <span className="text-red-400 font-bold font-mono">
                      {budgetVal === 15000 ? "$15,000+ Unlimited" : `$${budgetVal.toLocaleString()} USD`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="500"
                    value={budgetVal}
                    onChange={(e) => setBudgetVal(parseInt(e.target.value))}
                    className="accent-red-500 h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer border border-zinc-800"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                    <span>$500</span>
                    <span>$5,000 (Average)</span>
                    <span>$15,000+ Unlimited</span>
                  </div>
                </div>

                {/* Scope specifics Text Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Detailed Specification / Core Ideas
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Brief outline of architecture requirements, token chains, design asset descriptions, etc..."
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all font-sans leading-relaxed resize-none"
                  />
                </div>

                {/* Formspree status indicators / Error prompts */}
                {status === "error" && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-[10px] font-mono text-red-400 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>Failed verification. Please populate all required fields prior to dispatch.</span>
                  </div>
                )}

                {/* Interactive Promo Discount container */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-900/20 border border-zinc-850 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase select-none shrink-0 pl-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> PROMO?
                  </div>
                  
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter Code (e.g. WEB3SPECIAL)"
                      className="bg-zinc-950/40 border border-zinc-850 rounded-lg px-2.5 py-1.5 outline-none text-[10px] text-zinc-300 placeholder-zinc-700 font-mono flex-1 min-w-0 focus:border-red-500/30"
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-mono text-zinc-300 rounded-lg border border-zinc-700 transition cursor-pointer shrink-0"
                    >
                      APPLY
                    </button>
                  </div>

                  {promoApplied && (
                    <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/20 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0 text-center uppercase tracking-wide animate-pulse sm:ml-auto">
                      10% DISCOUNT APPLIED
                    </span>
                  )}
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4.5 rounded-xl bg-red-600 hover:bg-red-500 font-sans font-bold text-sm tracking-wide text-white transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-900 disabled:border-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed border border-red-500/20"
                >
                  {status === "submitting" ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-red-400" />
                      <span>SECURE DECLASSIFIED INTAKE SYNCHRONIZING...</span>
                    </>
                  ) : (
                    <>
                      <span>SECURE TRANSMIT BRIEF TO FAHIM</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Credentials & Socials Cards (6 columns for equal balance) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Email & Phone Card with direct clipboard logic */}
          <div className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-850/80 relative overflow-hidden flex flex-col gap-5 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10 text-left">
              <span className="text-[9px] font-mono tracking-widest text-red-500 font-bold uppercase">DIRECT SECURE INTAKE</span>
              <h4 className="text-xl font-bold font-sans text-zinc-100 mt-1">Direct Secure Contacts</h4>
              <p className="text-zinc-400 text-xs mt-1.5 font-sans leading-relaxed">
                Reach out immediately for serious Web3 inquiries, contract audits, community stage hosts, and custom developments.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 relative z-10">
              {/* Email channel */}
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">SECURE ENCRYPTED EMAIL:</span>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl justify-between group relative">
                  <span className="text-[10px] sm:text-xs font-semibold font-mono text-zinc-300 break-all select-all flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    fahimfarouqe424@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 bg-zinc-950 hover:bg-red-950/30 border border-zinc-800 hover:border-red-500/30 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer relative"
                  >
                    {copiedEmail ? <span className="absolute -top-7 right-0 text-[8px] font-mono font-bold text-red-400 bg-zinc-950 border border-red-500/20 px-1 py-0.5 rounded shadow">COPIED</span> : null}
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Phone channel */}
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">ENCRYPTED TELEPHONY / WHATSAPP:</span>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl justify-between group relative">
                  <span className="text-[10px] sm:text-xs font-semibold font-mono text-zinc-300 select-all flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-red-500" />
                    +8801948186265
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 bg-zinc-950 hover:bg-red-950/30 border border-zinc-800 hover:border-red-500/30 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer relative"
                  >
                    {copiedPhone ? <span className="absolute -top-7 right-0 text-[8px] font-mono font-bold text-red-400 bg-zinc-950 border border-red-500/20 px-1 py-0.5 rounded shadow">COPIED</span> : null}
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Web3 Grid Networks */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Sovereign Social Networks:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_SERVICES.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-xl border bg-zinc-950/90 backdrop-blur-xl transition-all flex items-center justify-between group cursor-pointer ${social.color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${social.iconBg}`}>
                      {social.platform === "tg" && (
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.578.192l-8.533 7.701-.332 4.966c.487 0 .702-.223.974-.485l2.337-2.27 4.861 3.59c.895.493 1.539.239 1.761-.826l3.19-15.023c.326-1.306-.5-1.902-1.358-1.514z" />
                        </svg>
                      )}
                      {social.platform === "discord" && (
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                        </svg>
                      )}
                      {social.platform === "twitter" && (
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {social.platform === "github" && (
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-[10px] text-zinc-100 font-sans">{social.name}</span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{social.handle}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Secure Client Guarantees Badge */}
          <div className="p-4 rounded-xl border border-dashed border-red-500/20 bg-red-950/30 backdrop-blur-xl flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">Vetted Security Guarantee</span>
              <p className="text-[10px] font-sans text-zinc-400 leading-normal mt-0.5">
                Every smart contract line compiled or bot configured complies with strict multi-sig and reentrancy audits, preventing exploits out-of-the-box.
              </p>
            </div>
          </div>

        </div>

      </div>

      <Toast 
        message="Brief Transmitted Successfully!" 
        subMessage="Secure handshake made. Delivery confirmed with Fahim's priorities." 
        isOpen={showToast} 
        onClose={() => setShowToast(false)} 
        type="success"
        duration={5000}
      />

    </div>
  );
}
