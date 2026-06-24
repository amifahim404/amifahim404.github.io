import { useState } from "react";
import { Send, Smile, Info, Sparkles, Download, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const STICKER_PACKS = [
  {
    id: "pepe-web3",
    name: "Web3 Pepe Elite Sticker Set",
    description: "Custom hand-drawn vector Pepe stickers tailored for Telegram high-sentiment communities.",
    downloads: "24.5k",
    vibe: "Crypto Meme & Sarcastic",
    stickers: [
      { emoji: "🐸", text: "WAGMI", bg: "from-emerald-950 to-green-900 border-green-500", textCol: "text-green-300" },
      { emoji: "💎", text: "HODL", bg: "from-cyan-950 to-slate-900 border-cyan-500", textCol: "text-cyan-300" },
      { emoji: "🚀", text: "TO THE MOON", bg: "from-zinc-950 to-red-950 border-red-500", textCol: "text-red-300" },
      { emoji: "💀", text: "REKT", bg: "from-stone-900 to-red-950 border-zinc-500", textCol: "text-stone-300" },
    ]
  },
  {
    id: "glowing-neon",
    name: "Neon Glow Vector Stickers",
    description: "Futuristic vector graphics featuring dark, glossy high-contrast outlines for premium brand AMA headers.",
    downloads: "12.8k",
    vibe: "Elite Tech Cyberpunk",
    stickers: [
      { emoji: "😮", text: "SERIOUS?", bg: "from-purple-950 to-rose-950 border-purple-500", textCol: "text-purple-300" },
      { emoji: "🔥", text: "BULLISH", bg: "from-amber-950 to-orange-950 border-orange-500", textCol: "text-orange-300" },
      { emoji: "🤝", text: "PARTNERED", bg: "from-teal-950 to-slate-900 border-teal-500", textCol: "text-teal-300" },
      { emoji: "📊", text: "GREEN CANDLE", bg: "from-green-950 to-black border-lime-500", textCol: "text-lime-300" },
    ]
  }
];

export default function StickerPlayground() {
  const [selectedPackIdx, setSelectedPackIdx] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; sender: 'me' | 'fahim'; text?: string; stickerEmoji?: string; stickerText?: string; stickerStyle?: string }>>([
    { id: 1, sender: 'fahim', text: "Hey! Tap on any sticker below to see how my hand-crafted vector assets render inside a real Telegram frame! 😮" },
  ]);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);

  const currentPack = STICKER_PACKS[selectedPackIdx];

  const handleSendTextMessage = () => {
    if (!typedMessage.trim()) return;
    const msgId = chatMessages.length + 1;
    const selfMsg = { id: msgId, sender: 'me' as const, text: typedMessage };
    setChatMessages((prev) => [...prev, selfMsg]);
    setTypedMessage("");

    // Fahim's smart response
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        id: prev.length + 1,
        sender: 'fahim',
        text: "I custom-draw these as vectors so they look crisp regardless of the Telegram desktop pixel-ratio. Perfect for pinning announcements! Let me know if your coin project needs a signature mascot. 🤝"
      }]);
    }, 1000);
  };

  const handleStickerTap = (sticker: { emoji: string; text: string; bg: string; textCol: string }) => {
    // Add sticker message to chat
    const msgId = chatMessages.length + 1;
    setChatMessages((prev) => [...prev, {
      id: msgId,
      sender: 'me',
      stickerEmoji: sticker.emoji,
      stickerText: sticker.text,
      stickerStyle: `${sticker.bg} ${sticker.textCol}`
    }]);

    // Spawn floating emoji blast around the chat viewport
    const newFloating: FloatingEmoji[] = Array.from({ length: 12 }).map((_, i) => ({
      id: emojiCounter + i,
      emoji: sticker.emoji,
      x: 30 + Math.random() * 40, // percentage x
      y: 40 + Math.random() * 40, // percentage y
      rotate: (Math.random() - 0.5) * 80,
      scale: 0.5 + Math.random() * 1.2
    }));
    setEmojiCounter((prev) => prev + 12);
    setFloatingEmojis((prev) => [...prev, ...newFloating]);

    // Cleanup particles
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => !newFloating.some((nf) => nf.id === item.id)));
    }, 1600);

    // Auto-reply
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        id: prev.length + 1,
        sender: 'fahim',
        text: `Bullish choice! The "${sticker.text}" sticker is a fan favorite in high-hype communities. 🚀`
      }]);
    }, 1200);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Floating particles viewport */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {floatingEmojis.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 1, scale: 0.1, y: 100, x: `${e.x}%` }}
              animate={{ 
                opacity: [1, 1, 0], 
                scale: e.scale, 
                y: -150 - Math.random() * 200, 
                x: `${e.x + (Math.random() - 0.5) * 20}%`,
                rotate: e.rotate 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute text-5xl select-none"
              style={{ bottom: "20%" }}
            >
              {e.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Picker & Details Panel */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/60 hover-glow-red">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 mb-4">
            <Layers className="text-red-500 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg tracking-tight font-sans">Branding Sticker Sets</h3>
          </div>

          <div className="flex flex-col gap-3">
            {STICKER_PACKS.map((pack, idx) => (
              <button
                key={pack.id}
                onClick={() => setSelectedPackIdx(idx)}
                className={`p-4 rounded-xl text-left border transition-all hover-glow-red ${
                  selectedPackIdx === idx
                    ? "bg-red-950/40 border-red-500/40"
                    : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm text-zinc-200">{pack.name}</span>
                  <span className="text-[10px] font-mono bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                    {pack.downloads} DLs
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{pack.description}</p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Audience Vibe: {pack.vibe}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3 text-xs text-zinc-500 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60">
            <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>
              Telegram stickers and custom emojis act as the branding fuel for token projects. High-sentiment custom packs speed up viral marketing and build organic brand loyalty!
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Column */}
      <div className="lg:col-span-8 flex flex-col glass-panel rounded-3xl bg-zinc-950/80 border border-zinc-800/60 overflow-hidden h-[540px] hover-glow-red">
        {/* Mock Telegram Header */}
        <div className="bg-zinc-900/20 px-5 py-4 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-rose-950 flex items-center justify-center font-bold text-sm text-white border border-red-500/30">
                FM
              </span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-200 tracking-tight flex items-center gap-1.5">
                Fahim <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
              </h4>
              <span className="text-[10px] text-zinc-500 font-mono">Web3 Design Specialist • active</span>
            </div>
          </div>
          <button className="flex items-center gap-1 bg-zinc-950 hover:bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-[10px] text-zinc-400 font-mono transition-colors">
            <Download className="w-3.5 h-3.5 text-red-500" />
            Add to Telegram
          </button>
        </div>

        {/* Telegram Chat viewport */}
        <div className="flex-1 p-5 overflow-y-auto bg-zinc-950/30 flex flex-col gap-4 scrollbar-thin">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[80%] flex flex-col ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}
              >
                {msg.text && (
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "me" 
                      ? "bg-red-950/80 text-red-100 border border-red-800/60 rounded-br-none" 
                      : "bg-zinc-900/90 text-zinc-300 border border-zinc-800/50 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                )}

                {msg.stickerEmoji && (
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border bg-gradient-to-b ${msg.stickerStyle}`}
                  >
                    <span className="text-4xl">{msg.stickerEmoji}</span>
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider">{msg.stickerText}</span>
                  </motion.div>
                )}
                <span className="text-[8px] font-mono text-zinc-600 mt-1 uppercase">
                  {msg.sender === "me" ? "Sent" : "Fahim"} • Just now
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sticker Tray (Bottom overlay) */}
        <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-zinc-400">Click a sticker to test express send:</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {currentPack.stickers.map((stk, sIdx) => (
              <button
                key={sIdx}
                onClick={() => handleStickerTap(stk)}
                className={`flex flex-col items-center justify-center gap-2 px-4 py-3 bg-zinc-950 hover:bg-zinc-900 rounded-xl border border-zinc-800/80 hover:border-red-500/40 cursor-pointer shrink-0 transition-all group hover-glow-red`}
              >
                <span className="text-3xl group-hover:scale-125 transition-transform duration-200">
                  {stk.emoji}
                </span>
                <span className={`text-[8px] font-mono font-bold tracking-widest ${stk.textCol}`}>
                  {stk.text}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Chat Input bar */}
          <div className="flex gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800/80 items-center">
            <Smile className="text-zinc-500 hover:text-zinc-300 w-5 h-5 cursor-pointer ml-1" />
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendTextMessage()}
              className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-xs text-zinc-300 flex-1 px-2"
              placeholder="Type message testing sticker triggers..."
            />
            <button
              onClick={handleSendTextMessage}
              className="bg-red-950 hover:bg-red-900 p-2 rounded-lg border border-red-700/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
