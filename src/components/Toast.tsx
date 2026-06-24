import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  subMessage?: string;
  type?: "success" | "warning" | "info";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  subMessage,
  type = "success",
  isOpen,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  const getThemeConfig = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-zinc-950/95 border-emerald-500/30 shadow-emerald-950/20",
          iconBg: "bg-emerald-950/40 border-emerald-500/20 text-emerald-400",
          progressBg: "bg-emerald-500",
          icon: <CheckCircle2 className="w-4 h-4" />
        };
      case "warning":
        return {
          bg: "bg-zinc-950/95 border-amber-500/30 shadow-amber-950/20",
          iconBg: "bg-amber-950/40 border-amber-500/20 text-amber-400",
          progressBg: "bg-amber-500",
          icon: <AlertTriangle className="w-4 h-4" />
        };
      case "info":
      default:
        return {
          bg: "bg-zinc-950/95 border-red-500/30 shadow-red-950/20",
          iconBg: "bg-red-950/40 border-red-500/20 text-red-400",
          progressBg: "bg-red-500",
          icon: <Info className="w-4 h-4" />
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className={`fixed top-6 right-6 z-[100] max-w-sm w-full p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex flex-col gap-3 overflow-hidden ${theme.bg}`}
        >
          {/* Main Panel Content */}
          <div className="flex items-start gap-3 relative z-10">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${theme.iconBg}`}>
              {theme.icon}
            </div>
            
            <div className="flex-1 flex flex-col gap-0.5 text-left">
              <span className="text-xs font-bold font-sans text-zinc-100 tracking-tight leading-tight">
                {message}
              </span>
              {subMessage && (
                <span className="text-[10px] font-sans text-zinc-400 leading-snug">
                  {subMessage}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded-md hover:bg-zinc-900/60 transition-all cursor-pointer focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Shrinking bottom progressbar tracking time remaining */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`h-full ${theme.progressBg}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
