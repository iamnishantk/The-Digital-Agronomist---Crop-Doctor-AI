
import { GoogleGenAI, Modality } from "@google/genai";
import type { GeminiAnalysisResult } from '../types';

// The API key is injected by the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be handled by the UI, but it's good practice to have a check.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

export const analyzeImageWithGemini = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<GeminiAnalysisResult> => {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please contact support.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: GeminiAnalysisResult = { text: null, image: null };

    // FIX: Simplified response parsing to correctly extract text and image parts from the first candidate.
    const parts = response?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.text) {
        result.text = part.text;
      } else if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const imageMimeType = part.inlineData.mimeType;
        result.image = `data:${imageMimeType};base64,${base64ImageBytes}`;
      }
    }
    
    // FIX: If no parts were found, fallback to the top-level text property.
    if (!result.text && !result.image) {
      result.text = response.text || null;
    }

    if (!result.text && !result.image) {
        throw new Error("No content generated. The response was empty.");
    }

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the image.");
  }
};
