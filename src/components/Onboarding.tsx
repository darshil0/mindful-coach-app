import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Target, Check, User, Lock } from 'lucide-react';
import { cn } from '../utils/cn';
import { storage, STORAGE_KEYS } from '../lib/storage';
import { Moon, Wind, Zap, Scale } from 'lucide-react';

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

const EASE_OUT_CUBIC = "easeOut";

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const shouldReduceMotion = useReducedMotion();
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
            initial={shouldReduceMotion ? { width: progress } : { width: 0 }}
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
            initial={shouldReduceMotion ? { opacity: 0 } : { x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
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
            initial={shouldReduceMotion ? { opacity: 0 } : { x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
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
                <label htmlFor="user-name" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">First Name</label>
                <input
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
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
