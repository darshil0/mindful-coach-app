import { motion, useReducedMotion } from 'motion/react';
import { Flame, Play, ChevronRight, Sparkles, Footprints, Moon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, Tooltip, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import { storage, STORAGE_KEYS } from '../lib/storage';

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

export const HomeView = () => {
  const shouldReduceMotion = useReducedMotion();
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
              initial={shouldReduceMotion ? { strokeDashoffset: 2 * Math.PI * 60 * (1 - 0.78) } : { strokeDashoffset: 2 * Math.PI * 60 }}
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
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
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
