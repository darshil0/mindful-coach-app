import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Wind, 
  Zap, 
  Scale, 
  Check, 
  Lock, 
  Target,
  Home,
  MessageSquare,
  User,
  Settings,
  Play,
  Flame,
  Footprints,
  ChevronRight,
  Sparkles,
  Send,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Tooltip, 
  AreaChart,
  Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { storage, STORAGE_KEYS } from './lib/storage';
import { aiCoaching } from './services/geminiService';
import { format } from 'date-fns';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

type View = 'onboarding' | 'dashboard';

// --- Constants ---
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

const goals: GoalOption[] = [
  { id: 'sleep', title: 'Sleep better', subtitle: 'Wake up refreshed', icon: Moon },
  { id: 'stress', title: 'Reduce stress', subtitle: 'Find your calm', icon: Wind },
  { id: 'energy', title: 'More energy', subtitle: 'Power through your day', icon: Zap },
  { id: 'weight', title: 'Lose weight', subtitle: 'Sustainable habits', icon: Scale },
];

const stepsData = [
  { day: 'M', steps: 4200 },
  { day: 'T', steps: 5100 },
  { day: 'W', steps: 3800 },
  { day: 'T', steps: 6200 },
  { day: 'F', steps: 5800 },
  { day: 'S', steps: 8500 },
  { day: 'S', steps: 7200 },
];

const sleepData = [
  { time: '10pm', level: 20 },
  { time: '12am', level: 80 },
  { time: '2am', level: 90 },
  { time: '4am', level: 75 },
  { time: '6am', level: 60 },
  { time: '8am', level: 30 },
];

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string>(storage.get<string>(STORAGE_KEYS.USER_GOALS) || 'energy');
  const [name, setName] = useState<string>(storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE)?.name || '');

  const handleNext = () => {
    if (step === 1) {
      storage.set(STORAGE_KEYS.USER_GOALS, selectedGoal);
      setStep(2);
    } else {
      storage.set(STORAGE_KEYS.USER_PROFILE, { name });
      storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
      onComplete();
    }
  };

  const progress = step === 1 ? '50%' : '100%';

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-5 w-full bg-background max-w-md mx-auto">
      <div className="w-full mb-10 sticky top-4 z-10 bg-background/80 backdrop-blur-md pt-2">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Step {step} of 2</span>
          <span className="text-[12px] font-bold text-primary">{progress}</span>
        </div>
        <div className="w-full h-2 bg-primary-soft rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: progress }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full" 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            className="w-full"
          >
            <header className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 mb-6 rounded-full bg-surface shadow-sm border border-outline flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="text-primary w-8 h-8" />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Define your goal</h1>
              <p className="text-on-surface-variant text-sm font-medium">What brings you here today?</p>
            </header>

            <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant mb-8 space-y-3">
              {goals.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                const Icon = goal.icon;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={cn(
                      "w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left group relative focus-visible:ring-2 focus-visible:ring-primary outline-none",
                      isSelected 
                        ? "border-primary bg-primary-soft shadow-sm" 
                        : "border-outline-variant hover:border-primary/40 hover:bg-background"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg mr-4 transition-colors",
                      isSelected ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                    )}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">{goal.title}</p>
                      <p className="text-xs text-on-surface-variant font-medium">{goal.subtitle}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={12} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
            className="w-full"
          >
            <header className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 mb-6 rounded-full bg-surface shadow-sm border border-outline flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary w-8 h-8" />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Tell us about you</h1>
              <p className="text-on-surface-variant text-sm font-medium">How should your coach address you?</p>
            </header>

            <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant mb-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">First Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Darshil"
                  className="w-full h-12 bg-background border-2 border-outline-variant rounded-xl px-4 text-sm font-medium focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="w-full flex flex-col gap-3 items-center mt-auto">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={step === 2 && !name.trim()}
          className={cn(
            "w-full h-[52px] rounded-full font-bold flex items-center justify-center shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none active:scale-[0.98]",
            (step === 2 && !name.trim()) 
              ? "bg-outline-variant text-on-surface-variant cursor-not-allowed opacity-50" 
              : "bg-primary text-white shadow-primary/20 hover:opacity-90"
          )}
        >
          {step === 1 ? 'Next' : 'Create Profile'}
        </motion.button>
        
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium mt-4">
          <Lock size={12} className="opacity-60" />
          <span>Local-first. Your data stays on your device.</span>
        </div>
      </footer>
    </div>
  );
};

