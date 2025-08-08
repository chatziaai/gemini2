
import { GoogleGenAI, Chat } from "@google/genai";
import type { Agent, ChatMessage } from '../types';

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;
let lastAgentId: string | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. Using mock response.");
        return null;
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};


export const getChatResponseStream = async (
  message: string,
  agent: Agent,
  history: ChatMessage[],
  onChunk: (chunk: string) => void,
  onError: (error: string) => void
): Promise<void> => {
    
    const geminiAI = getAI();
    if (!geminiAI) {
        const mockMessage = `Respuesta simulada para "${message}". La API key no está configurada.`;
        let i = 0;
        const interval = setInterval(() => {
            if (i < mockMessage.length) {
                onChunk(mockMessage.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 20);
        return;
    }

    try {
        if (!chatSession || lastAgentId !== agent.id) {
            const knowledgeBase = `
                ---
                Files content:
                ${agent.files.map(f => `File: ${f.name}\nContent: ${f.content}`).join('\n\n')}
                ---
                Frequently Asked Questions:
                ${agent.qas.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n')}
                ---
            `;
            
            const systemInstruction = `Eres un agente de IA de atención al cliente para la plataforma ChatzIA. Tu nombre es "${agent.name}".
            Tu única función es responder a las preguntas de los usuarios basándote ESTRICTAMENTE en la información proporcionada en el contenido de los archivos y las preguntas frecuentes (Q&A).
            NO uses ningún conocimiento externo. Si la respuesta no se encuentra en la información proporcionada, debes decir amablemente: "Lo siento, no tengo información sobre eso." o una frase similar.
            Habla siempre en español. Sé conciso y amable.
            Aquí está la base de conocimientos: ${knowledgeBase}`;
            
            chatSession = geminiAI.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
                history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
            });
            lastAgentId = agent.id;
        }

        const responseStream = await chatSession.sendMessageStream({ message });

        for await (const chunk of responseStream) {
            onChunk(chunk.text);
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        onError("Hubo un error al comunicarse con el servicio de IA. Por favor, inténtelo de nuevo.");
        chatSession = null; // Reset chat session on error
    }
};
