
import { GoogleGenAI, Type } from "@google/genai";
import { WishResponse } from "../types";

export const generateChristmasWish = async (ornamentType: string): Promise<WishResponse> => {
  try {
    // The API key must be used directly from process.env.API_KEY.
    // We instantiate inside the function to prevent the entire app from crashing during module load
    // if the environment variable is not yet available.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.warn("Gemini API Key is missing in the environment. Using fallback greeting.");
      return {
        message: "May your holiday season be filled with digital magic, warmth, and endless joy!",
        author: "The Spirit of Christmas"
      };
    }

    // Initialize the AI client only when needed
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a heartwarming, magical Christmas wish or a short festive story based on a ${ornamentType} ornament. Make it poetic and cozy.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "The festive wish text" },
            author: { type: Type.STRING, description: "A festive pseudonym (e.g., 'The North Pole Post')" }
          },
          required: ["message", "author"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return {
      message: json.message || "May your holidays be filled with digital magic and warmth!",
      author: json.author || "The Spirit of Christmas"
    };
  } catch (error) {
    console.error("Error generating wish:", error);
    return {
      message: "May your days be merry and bright, and your heart be light!",
      author: "Saint Nicholas"
    };
  }
};
