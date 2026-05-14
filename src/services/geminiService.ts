import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in environment");
  }
  return new GoogleGenAI({ apiKey });
};

interface CoachingResponse {
  text: string;
  rationale: string;
}

export const aiCoaching = {
  generateResponse: async (userMessage: string, context: string): Promise<CoachingResponse> => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Context: ${context}\n\nUser Message: ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: `You are 'Mindful Coach', a calm, encouraging, and professional wellness guide. Provide evidence-based, low-friction mindfulness and health advice. Respond in a concise, mindful way.

RESPOND ONLY WITH VALID JSON (no markdown, no preamble):
{
  "text": "Your main coaching advice here",
  "rationale": "Scientific or psychological reasoning here"
}`,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The main coaching advice or message."
              },
              rationale: {
                type: "string",
                description: "The scientific or psychological rationale behind the advice."
              }
            },
            required: ["text", "rationale"]
          } as any // Type system for responseSchema is complex; use any for compatibility
        }
      });
      
      const responseText = response.text?.trim() || "{}";
      
      // Remove markdown code fence if present
      const cleanJson = responseText
        .replace(/^```json\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
      
      try {
        const parsed = JSON.parse(cleanJson);
        if (parsed.text && parsed.rationale) {
          return parsed as CoachingResponse;
        }
        throw new Error("Invalid response structure");
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, cleanJson);
        return {
          text: "I'm processing your thoughts. Let's take a moment of silence together.",
          rationale: "Mindfulness often involves sitting with the present moment, even when it's unclear."
        };
      }
    } catch (error: any) {
      console.error("Gemini AI Error:", error);
      
      // Handle specific API errors
      if (error?.message?.includes("API key") || error?.status === 403) {
        return {
          text: "I'm having trouble accessing my knowledge base. Please ensure your API key is configured in the environment.",
          rationale: "Transparency about technical limitations helps reduce user frustration and builds trust."
        };
      }

      if (error?.status === 400 || error?.message?.includes("invalid")) {
        return {
          text: "Let me recalibrate my response. Could you rephrase that?",
          rationale: "Rephrasing helps both coach and client clarify intentions and improve communication quality."
        };
      }

      return {
        text: "I'm reconnecting to my wellness knowledge base. Let's focus on a deep breath while I do.",
        rationale: "Breathing exercises provide immediate physiological calming effects during unexpected stressors."
      };
    }
  }
};
