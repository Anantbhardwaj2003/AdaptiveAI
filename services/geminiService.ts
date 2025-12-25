
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Guideline: Use new GoogleGenAI({ apiKey: process.env.API_KEY }) directly.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getModelAdvice(modelType: string, datasetDescription: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am fine-tuning a ${modelType} on a dataset that contains: ${datasetDescription}. 
        Provide 3 specific advice tips for hyperparameters (epochs, learning rate, batch size) 
        and potential pitfalls to avoid. Format as a clean JSON list of objects with 'title' and 'content'.`,
        config: {
          responseMimeType: "application/json",
          // Guideline: The recommended way is to configure a responseSchema for structured JSON output.
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: 'The title of the advice tip.',
                },
                content: {
                  type: Type.STRING,
                  description: 'The detailed content of the advice tip.',
                },
              },
              propertyOrdering: ["title", "content"],
              required: ["title", "content"],
            },
          },
        }
      });
      // Guideline: Access the .text property directly.
      const jsonStr = response.text?.trim() || '[]';
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini advice failed:", error);
      return [];
    }
  }

  async transcribeAndAnalyze(audioText: string) {
     try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following transcribed user feedback about their AI training results and suggest next steps: "${audioText}"`,
      });
      // Guideline: Access the .text property directly.
      return response.text;
    } catch (error) {
      console.error("Analysis failed:", error);
      return "Analysis unavailable.";
    }
  }
}

export const geminiService = new GeminiService();
