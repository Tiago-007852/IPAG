import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, Minimize2, MessageSquare } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export default function ChatTutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsTyping(true);

    try {
      const response = await geminiService.getTutorResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || '' }] }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass overflow-hidden flex flex-col shadow-2xl rounded-[2rem] border border-white/20"
          >
            {/* Header */}
            <div className="bg-brand-blue p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-bold leading-none">Tutor IPAG</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Inteligência Artificial</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-3">
                   <div className="w-16 h-16 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto text-brand-blue">
                      <MessageSquare size={32} />
                   </div>
                   <p className="text-sm font-medium text-zinc-500">Olá! Como posso ajudar nos seus estudos hoje?</p>
                   <div className="flex flex-wrap gap-2 justify-center">
                      <button onClick={() => setInput("Dicas de estudo")} className="text-[10px] font-bold p-2 bg-brand-gray rounded-lg hover:bg-brand-blue/5 transition-colors uppercase tracking-widest">Dicas de Estudo</button>
                      <button onClick={() => setInput("Orientação Vocacional")} className="text-[10px] font-bold p-2 bg-brand-gray rounded-lg hover:bg-brand-blue/5 transition-colors uppercase tracking-widest">Carreiras</button>
                   </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-brand-blue text-white rounded-tr-none" 
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-none border border-zinc-100 dark:border-zinc-700"
                  )}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-brand-gray p-3 rounded-2xl flex gap-1">
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Pergunte qualquer coisa..."
                className="flex-grow bg-brand-gray dark:bg-zinc-800 px-4 py-3 rounded-xl outline-none text-sm font-medium"
              />
              <button 
                onClick={sendMessage}
                className="bg-brand-blue text-white p-3 rounded-xl hover:bg-brand-blue/90 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(10,35,66,0.3)] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
        <Bot className="relative z-10 transition-colors group-hover:text-brand-blue" size={28} />
      </motion.button>
    </div>
  );
}

// Ensure cn is imported
import { cn } from '../lib/utils';
