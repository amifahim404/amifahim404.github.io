import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, AlertCircle, RefreshCw, Smartphone, HelpCircle, Sliders, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

const SUGGESTED_QUESTIONS = [
  "What is Fahim Farouqe's availability?",
  "What blockchain solutions does he offer?",
  "Review Telegram bot designs & stickers",
  "How to hire him for an AMA Session?"
];

export default function AIChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "assistant",
      text: "Welcome! I am Fahim's AI Twin representing Fahim Farouqe and our specialized team. I'm ready to answer any questions about our 5+ years of Web3 blockchain dev, graphics styling, sticker designs, and community AMA pipelines. Ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSliders, setShowSliders] = useState(false);

  // Advanced AI Overclock Parameters
  const [personaType, setPersonaType] = useState<"professional" | "balanced" | "meme">("balanced");
  const [techDepth, setTechDepth] = useState<"executive" | "dev">("dev");
  const [overclock, setOverclock] = useState(85);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage("");
    setInputVal("");

    const userMsgId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({ role: m.sender, parts: [{ text: m.text }] })),
          personaType,
          techDepth,
          overclock
        })
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();
      
      if (data.systemFlag === "demo") {
        setIsDemoMode(true);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);

    } catch (err: any) {
      console.error("Chat error:", err);
      // Fallback response with custom persona overrides
      let fallbackText = "";
      if (personaType === "meme") {
        fallbackText = "BULLISH on your ideas! But my neural network is on standby inside the developer sandbox. Ping Fahim directly via fahimfarouqe424@gmail.com. TO THE MOON! 🚀";
      } else if (techDepth === "dev") {
        fallbackText = "Analyzing stack... Sandbox compilation is offline. Let's schedule a high-fidelity line-by-line Solidity optimization review at fahimfarouqe424@gmail.com! 💻";
      } else {
        fallbackText = "Thank you for reaching out. While my neural twin operates inside the sandbox environment, I highly welcome your email inquiries. Please drop a note to fahimfarouqe424@gmail.com to establish a productive collaboration.";
      }
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetText: string) => {
    handleSendMessage(presetText);
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-4 text-left min-h-0 overflow-hidden">
      
      {/* Parameters Header / Sliders Accordion */}
      <div className="glass-panel rounded-xl bg-zinc-950/90 border border-zinc-900/80 overflow-hidden shrink-0">
        <button
          onClick={() => setShowSliders(!showSliders)}
          className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-850/80 transition-colors focus:outline-none focus:ring-0 text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Configure Twin Parameters</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-normal normal-case">
            <span>Style: {personaType} • Sim: {overclock}%</span>
            {showSliders ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
          </div>
        </button>

        <AnimatePresence>
          {showSliders && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-4 border-t border-zinc-900/60 bg-zinc-950 flex flex-col gap-4 overflow-hidden"
            >
              {/* Persona Selector */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">Twin Style Modulate</span>
                  <span className="text-red-400 font-bold uppercase">{personaType}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-850/60">
                  {(["professional", "balanced", "meme"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setPersonaType(style)}
                      className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                        personaType === style
                          ? "bg-red-950 text-red-300 border border-red-500/10 font-bold"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explainer depth */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">Explainer Verbosity</span>
                  <span className="text-red-400 font-bold uppercase">
                    {techDepth === "executive" ? "Executive View" : "Dev Audit Mode"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-850/60">
                  {(["executive", "dev"] as const).map((depth) => (
                    <button
                      key={depth}
                      onClick={() => setTechDepth(depth)}
                      className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                         techDepth === depth
                          ? "bg-red-950 text-red-300 border border-red-500/10 font-bold"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {depth === "executive" ? "Executive" : "Dev-Audit"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulator overclock */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">EVM Simulator Overclock</span>
                  <span className="text-red-400 font-bold font-mono">{overclock} GigaCycles</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={overclock}
                  onChange={(e) => setOverclock(parseInt(e.target.value))}
                  className="accent-red-500 h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer border border-zinc-800"
                />
                <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                  <span>Eco Saver</span>
                  <span>Overdrive</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recommended Presets Carousel */}
      <div className="flex flex-col gap-1 shrink-0">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Suggested Inquiries:</span>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth snap-x">
          {SUGGESTED_QUESTIONS.map((question, qIdx) => (
            <button
              key={qIdx}
              onClick={() => handlePresetClick(question)}
              disabled={isLoading}
              className="px-3 py-1.5 snap-start bg-zinc-900/40 hover:bg-red-950/20 border border-zinc-850 hover:border-red-500/35 rounded-full text-[10px] text-zinc-300 hover:text-white transition-all shrink-0 whitespace-nowrap focus:outline-none flex items-center gap-1 group font-sans backdrop-blur-sm shadow-sm cursor-pointer"
            >
              <span className="group-hover:text-red-400">{question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cybernetic Chat Frame */}
      <div className="flex-1 min-h-0 flex flex-col glass-panel rounded-2xl bg-zinc-950/90 border border-zinc-900 overflow-hidden">
        
        {/* Messages Feed View */}
        <div id="neural-chat-message-container" className="flex-1 p-4 overflow-y-auto bg-zinc-950/20 flex flex-col gap-3 scrollbar-thin">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[90%] flex flex-col text-left ${m.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  m.sender === "user"
                    ? "bg-red-950/80 text-red-100 border border-red-800/40 rounded-br-none shadow-md shadow-red-950/10"
                    : "bg-zinc-900/80 text-zinc-300 border border-zinc-850/60 rounded-bl-none shadow-md"
                }`}>
                  {m.text}
                </div>
                <span className="text-[8px] font-mono text-zinc-600 mt-1 uppercase pl-1.5 pr-1.5">
                  {m.sender === "user" ? "Client Query" : "TwinFahim.ai"} • {m.timestamp}
                </span>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="self-start flex flex-col items-start max-w-[90%]"
              >
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850/40 rounded-bl-none flex items-center gap-2 text-xs text-zinc-500 font-sans">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-500" />
                  Twin formulating quantum response...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-zinc-900 p-3 border-t border-zinc-900">
          <div className="flex gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-850 items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              disabled={isLoading}
              className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-xs text-zinc-300 flex-1 px-3 py-1 font-sans"
              placeholder="Ask anything (availability, budget, stack)..."
            />
            <button
              onClick={() => handleSendMessage(inputVal)}
              disabled={isLoading || !inputVal.trim()}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                inputVal.trim() && !isLoading
                  ? "bg-red-600 border-red-600 text-white hover:bg-red-500"
                  : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {isDemoMode && (
        <div className="flex gap-2 text-[9px] text-zinc-500 leading-normal bg-zinc-900/30 p-2.5 rounded-xl border border-zinc-900 mt-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Simulated response. Add GEMINI_API_KEY inside Settings secrets for real-time live learning feedback.</span>
        </div>
      )}

    </div>
  );
}
