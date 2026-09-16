import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Play, Wind, Send } from 'lucide-react';
import { cn } from '../utils/cn';
import { storage, STORAGE_KEYS } from '../lib/storage';
import { aiCoaching } from '../services/geminiService';
import { Moon, Zap, Scale } from 'lucide-react';

interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const goals: GoalOption[] = [
  { id: 'sleep', title: 'Sleep better', subtitle: 'Wake up refreshed', icon: Moon },
  { id: 'stress', title: 'Reduce stress', subtitle: 'Find your calm', icon: Wind },
  { id: 'energy', title: 'More energy', subtitle: 'Power through your day', icon: Zap },
  { id: 'weight', title: 'Lose weight', subtitle: 'Sustainable habits', icon: Scale },
];

const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const;

export const CoachView = () => {
  const shouldReduceMotion = useReducedMotion();
  const initialMessages = storage.get<any[]>(STORAGE_KEYS.CHAT_MESSAGES) || [
    { id: '1', role: 'ai', text: "Hello! I'm your Mindful Coach. How are you feeling today?", rationale: "Check-ins help establish a baseline for your emotional state." },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    storage.set(STORAGE_KEYS.CHAT_MESSAGES, messages);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    const profile = storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE);
    const goalId = storage.get<string>(STORAGE_KEYS.USER_GOALS);
    const goalTitle = goals.find(g => g.id === goalId)?.title || 'Wellness';
    const context = `User Name: ${profile?.name || 'User'}, Goal: ${goalTitle}`;

    const aiResponse = await aiCoaching.generateResponse(input, context);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      id: (Date.now() + 1).toString(), 
      role: 'ai', 
      text: aiResponse.text,
      rationale: aiResponse.rationale
    }]);
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-md h-[calc(100vh-64px-100px)] overflow-hidden">
      {/* Sessions Horizontal Scroll */}
      <section className="px-5 py-4 pb-0 flex gap-4 overflow-x-auto no-scrollbar flex-shrink-0">
        <motion.div 
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="bg-primary p-5 rounded-xl text-white shadow-lg shadow-primary/20 min-w-[240px] min-h-[120px] flex items-center justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-2xl pointer-events-none" />
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-bold">Mindfulness 101</h3>
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-2">10 min session</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
            <Play fill="currentColor" size={20} className="ml-1" />
          </div>
        </motion.div>
        
        <motion.div 
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="bg-surface p-5 rounded-xl text-on-surface border border-outline-variant shadow-sm min-w-[240px] min-h-[120px] flex items-center justify-between"
        >
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-bold">Breath Work</h3>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-2">5 min session</p>
          </div>
          <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center ml-2 text-primary flex-shrink-0">
            <Wind size={24} />
          </div>
        </motion.div>
      </section>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT_CUBIC }}
              className={cn(
                "flex flex-col max-w-[85%]",
                m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                m.role === 'ai' 
                  ? "bg-surface text-on-surface shadow-sm border border-outline-variant rounded-tl-none" 
                  : "bg-primary text-white rounded-tr-none"
              )}>
                {m.text}
              </div>
              {m.role === 'ai' && m.rationale && (
                <p className="text-xs text-on-surface-variant font-medium mt-2 px-1 leading-tight border-l-2 border-primary/30 ml-1">
                  {m.rationale}
                </p>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mr-auto items-start flex flex-col"
            >
              <div className="bg-surface px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-outline-variant flex items-center gap-1.5 h-10">
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full transition-all" 
                />
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full transition-all" 
                />
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full transition-all" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/80 backdrop-blur-md border-t border-outline-variant">
        <div className="flex items-center gap-2 bg-surface rounded-full border border-outline-variant px-4 py-1 shadow-sm focus-within:border-primary transition-colors">
          <input 
            type="text" 
            placeholder="Talk to your coach..."
            aria-label="Talk to your coach"
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 placeholder:text-on-surface-variant/40"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              (input.trim() && !isTyping)
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100" 
                : "bg-outline-variant text-on-surface-variant opacity-30 scale-90"
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
