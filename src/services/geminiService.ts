import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  async getTutorResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], userPrompt: string) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key do Gemini não configurada.");
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: `Você é o Tutor IA do IPAG Huambo (Instituto Poltécnico de Administração e Gestão). 
          Seu objetivo é ajudar alunos em Angola com dúvidas sobre Administração, Gestão, Contabilidade e Informática. 
          Use um tom profissional, encorajador e educativo. Fale em Português de Angola quando apropriado. 
          Você também ajuda no processo de orientação vocacional para novos alunos.`,
          temperature: 0.7,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Erro no Gemini:", error);
      throw error;
    }
  },

  async suggestStudyPlan(subject: string, goals: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Crie um plano de estudo personalizado para a disciplina: ${subject}. 
        O aluno tem os seguintes objetivos: ${goals}. 
        Retorne um guia estruturado com tópicos semanais.`,
      });
      return response.text;
    } catch (error) {
      return "Não foi possível gerar o plano no momento.";
    }
  }
};
