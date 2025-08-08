
import React, { useState, useEffect, useRef } from 'react';
import type { Agent, ChatMessage } from '../types';
import { getChatResponseStream } from '../services/geminiService';
import UserIcon from './icons/UserIcon';

interface ChatTestProps {
    agent: Agent;
}

const ChatTest: React.FC<ChatTestProps> = ({ agent }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        // Reset chat and add an initial greeting when agent changes
        setMessages([
            { role: 'model', text: `Hola, soy ${agent.name || 'tu asistente'}. ¿Cómo puedo ayudarte?` }
        ]);
        setError(null);
        setInput('');
    }, [agent.id, agent.name]);


    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const currentUserMessage = input;
        const userMessage: ChatMessage = { role: 'user', text: currentUserMessage };
        
        // The history for the API should be what was *before* this new message.
        const historyForAPI = [...messages]; 

        // Update UI with user message and model placeholder in one go
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsLoading(true);
        setError(null);

        let hadError = false;

        await getChatResponseStream(
            currentUserMessage,
            agent,
            historyForAPI, 
            (chunk) => {
                setMessages(prev => {
                    const lastMsgIndex = prev.length - 1;
                    if (prev[lastMsgIndex]?.role === 'model') {
                        const updatedMessages = [...prev];
                        updatedMessages[lastMsgIndex] = {
                            ...updatedMessages[lastMsgIndex],
                            text: updatedMessages[lastMsgIndex].text + chunk,
                        };
                        return updatedMessages;
                    }
                    return prev;
                });
            },
            (err) => {
                hadError = true;
                setError(err);
                // Remove the empty model message placeholder on error
                setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg && lastMsg.role === 'model' && lastMsg.text === '') {
                        return prev.slice(0, -1);
                    }
                    return prev;
                });
                setIsLoading(false);
            }
        );
        
        if (!hadError) {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Prueba tu Agente</h3>
                <p className="text-sm text-gray-500">Interactúa con tu agente en tiempo real.</p>
            </div>
            <div className="flex-grow p-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    IA
                                </div>
                            )}
                            <div className={`px-4 py-2 rounded-lg max-w-sm break-words whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {msg.text === '' && msg.role === 'model' && isLoading 
                                    ? <span className="inline-block w-2 h-4 my-1 bg-gray-400 animate-pulse rounded-full" /> 
                                    : msg.text}
                            </div>
                             {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
            </div>
             {error && <div className="p-2 mx-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">{error}</div>}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe tu mensaje..."
                        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary-500 text-white px-4 rounded-md disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors flex items-center justify-center w-32"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando
                            </>
                        ) : (
                            'Enviar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatTest;
