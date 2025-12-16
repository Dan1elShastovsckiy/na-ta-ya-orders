import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem } from '../types';

export const analyzeMenuImage = async (base64Image: string): Promise<MenuItem[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      throw new Error("API Key configuration error");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Schema definition for strictly structured output
    const responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          originalName: { type: Type.STRING, description: "Name of the dish in Thai as seen in image" },
          price: { type: Type.NUMBER, description: "Price of the dish" },
          category: { type: Type.STRING, description: "Category of the dish (e.g., 'Curry', 'Fried', 'Salad')" },
          translations: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ru: { type: Type.STRING },
              zh: { type: Type.STRING },
            },
            required: ["en", "ru", "zh"]
          },
          descriptions: {
             type: Type.OBJECT,
            properties: {
              th: { type: Type.STRING },
              en: { type: Type.STRING },
              ru: { type: Type.STRING },
              zh: { type: Type.STRING },
            },
            required: ["th", "en", "ru", "zh"]
          },
          isSpicy: { type: Type.BOOLEAN }
        },
        required: ["originalName", "price", "category", "translations", "descriptions", "isSpicy"]
      }
    };

    const prompt = `
      You are an expert menu digitizer for a Thai restaurant.
      Analyze the provided menu image. Extract all visible dishes.
      For each dish:
      1. Identify the Thai Name and Price.
      2. Translate the name into English, Russian, and Chinese.
      3. Create a short, appetizing description (1 sentence) in Thai, English, Russian, and Chinese based on standard recipes for that dish name.
      4. Determine if the dish is generally considered spicy.
      5. Infer a general category key (e.g., 'crab', 'isan', 'soup', 'fried').
      
      Return a JSON array strictly following the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const data = JSON.parse(response.text || "[]");
    
    // Map response to our MenuItem type
    return data.map((item: any, index: number) => ({
      id: `gen-${Date.now()}-${index}`,
      category: item.category.toLowerCase().replace(/\s/g, '_'),
      price: item.price,
      name: {
        th: item.originalName,
        en: item.translations.en,
        ru: item.translations.ru,
        zh: item.translations.zh
      },
      description: {
        th: item.descriptions.th,
        en: item.descriptions.en,
        ru: item.descriptions.ru,
        zh: item.descriptions.zh
      },
      image: "https://picsum.photos/400/300", // Placeholder for AI generated items
      isSpicy: item.isSpicy
    }));

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};