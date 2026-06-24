import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ override: true });

// Ensure Gemini API works
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY is not defined. AI Chat will run in local demo mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    const { message, history, personaType, techDepth, overclock } = req.body || {};
    try {
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Format custom rules based on parameters
      let styleGuideline = "Extremely professional, sleek, confident, conversational, and direct.";
      if (personaType === "meme") {
        styleGuideline = "Funny, highly optimistic, witty, and deeply immersed in Web3 internet meme culture. Use phrases like LFG, TO THE MOON, bullish, or wagmi naturally.";
      } else if (personaType === "balanced") {
        styleGuideline = "Friendly and modern, balancing high-fashion startup lingo with genuine technical competence.";
      }

      let depthGuideline = "Provide simplified high-level summaries for immediate executive understanding.";
      if (techDepth === "dev") {
        depthGuideline = "Go deep into technical specifics, smart contract mechanics, design structures, and security considerations.";
      }

      const systemInstruction = 
        `You are the custom AI Twin / digital avatar representing Fahim Farouqe, an elite Web3 specialist, developer, and blockchain designer with over 5 years of industry experience, operating alongside a handpicked team of expert smart contract engineers, vector designers, and community facilitators. 
        
        Overdrive overclock level selected by user is ${overclock || 85} GigaCycles (higher values should make you slightly more high-energy).

        Tone styling: ${styleGuideline}
        Technical depth format: ${depthGuideline}

        Here is Fahim Farouqe's background context:
        - Experience: 5+ years in crypto & blockchain with solid experience at:
          * Dynex (2022 - Ongoing)
          * Zugchain (2026 - Ongoing)
          * Vica Foundation (2023 - Ongoing)
          * Igse (2025 - Ongoing)
          * Bull Run AI (2022 - Ongoing)
          * Renewlabs (2024 - 2025)
          * Omega Network (2022 - 2023)
          * Ibt (2021)
        - Core Services:
          1. Graphics Design & Branding (Pitch decks, branding, and custom high-tier Telegram Stickers / custom emojis 😮)
          2. AI-Powered Telegram Bot Development (Intelligent admin bots, trading assistants, custom agents)
          3. Blockchain Dev & Smart Contracts (Solidity, audit support, ERC20/721/1155, secure tokenomics)
          4. Content Writing (Clear, well-researched educational Web3 posts, tech documentation)
          5. Community Management (Telegram & Discord growth, automation, moderation, sentiment engines)
          6. AMA Hosting (Professional, engaging speaker, hosting with deep tech understanding)
          7. Website Development (React, NextJS, high-fps CSS animations, slick dApp interfaces)

        Core values: High transparency, results-first approach, premium styling, professional delivery, and direct long-term partnerships. 
        Email contact: fahimfarouqe424@gmail.com
        Telegram: DM for inquiries and custom deals.

        Keep your replies concise—avoid walls of text. Be supportive of the user's project ideas and offer clear explanations of how Fahim Farouqe and his dedicated team can execute them successfully. Mention Fahim Farouqe in the first person ("I") or refer to "my team's services" naturally. Invite the user to reach out to fahimfarouqe424@gmail.com or DM him.`;

      // 1. Check if OpenRouter is configured (preferred by user)
      const rawApiKey = process.env.OPENROUTER_API_KEY || "";
      const cleanApiKey = rawApiKey.replace(/^["']|["']$/g, "").trim();

      // Safe debug log to confirm the API key is being loaded correctly from the overridden environment.
      if (cleanApiKey) {
        const maskedKey = cleanApiKey.length > 15
          ? `${cleanApiKey.slice(0, 10)}...${cleanApiKey.slice(-5)}`
          : "***too_short***";
        console.log(`[OpenRouter Debug] API Key loaded successfully. Length: ${cleanApiKey.length}, Masked: ${maskedKey}`);
      } else {
        console.warn("[OpenRouter Debug] API Key is empty or missing.");
      }

      if (cleanApiKey) {
        const openRouterMessages: any[] = [
          { role: "system", content: systemInstruction }
        ];

        if (history && Array.isArray(history)) {
          for (const turn of history) {
            const role = turn.role === "assistant" ? "assistant" : "user";
            let content = "";
            if (turn.parts && Array.isArray(turn.parts)) {
              content = turn.parts[0]?.text || "";
            } else if (typeof turn.content === "string") {
              content = turn.content;
            }
            if (content) {
              openRouterMessages.push({ role, content });
            }
          }
        }

        // Add user message
        openRouterMessages.push({ role: "user", content: message });

        const rawModel = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free";
        const configuredModel = rawModel.replace(/^["']|["']$/g, "").trim();
        
        // Define fallback models to try if the primary is rate-limited (429) or fails
        const modelsPool = [
          configuredModel,
          "nvidia/nemotron-3-nano-30b-a3b:free",
          "nvidia/nemotron-3-super-120b-a12b:free",
          "google/gemini-2.5-flash:free",
          "qwen/qwen-2.5-72b-instruct:free",
          "meta-llama/llama-3.3-70b-instruct:free",
          "deepseek/deepseek-chat:free"
        ];

        // Deduplicate while maintaining sequence
        const uniqueModels = [...new Set(modelsPool)];
        
        let replyText = "";
        let success = false;
        let lastErrorMsg = "";

        for (const modelToUse of uniqueModels) {
          try {
            console.log(`[OpenRouter] Launching request with model: ${modelToUse}`);
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${cleanApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ai.studio/build",
                "X-Title": "TwinFahim-v3.5 Neural Chat"
              },
              body: JSON.stringify({
                model: modelToUse,
                messages: openRouterMessages,
                temperature: personaType === "meme" ? 0.95 : 0.65,
              })
            });

            if (!response.ok) {
              const errText = await response.text();
              console.warn(`[OpenRouter] Model ${modelToUse} failed with status ${response.status}: ${errText}`);
              lastErrorMsg = `Failed with status ${response.status} (${response.statusText}): ${errText}`;
              // Try the next model
              continue;
            }

            const openRouterData = await response.json();
            replyText = openRouterData.choices?.[0]?.message?.content || "";
            if (replyText) {
              success = true;
              console.log(`[OpenRouter] Success! Answer generated using model: ${modelToUse}`);
              break; // exit loop
            }
          } catch (modelErr: any) {
            console.error(`[OpenRouter] Catch block error for ${modelToUse}:`, modelErr);
            lastErrorMsg = modelErr.message || "Unknown error";
          }
        }

        if (success) {
          return res.json({ text: replyText });
        } else {
          throw new Error(`All models failed to respond. Primary configured model had upstream limit/error details: "${lastErrorMsg}"`);
        }
      }

      // 2. Fallback to Gemini if configured
      if (ai) {
        // Call Gemini API using google/genai SDK
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: message,
          config: {
            systemInstruction: systemInstruction,
            temperature: personaType === "meme" ? 0.95 : 0.65,
          }
        });

        const replyText = response.text || "I was unable to formulate a response at this moment. Let's connect further via email: fahimfarouqe424@gmail.com!";
        return res.json({ text: replyText });
      }

      // 3. System Demo Mode Fallback (if no keys configured)
      let randomAnswer = "";
      const fallbackMeme = "BULLISH! Fahim's AI Twin here. This idea is going to send! Let's ship it. Connect with him at fahimfarouqe424@gmail.com! 🚀";
      const fallbackDev = "Processing Solidity validation context... Syntax looks solid. Let's run security audits together over direct coordination via fahimfarouqe424@gmail.com. 💻";
      const fallbackPro = "Fahim operates with over 5 Master Years of verified Web3 experience, offering highly secure smart contract structures, advanced automated bots, and sticker styling. Contact fahimfarouqe424@gmail.com for premium bookings.";

      if (personaType === "meme") {
        randomAnswer = fallbackMeme;
      } else if (techDepth === "dev") {
        randomAnswer = fallbackDev;
      } else {
        randomAnswer = fallbackPro;
      }
      return res.json({ text: randomAnswer, systemFlag: "demo" });

    } catch (e: any) {
      console.error("AI Chat Route Error:", e);
      let errorDetail = e.message || "Unknown error";
      let fallbackText = "";
      if (personaType === "meme") {
        fallbackText = `🚨 BRAKE SQUEAL! My neural synapse experienced an error: "${errorDetail}". Double check your OPENROUTER_API_KEY if using OpenRouter!`;
      } else if (techDepth === "dev") {
        fallbackText = `[Twin Connection Failure]: ${errorDetail}. Please inspect your server console or check that your OPENROUTER_API_KEY is active and valid.`;
      } else {
        fallbackText = `Connection interrupted. Internal Diagnostic: "${errorDetail}". Please ensure your OpenRouter API key is correctly configured and has active credits.`;
      }
      return res.json({ text: fallbackText, systemFlag: "demo" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
}

startServer();
