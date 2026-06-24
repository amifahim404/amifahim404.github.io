import { useEffect, useRef, useState } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const checkTheme = () => {
      setIsLightMode(root.classList.contains("light"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow drifting
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(239, 68, 68, ${this.alpha})`;
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    const drawGridOfLight = () => {
      ctx.clearRect(0, 0, width, height);

      // Check if light mode is active to disable drawings
      const isLight = document.documentElement.classList.contains("light");
      if (isLight) {
        animationFrameId = requestAnimationFrame(drawGridOfLight);
        return;
      }

      // Draw premium grid overlay
      ctx.strokeStyle = "rgba(239, 68, 68, 0.015)";
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and connect particles (blockchain style)
      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);

        // Check distance to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect with thin red lines if close enough
          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawGridOfLight);
    };

    drawGridOfLight();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Radial soft ambient glow in the top-right and bottom-left with custom color variants */}
      {!isLightMode && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-red-500/5 to-transparent blur-3xl opacity-80" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-radial from-red-500/5 to-transparent blur-3xl opacity-80" />
        </>
      )}
    </div>
  );
}
