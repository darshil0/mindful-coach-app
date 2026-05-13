
export const STORAGE_KEYS = {
  USER_GOALS: 'mindful_coach_user_goals',
  ONBOARDING_COMPLETE: 'mindful_coach_onboarding_complete',
  CHAT_MESSAGES: 'mindful_coach_chat_messages',
  USER_PROFILE: 'mindful_coach_user_profile',
};

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};
