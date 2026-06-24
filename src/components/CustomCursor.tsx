import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  theme: "dark" | "light";
}

export default function CustomCursor({ theme }: CustomCursorProps) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Snappy, near-instant spring for the main inner precision dot (zero noticeable lag)
  const dotSpringConfig = { damping: 45, stiffness: 750, mass: 0.15 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Fluid, luxurious magnetic spring for the outer trailing halo
  const ringSpringConfig = { damping: 28, stiffness: 180, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable states contextually
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isClickable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";

      setIsHoveringClickable(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Apply clean global stylesheet to override system cursor on high-density displays
    const style = document.createElement("style");
    style.id = "hide-default-cursor";
    style.innerHTML = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.getElementById("hide-default-cursor")?.remove();
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  // State configurations matching active visual layout themes
  const config = {
    dark: {
      dotColor: isHoveringClickable ? "bg-white" : "bg-red-500",
      ringBorder: isHoveringClickable ? "border-red-500/85" : "border-red-500/35",
      ringBg: isHoveringClickable ? "bg-red-500/10" : "bg-transparent",
      ringSize: isHoveringClickable ? "w-12 h-12" : "w-7 h-7",
      ringGlow: isHoveringClickable 
        ? "shadow-[0_0_20px_rgba(239,68,68,0.45)]" 
        : "shadow-[0_0_8px_rgba(239,68,68,0.1)]"
    },
    light: {
      dotColor: isHoveringClickable ? "bg-rose-600" : "bg-red-500",
      ringBorder: isHoveringClickable ? "border-red-500/85" : "border-red-500/40",
      ringBg: isHoveringClickable ? "bg-red-500/15" : "bg-transparent",
      ringSize: isHoveringClickable ? "w-11 h-11" : "w-7 h-7",
      ringGlow: isHoveringClickable 
        ? "shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
        : "shadow-[0_0_6px_rgba(239,68,68,0.08)]"
    }
  };

  const active = config[theme] || config.dark;

  return (
    <>
      {/* 1. Fluid Magnetic Trailing Ring (follows lagging behind elegantly) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHoveringClickable ? 1.15 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`rounded-full border transition-all duration-300 ease-out select-none ${active.ringSize} ${active.ringBorder} ${active.ringBg} ${active.ringGlow}`}
      />

      {/* 2. Instant Precision Center Dot (perfect tactical timing) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHoveringClickable ? 1.8 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors duration-250 select-none ${active.dotColor}`}
      />
    </>
  );
}