const HomeView = () => {
  const profile = storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE);
  const firstName = profile?.name?.split(' ')[0] || 'there';

  return (
    <main className="w-full px-5 py-6 space-y-6 flex flex-col max-w-md">
      {/* Welcome Block */}
      <section>
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
          {format(new Date(), 'EEEE, MMMM dd')}
        </p>
        <h2 className="text-2xl font-bold text-on-surface">Good morning, {firstName}</h2>
      </section>

    {/* Daily Score Circle */}
    <div className="flex justify-center py-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="60" fill="none" stroke="#4DB6AC1A" strokeWidth="8" />
          <motion.circle 
            cx="64" cy="64" r="60" fill="none" stroke="#4DB6AC" strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 60}
            initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - 0.78) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="p-2 bg-primary-soft rounded-full mb-0.5">
            <Flame size={16} className="text-primary" />
          </div>
          <span className="text-2xl font-bold text-on-surface">78</span>
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">Energy Score</span>
        </div>
      </div>
    </div>

    {/* Actionable Coach Card */}
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-primary p-6 rounded-xl text-white shadow-xl shadow-primary/20 flex items-center gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-2xl pointer-events-none" />
      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
        <Play fill="currentColor" size={24} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1">Morning Mobility</h3>
        <p className="text-white/80 text-xs">8-minute wake-up session</p>
      </div>
      <ChevronRight size={20} className="text-white/60" />
    </motion.div>

    {/* AI Insight Card */}
    <div className="bg-surface rounded-xl p-5 border border-outline-variant flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center text-primary">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface">Coaching Insight</p>
          <p className="text-xs text-on-surface-variant">Based on your sleep quality</p>
        </div>
      </div>
      <p className="text-sm text-on-surface-variant italic leading-relaxed">
        "Your REM cycle was 15% longer last night. This is a great window for creative work or high-focus tasks before 2 PM."
      </p>
      <div className="h-px bg-outline-variant my-1" />
      <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Science-backed rationale</p>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-2 gap-4">
      {/* Steps Card */}
      <div className="bg-surface rounded-xl p-4 border border-outline-variant space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary-soft rounded-lg text-primary">
            <Footprints size={18} />
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Steps</span>
        </div>
        <div>
          <p className="text-xl font-bold text-on-surface">7,243</p>
          <p className="text-[10px] text-on-surface-variant">72% of daily goal</p>
        </div>
        <div className="h-20 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stepsData}>
              <Bar dataKey="steps" fill="#4DB6AC" radius={[4, 4, 0, 0]} />
              <Tooltip cursor={false} content={() => null} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sleep Card */}
      <div className="bg-surface rounded-xl p-4 border border-outline-variant space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary-soft rounded-lg text-primary">
            <Moon size={18} />
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Sleep</span>
        </div>
        <div>
          <p className="text-xl font-bold text-on-surface">7h 24m</p>
          <p className="text-[10px] text-on-surface-variant">Restorative • 92%</p>
        </div>
        <div className="h-20 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepData}>
              <defs>
                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4DB6AC" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4DB6AC" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="level" stroke="#4DB6AC" fillOpacity={1} fill="url(#colorSleep)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </main>
);
};

