export const STORAGE_KEYS = {
  USER_GOALS: 'mindful_coach_user_goals',
  ONBOARDING_COMPLETE: 'mindful_coach_onboarding_complete',
  CHAT_MESSAGES: 'mindful_coach_chat_messages',
  USER_PROFILE: 'mindful_coach_user_profile',
};

// In-memory storage for artifact environments
const memoryStore = new Map<string, string>();

// Hybrid storage: use window.storage (artifact API) if available, else fallback to localStorage, else memory
const canUseLocalStorage = (): boolean => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

const useLocalStorage = canUseLocalStorage();

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      let item: string | null = null;

      if (useLocalStorage) {
        item = localStorage.getItem(key);
      } else {
        item = memoryStore.get(key) || null;
      }

      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from storage', e);
      return null;
    }
  },

  set: (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      
      if (useLocalStorage) {
        localStorage.setItem(key, jsonValue);
      } else {
        memoryStore.set(key, jsonValue);
      }
    } catch (e) {
      console.error('Error writing to storage', e);
    }
  },

  remove: (key: string) => {
    try {
      if (useLocalStorage) {
        localStorage.removeItem(key);
      } else {
        memoryStore.delete(key);
      }
    } catch (e) {
      console.error('Error removing from storage', e);
    }
  },

  clear: () => {
    try {
      if (useLocalStorage) {
        localStorage.clear();
      } else {
        memoryStore.clear();
      }
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  }
};
