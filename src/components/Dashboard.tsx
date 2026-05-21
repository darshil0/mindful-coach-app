import { useState } from 'react';
import { Home, MessageSquare, User, Settings } from 'lucide-react';
import { cn } from '../utils/cn';
import { storage, STORAGE_KEYS } from '../lib/storage';
import { HomeView } from './HomeView';
import { CoachView } from './CoachView';
import { ProfileView } from './ProfileView';

export const Dashboard = () => {
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
