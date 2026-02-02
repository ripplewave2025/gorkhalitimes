'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from '@/components/LanguageToggle';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const { language } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const t = translations.chat;

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ id: '1', role: 'assistant', content: t.welcome[language] }]);
        }
    }, [language, messages.length, t.welcome]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const responses = {
                en: "That's an interesting question! Based on recent news, I can help you understand the context better.",
                ne: 'यो एक रोचक प्रश्न हो! हालको समाचारको आधारमा, म तपाईंलाई सन्दर्भ राम्रोसँग बुझ्न मद्दत गर्न सक्छु।',
                hi: 'यह एक दिलचस्प सवाल है! हाल की खबरों के आधार पर, मैं आपको संदर्भ को बेहतर समझने में मदद कर सकता हूं।',
            };
            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: responses[language] }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-white">AI Chat</h1>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="flex-1 pt-20 pb-24 px-4 overflow-y-auto no-scrollbar">
                <div className="max-w-lg mx-auto space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-blue-500'}`}>
                                {msg.role === 'assistant' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
                            </div>
                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'assistant' ? 'glass rounded-tl-sm' : 'bg-blue-500 rounded-tr-sm'}`}>
                                <p className="text-sm text-white leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="fixed bottom-16 left-0 right-0 glass border-t border-white/10 p-4">
                <div className="max-w-lg mx-auto flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t.placeholder[language]}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 smooth-transition"
                    />
                    <button onClick={handleSend} disabled={!input.trim()} className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-xl smooth-transition">
                        <Send size={20} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
