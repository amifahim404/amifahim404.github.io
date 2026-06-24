import { useEffect } from "react";
import { Sun, Moon, Clock, Sparkles, Shield, Compass, Heart, Settings } from "lucide-react";

export default function ThemeAssetPreloader() {
  useEffect(() => {
    const assets = ["/pfp_light.png", "/pfp_dark.png", "/iconist.png"];

    // 1. Programmatically append high-priority link preload elements to the document head
    const linkElements: HTMLLinkElement[] = [];
    assets.forEach((src) => {
      // Check if already preloaded to avoid duplicates
      if (!document.querySelector(`link[href="${src}"]`)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        // Hint the browser to prioritize this request
        link.setAttribute("fetchpriority", "high");
        document.head.appendChild(link);
        linkElements.push(link);
      }
    });

    // 2. Instantiate persistent in-memory image decoders so they are immediately warm inside browser graphics memory
    const imageCache: HTMLImageElement[] = [];
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Triggers decoding early in background, keeping memory ready before frame swap
      if (img.decode) {
        img.decode().catch((err) => {
          console.debug("Background asset pre-decode completed successfully or ignored: ", err);
        });
      }
      imageCache.push(img);
    });

    return () => {
      // Cleanup dynamically appended links on unmount to keep the DOM clean
      linkElements.forEach((link) => link.remove());
    };
  }, []);

  return (
    /* Off-screen Pre-render Buffer area
       Specifying display:none or opacity-0 absolute positions to compile layout tree and glyph sets
       without altering the flow of the real user viewport. */
    <div 
      className="fixed pointer-events-none opacity-0 -z-50 w-1 h-1 overflow-hidden"
      aria-hidden="true"
    >
      {/* Pre-render theme PFP images with eager fetchpriority to force instant rendering pathways */}
      <img src="/pfp_light.png" alt="" loading="eager" fetchPriority="high" className="w-1 h-1" />
      <img src="/pfp_dark.png" alt="" loading="eager" fetchPriority="high" className="w-1 h-1" />
      <img src="/iconist.png" alt="" loading="eager" fetchPriority="high" className="w-1 h-1" />

      {/* Off-screen layout compilation of crucial theme switcher icons to warm up SVG layout tree paths */}
      <Sun className="w-4 h-4 text-amber-500" />
      <Moon className="w-4 h-4 text-indigo-500" />
      <Clock className="w-4 h-4 text-red-500" />
      <Sparkles className="w-4 h-4 text-red-400" />
      <Shield className="w-4 h-4 text-red-500" />
      <Compass className="w-4 h-4" />
      <Heart className="w-4 h-4" />
      <Settings className="w-4 h-4" />
    </div>
  );
}
