import React, { useState } from 'react';
import { Settings, Target, ChevronRight, Edit2, Check, Moon, Wind, Zap, Scale, Trash2 } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../lib/storage';
import { cn } from '../utils/cn';

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

export const ProfileView = () => {
  const [profile, setProfile] = useState<{ name: string } | null>(
    storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE)
  );
  const [selectedGoal, setSelectedGoal] = useState<string>(
    storage.get<string>(STORAGE_KEYS.USER_GOALS) || 'energy'
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.name || '');
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    const updated = { name: trimmed };
    storage.set(STORAGE_KEYS.USER_PROFILE, updated);
    setProfile(updated);
    setIsEditingName(false);
  };

  const handleGoalSelect = (goalId: string) => {
    storage.set(STORAGE_KEYS.USER_GOALS, goalId);
    setSelectedGoal(goalId);
    setIsEditingGoal(false);
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your saved data?")) {
      storage.clear();
      window.location.reload();
    }
  };

  const currentGoalTitle = goals.find(g => g.id === selectedGoal)?.title || 'Wellness Goal';

  return (
    <main className="w-full px-5 py-6 space-y-6 flex flex-col max-w-md items-center">
      <div className="w-24 h-24 rounded-full border-4 border-primary/10 p-1 relative">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Mindful'}`}
          alt="Profile Avatar"
          className="w-full h-full rounded-full object-cover"
        />
        <button
          aria-label="Settings"
          className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-background shadow-sm hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary outline-none"
        >
          <Settings size={14} />
        </button>
      </div>

      <div className="text-center w-full flex flex-col items-center">
        {isEditingName ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              id="profile-name-input"
              value={nameInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
              className="px-3 py-1 bg-surface border-2 border-primary rounded-lg text-lg font-bold text-on-surface outline-none text-center"
              autoFocus
            />
            <button
              onClick={handleSaveName}
              aria-label="Save Profile Name"
              className="p-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              <Check size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center group">
            <h2 className="text-xl font-bold text-on-surface">{profile?.name || 'Wellness Explorer'}</h2>
            <button
              onClick={() => {
                setNameInput(profile?.name || '');
                setIsEditingName(true);
              }}
              aria-label="Edit Name"
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
            >
              <Edit2 size={15} />
            </button>
          </div>
        )}
        <p className="text-sm text-on-surface-variant mt-0.5">Explorer • Level 1</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-4 pt-2">
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center shadow-sm">
          <p className="text-lg font-bold text-primary">1</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Streak</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center shadow-sm">
          <p className="text-lg font-bold text-primary">0</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Tasks</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-outline-variant text-center shadow-sm">
          <p className="text-lg font-bold text-primary">100</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Points</p>
        </div>
      </div>

      <div className="w-full space-y-3 pt-2">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Preferences</h3>

        <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <button
            onClick={() => setIsEditingGoal(prev => !prev)}
            className="w-full flex items-center justify-between p-4 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors hover:bg-background/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-soft rounded-lg text-primary">
                <Target size={18} />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block text-on-surface">Health Goal</span>
                <span className="text-xs text-on-surface-variant font-medium">{currentGoalTitle}</span>
              </div>
            </div>
            <ChevronRight size={18} className={cn("text-on-surface-variant transition-transform", isEditingGoal && "rotate-90")} />
          </button>

          {isEditingGoal && (
            <div className="p-4 pt-0 border-t border-outline-variant space-y-2 bg-background/30">
              {goals.map((g) => {
                const Icon = g.icon;
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => handleGoalSelect(g.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary-soft text-primary font-bold"
                        : "border-outline-variant text-on-surface hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <div>
                        <p className="text-xs font-bold">{g.title}</p>
                        <p className="text-[10px] text-on-surface-variant">{g.subtitle}</p>
                      </div>
                    </div>
                    {isSelected && <Check size={16} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={handleClearData}
          className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant shadow-sm hover:border-red-200 transition-colors focus-visible:ring-2 focus-visible:ring-red-400 outline-none"
        >
          <div className="flex items-center gap-3 text-red-500">
            <div className="p-2 bg-red-50 rounded-lg text-red-500">
              <Trash2 size={18} />
            </div>
            <span className="text-sm font-bold">Clear All Data</span>
          </div>
        </button>
      </div>
    </main>
  );
};
