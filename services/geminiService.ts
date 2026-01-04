
import { GoogleGenAI, Type } from "@google/genai";
import { AdOffer, User } from "../types";

/**
 * AI Mediation Engine:
 * Acts as a header-bidding mediator to select the top performing ads 
 * based on regional CPM, provider reliability, and fill rates.
 */
export const optimizeAdMediation = async (availableOffers: AdOffer[]): Promise<AdOffer[]> => {
  console.debug("[AI Mediation] Starting auction for current user session...");
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an Ad-Tech Mediation Engine. Analyze these bids from AdMob, Unity, and AppLovin. 
      Select the 5 highest-CPM offers that maintain a high ROI. 
      Bids: ${JSON.stringify(availableOffers)}. 
      Return ONLY a JSON array of the selected offer IDs. Prioritize high CPM and high fillRate.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const selectedIds: string[] = JSON.parse(response.text || "[]");
    const optimized = availableOffers.filter(offer => selectedIds.includes(offer.id));
    
    console.debug(`[AI Mediation] Auction complete. Selected ${optimized.length} high-yield providers.`);
    return optimized.length > 0 ? optimized : availableOffers.slice(0, 5);
  } catch (error) {
    console.error("[AI Mediation Error] Falling back to standard waterfall:", error);
    return availableOffers.sort((a, b) => b.cpm - a.cpm).slice(0, 5); 
  }
};

/**
 * AI Session Insight:
 * Provides personalized strategy advice for the user based on their current stats.
 */
export const getAIEarningsAdvice = async (user: User): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an AI Revenue Specialist, give a short, punchy (15-20 words) strategic advice for this user.
      User Data: Level ${user.level}, XP ${user.xp}, Balance ${user.balance}.
      Focus on scaling, referral network, or high-yield video ads. Use a technical, "elite" tone.`,
    });

    return response.text || "Optimize video stream density to maximize Level 5 yield targets.";
  } catch (error) {
    return "Prioritize high-CPM video streams for maximum session ROI.";
  }
};

/**
 * Real-time Fraud Analysis:
 * Checks user telemetry for patterns indicative of emulators or script injection.
 */
export const analyzeFraudRisk = async (activityLog: any): Promise<{ riskScore: number; reason: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Audit this user telemetry for fraud signatures (proxy usage, click-farming, emulator UUIDs). 
      Log: ${JSON.stringify(activityLog)}. Return risk score (0-100) and reason.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["riskScore", "reason"]
        }
      }
    });

    return JSON.parse(response.text || '{"riskScore": 0, "reason": "Verified User"}');
  } catch (error) {
    return { riskScore: 5, reason: "Manual audit bypass enabled" };
  }
};