const CoachView = () => {
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
          whileTap={{ scale: 0.98 }}
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
          whileTap={{ scale: 0.98 }}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
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
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
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
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 placeholder:text-on-surface-variant/40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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

const ProfileView = () => {
  const profile = storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE);
  
  const handleLogout = () => {
    storage.clear();
    window.location.reload();
  };

  return (
    <main className="w-full px-5 py-6 space-y-6 flex flex-col max-w-md items-center">
      <div className="w-24 h-24 rounded-full border-4 border-primary/10 p-1 relative">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Mindful'}`} alt="Profile" className="w-full h-full rounded-full object-cover" />
        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-background">
          <Settings size={14} />
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-on-surface">{profile?.name || 'Wellness Explorer'}</h2>
        <p className="text-sm text-on-surface-variant">Explorer • Level 1</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-4 pt-4">
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center">
          <p className="text-lg font-bold text-primary">1</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Streak</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center">
          <p className="text-lg font-bold text-primary">0</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Tasks</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center">
          <p className="text-lg font-bold text-primary">100</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Points</p>
        </div>
      </div>

      <div className="w-full space-y-2">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-4 mb-2">Preferences</h3>
        <button className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant">
          <div className="flex items-center gap-3">
            <Target size={18} className="text-primary" />
            <span className="text-sm font-bold">Health Goals</span>
          </div>
          <ChevronRight size={18} className="text-on-surface-variant" />
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant"
        >
          <div className="flex items-center gap-3 text-red-500">
            <Settings size={18} />
            <span className="text-sm font-bold">Clear All Data</span>
          </div>
        </button>
      </div>
    </main>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'coach' | 'profile'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'coach': return <CoachView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col items-center w-full overflow-x-hidden">
      {/* Top Nav Bar */}
      <nav className="w-full h-16 flex items-center justify-between px-5 sticky top-0 bg-background/80 backdrop-blur-md z-30 flex-shrink-0">
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE)?.name || 'Mindful'}`} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <h1 className="text-base font-bold text-on-surface tracking-tight">
          {activeTab === 'home' && "Mindful Coach"}
          {activeTab === 'coach' && "Coach Connection"}
          {activeTab === 'profile' && "Your Profile"}
        </h1>
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <Settings size={20} />
        </button>
      </nav>

      {renderContent()}

      {/* Bottom Nav Bar */}
      <footer className="w-full fixed bottom-0 left-0 bg-surface shadow-[0_-4px_24px_rgba(0,0,0,0.04)] px-6 pb-8 pt-4 flex items-center justify-around z-40 max-w-md mx-auto left-1/2 -translate-x-1/2">
        <button 
          onClick={() => setActiveTab('home')}
          aria-label="Home Tab"
          className={cn(
            "flex flex-col items-center gap-1 transition-all flex-1 py-1 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary outline-none active:scale-95",
            activeTab === 'home' ? "text-white bg-primary shadow-lg shadow-primary/20" : "text-on-surface-variant hover:text-primary/70"
          )}
        >
          <Home size={20} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeTab === 'home' ? "opacity-100" : "opacity-60")}>Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('coach')}
          aria-label="Coach Tab"
          className={cn(
            "flex flex-col items-center gap-1 transition-all flex-1 py-1 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary outline-none active:scale-95",
            activeTab === 'coach' ? "text-white bg-primary shadow-lg shadow-primary/20" : "text-on-surface-variant hover:text-primary/70"
          )}
        >
          <MessageSquare size={20} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeTab === 'coach' ? "opacity-100" : "opacity-60")}>Coach</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          aria-label="Profile Tab"
          className={cn(
            "flex flex-col items-center gap-1 transition-all flex-1 py-1 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary outline-none active:scale-95",
            activeTab === 'profile' ? "text-white bg-primary shadow-lg shadow-primary/20" : "text-on-surface-variant hover:text-primary/70"
          )}
        >
          <User size={20} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeTab === 'profile' ? "opacity-100" : "opacity-60")}>Profile</span>
        </button>
      </footer>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const onboardingComplete = storage.get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
  const [view, setView] = useState<View>(onboardingComplete ? 'dashboard' : 'onboarding');

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {view === 'onboarding' ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Onboarding onComplete={() => setView('dashboard')} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
