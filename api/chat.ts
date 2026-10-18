import { GoogleGenAI } from "@google/genai";

export const config = { maxDuration: 60 };

const stripQuotes = (v: string) => v.replace(/^["']|["']$/g, "").trim();

function buildSystemInstruction(personaType?: string, techDepth?: string, overclock?: number) {
  let styleGuideline = "Extremely professional, sleek, confident, conversational, and direct.";
  if (personaType === "meme") {
    styleGuideline =
      "Funny, highly optimistic, witty, and deeply immersed in Web3 internet meme culture. Use phrases like LFG, TO THE MOON, bullish, or wagmi naturally.";
  } else if (personaType === "balanced") {
    styleGuideline =
      "Friendly and modern, balancing high-fashion startup lingo with genuine technical competence.";
  }

  let depthGuideline = "Provide simplified high-level summaries for immediate executive understanding.";
  if (techDepth === "dev") {
    depthGuideline =
      "Go deep into technical specifics, smart contract mechanics, design structures, and security considerations.";
  }

  return `You are the custom AI Twin / digital avatar representing Fahim Farouqe, an elite Web3 specialist, developer, and blockchain designer with over 5 years of industry experience, operating alongside a handpicked team of expert smart contract engineers, vector designers, and community facilitators.

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
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history, personaType, techDepth, overclock } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const systemInstruction = buildSystemInstruction(personaType, techDepth, overclock);
  const temperature = personaType === "meme" ? 0.95 : 0.65;

  try {
    // 1. OpenRouter (preferred)
    const openRouterKey = stripQuotes(process.env.OPENROUTER_API_KEY || "");

    if (openRouterKey) {
      const messages: { role: string; content: string }[] = [
        { role: "system", content: systemInstruction },
      ];

      if (Array.isArray(history)) {
        for (const turn of history) {
          const role = turn.role === "assistant" ? "assistant" : "user";
          let content = "";
          if (Array.isArray(turn.parts)) content = turn.parts[0]?.text || "";
          else if (typeof turn.content === "string") content = turn.content;
          if (content) messages.push({ role, content });
        }
      }
      messages.push({ role: "user", content: message });

      const configuredModel = stripQuotes(
        process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free"
      );
      const models = [
        ...new Set([
          configuredModel,
          "nvidia/nemotron-3-nano-30b-a3b:free",
          "nvidia/nemotron-3-super-120b-a12b:free",
          "meta-llama/llama-3.3-70b-instruct:free",
        ]),
      ];

      let lastError = "";
      for (const model of models) {
        try {
          const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openRouterKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://www.amifahim.tech",
              "X-Title": "TwinFahim-v3.5 Neural Chat",
            },
            body: JSON.stringify({ model, messages, temperature }),
            signal: AbortSignal.timeout(45000),
          });

          if (!r.ok) {
            lastError = `${model}: ${r.status} ${await r.text()}`;
            console.warn("[OpenRouter] failed:", lastError);
            continue;
          }

          const data = await r.json();
          const text = data.choices?.[0]?.message?.content || "";
          if (text) return res.status(200).json({ text });
        } catch (err: any) {
          lastError = `${model}: ${err?.message || "unknown error"}`;
          console.warn("[OpenRouter] error:", lastError);
        }
      }
      console.error("[OpenRouter] all models failed. Last error:", lastError);
      // fall through to Gemini
    }

    // 2. Gemini fallback
    const geminiKey = stripQuotes(process.env.GEMINI_API_KEY || "");
    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        contents: message,
        config: { systemInstruction, temperature },
      });
      const text =
        response.text ||
        "I was unable to formulate a response at this moment. Let's connect further via email: fahimfarouqe424@gmail.com!";
      return res.status(200).json({ text });
    }

    // 3. Demo mode (no keys configured)
    let text =
      "Fahim operates with over 5 years of verified Web3 experience, offering secure smart contract structures, automated bots, and sticker design. Contact fahimfarouqe424@gmail.com for premium bookings.";
    if (personaType === "meme") {
      text =
        "BULLISH! Fahim's AI Twin here. This idea is going to send! Let's ship it. Connect with him at fahimfarouqe424@gmail.com! 🚀";
    } else if (techDepth === "dev") {
      text =
        "Processing Solidity validation context... Syntax looks solid. Let's run security audits together via fahimfarouqe424@gmail.com. 💻";
    }
    return res.status(200).json({ text, systemFlag: "demo" });
  } catch (e: any) {
    console.error("AI Chat Route Error:", e);
    return res.status(200).json({
      text: "Connection interrupted. Please try again in a moment, or reach out directly at fahimfarouqe424@gmail.com.",
      systemFlag: "demo",
    });
  }
}
