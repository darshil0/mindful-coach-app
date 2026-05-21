import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { storage, STORAGE_KEYS } from './lib/storage';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';

type View = 'onboarding' | 'dashboard';

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
