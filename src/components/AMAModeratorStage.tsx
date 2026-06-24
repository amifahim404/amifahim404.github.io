import { useState, useEffect } from "react";
import { Mic, Users, MessageSquare, Flame, Play, Square, Trophy, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AMARecord {
  id: string;
  projectName: string;
  logo: string;
  tagline: string;
  listeners: number;
  questionsAnswered: number;
  reachMultiplier: string;
  topics: string[];
}

const PAST_AMAS: AMARecord[] = [
  {
    id: "poly-oracle",
    projectName: "PolyOracle Labs",
    logo: "🔮",
    tagline: "Dynamic Cross-Chain Data Feeds & Real-Time Gas Integrators",
    listeners: 4850,
    questionsAnswered: 14,
    reachMultiplier: "3.2x",
    topics: ["Node Decentralization", "Oracle Feeds", "Gas Optimizations"]
  },
  {
    id: "sol-defenders",
    projectName: "SolDefenders NFT",
    logo: "🛡️",
    tagline: "Action RPG & Smart Mint Protection on Solana Mainnet",
    listeners: 6500,
    questionsAnswered: 18,
    reachMultiplier: "4.8x",
    topics: ["Solana Mint Contracts", "Play-to-Earn Rewards", "Community Vetting"]
  },
  {
    id: "gem-matrix",
    projectName: "GemMatrix Protocol",
    logo: "💎",
    tagline: "AI-Powered Yield Aggregation Strategies & Smart Escrow Labs",
    listeners: 3900,
    questionsAnswered: 11,
    reachMultiplier: "2.5x",
    topics: ["Escrows Design", "Automated Yields", "Safe Vault Infrastructure"]
  }
];

export default function AMAModeratorStage() {
  const [selectedAMAIdx, setSelectedAMAIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBars, setAudioBars] = useState<number[]>(Array.from({ length: 15 }, () => 15));
  const [simulatedSubtitles, setSimulatedSubtitles] = useState("");
  const [scrollingChats, setScrollingChats] = useState<string[]>([]);

  const activeAMA = PAST_AMAS[selectedAMAIdx];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        // Randomize audio bar heights when broadcast simulation runs
        setAudioBars(Array.from({ length: 18 }, () => Math.floor(Math.random() * 45) + 5));

        // Randomly update simulated speaking subtitles
        const subtitles = [
          "Fahim Farouqe: Let's address the core tech. How does your contract handle frontrouting protection?",
          "Fahim Farouqe: Incredible outline. Our community of developers is definitely keying into that layer.",
          "Fahim Farouqe: To the founders — tell us more about the long-term utility of the burn-govern module.",
          "Fahim Farouqe: Awesome! Now let's open the floor to the audience's curated Twitter list.",
          "Fahim Farouqe: Let's discuss the security audit results. What was the turnaround on remediating those findings?"
        ];
        const randomSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
        setSimulatedSubtitles(randomSubtitle);

        // Append a random enthusiast fan reaction chat
        const liveChats = [
          "🚀 WAGMI guys! This was very clear.",
          "Fahim Farouqe is asking the exact questions we wanted!",
          "Bullish oracle approach indeed.",
          "When token launch? Is there an airdrop task?",
          "Clean layout, the speaker vetted them fully.",
          "Great moderation! Highly professional AMA stage."
        ];
        const randomChat = liveChats[Math.floor(Math.random() * liveChats.length)];
        setScrollingChats((prev) => [randomChat, ...prev].slice(0, 5));

      }, 2000);
    } else {
      setAudioBars(Array.from({ length: 18 }, () => 10));
      setSimulatedSubtitles("Host Microphone Inactive. Click 'Simulate Live Stage' to hear host moderator flow.");
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleToggleBroadcast = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setScrollingChats(["🔴 Broadcast started by Host: Fahim Farouqe", "Audience tuning in..."]);
    } else {
      setScrollingChats(["⚪ Broadcast completed successfully.", "Host mic closed."]);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* AMA Detail Selector */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="glass-panel p-6 rounded-2xl bg-zinc-950/95 border border-zinc-800/60 backdrop-blur-xl hover-glow-red">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 mb-4">
            <Mic className="text-red-500 w-5 h-5 animate-pulse" />
            <h3 className="font-semibold text-lg tracking-tight font-sans">AMA Speaking & Vetting</h3>
          </div>

          <div className="flex flex-col gap-3">
            {PAST_AMAS.map((ama, idx) => (
              <button
                key={ama.id}
                onClick={() => {
                  setSelectedAMAIdx(idx);
                  setIsPlaying(false);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all hover-glow-red ${
                  selectedAMAIdx === idx
                    ? "bg-red-950/40 border-red-500/40"
                    : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-805"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-zinc-900 border border-zinc-800">{ama.logo}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-zinc-200">{ama.projectName}</span>
                      <span className="text-[9px] font-mono font-semibold text-red-400 bg-red-950/60 px-2 rounded">
                        MGM {ama.reachMultiplier} REACH
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{ama.tagline}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick core metrics */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-900">
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 flex flex-col justify-between">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">AMA Audio Sessions</span>
              <span className="text-xl font-bold font-sans text-red-400">80+ Hosted</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 flex flex-col justify-between">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Curated Audience Peak</span>
              <span className="text-xl font-bold font-sans text-red-400">22,000+ IP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Broadcast console */}
      <div className="lg:col-span-7 flex flex-col glass-panel rounded-2xl border border-zinc-800/60 bg-zinc-950/95 overflow-hidden backdrop-blur-xl hover-glow-red">
        <div className="bg-zinc-900/20 px-5 py-4 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-500 animate-ping" : "bg-zinc-500"}`} />
            <h4 className="font-bold text-sm tracking-tight text-zinc-200">
              {isPlaying ? "Live Broadcast Simulation Station" : "Simulation Inactive"}
            </h4>
          </div>
          <button
            onClick={handleToggleBroadcast}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-[10px] uppercase font-bold transition-all ${
              isPlaying
                ? "bg-red-900 border-red-600 text-white"
                : "bg-zinc-950 border-zinc-800 hover:border-red-500/50 text-zinc-300"
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-white text-white" />
                Stop Session
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                Simulate Live Stage
              </>
            )}
          </button>
        </div>

        {/* Console layout */}
        <div className="p-6 flex-1 flex flex-col gap-5 justify-between">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeAMA.logo}</span>
              <div>
                <h5 className="font-bold text-sm text-zinc-200">{activeAMA.projectName} AMA Interview</h5>
                <p className="text-[11px] text-zinc-500 font-mono">{activeAMA.tagline}</p>
              </div>
            </div>

            {/* Listener count widget */}
            <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/30 border border-red-500/20 px-3 py-1 rounded-full font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>{isPlaying ? (activeAMA.listeners + Math.floor(Math.random() * 50)).toLocaleString() : activeAMA.listeners.toLocaleString()} LIVE</span>
            </div>
          </div>

          {/* Glowing Equalizer Bar Visualizer */}
          <div className="flex items-end justify-center gap-1 h-[65px] border-b border-zinc-900 pb-2">
            {audioBars.map((bar, i) => (
              <motion.div
                key={i}
                animate={{ height: `${bar}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-2.5 bg-gradient-to-t from-red-900 to-red-500 rounded-t-sm"
              />
            ))}
          </div>

          {/* Microphone subtitles speech text block */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono text-xs text-zinc-300 min-h-[75px] leading-relaxed relative overflow-hidden">
            <div className="absolute right-3 top-3 px-1.5 py-0.5 rounded bg-zinc-900 text-[8px] tracking-widest text-zinc-500 uppercase">
              Host SUBTITLES
            </div>
            <p className="pr-16">{simulatedSubtitles}</p>
          </div>

          {/* Attendee Live Feed ticker */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Enthusiast Fan Feed Reactions:</span>
            <div className="h-[90px] p-2 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col gap-1 overflow-y-auto scrollbar-thin text-[10px] font-mono leading-relaxed text-zinc-400">
              <AnimatePresence initial={false}>
                {scrollingChats.map((chat, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    className="flex gap-2 text-zinc-400 border-b border-zinc-900/40 pb-0.5"
                  >
                    <span className="text-red-500">💬</span>
                    <span>{chat}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
