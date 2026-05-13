import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const aiCoaching = {
  generateResponse: async (userMessage: string, context: string) => {
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
          systemInstruction: "You are 'Mindful Coach', a calm, encouraging, and professional wellness guide. Provide evidence-based, low-friction mindfulness and health advice. Respond in a concise, mindful way.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The main coaching advice or message."
              },
              rationale: {
                type: Type.STRING,
                description: "The scientific or psychological rationale behind the advice."
              }
            },
            required: ["text", "rationale"]
          }
        }
      });
      
      const jsonText = response.text || "{}";
      try {
        return JSON.parse(jsonText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, jsonText);
        return {
          text: response.text || "I'm processing your thoughts. Let's take a moment of silence together.",
          rationale: "Mindfulness often involves sitting with the present moment, even when it's unclear."
        };
      }
    } catch (error: any) {
      console.error("Gemini AI Error:", error);
      
      // Handle the specific error types from the skill
      if (error?.status === 403 || error?.status === 400) {
        return {
          text: "I'm having trouble accessing my knowledge base. Please check the API key in the Settings > Secrets panel.",
          rationale: "Transparency about technical limitations helps reduce user frustration and builds trust."
        };
      }

      return {
        text: "I'm having a slight trouble connecting to my knowledge base. Let's focus on a deep breath for now while I reconnect.",
        rationale: "Breathing exercises provide immediate physiological calming effects during unexpected stressors."
      };
    }
  }
};
