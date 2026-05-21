import { Settings, Target, ChevronRight } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../lib/storage';

export const ProfileView = () => {
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
