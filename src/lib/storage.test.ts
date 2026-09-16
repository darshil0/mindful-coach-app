import { describe, it, expect, beforeEach } from 'vitest';
import { storage, STORAGE_KEYS } from './storage';

describe('storage utility', () => {
  beforeEach(() => {
    storage.clear();
  });

  it('should store and retrieve data correctly', () => {
    const userProfile = { name: 'Test User' };
    storage.set(STORAGE_KEYS.USER_PROFILE, userProfile);

    const retrieved = storage.get<{ name: string }>(STORAGE_KEYS.USER_PROFILE);
    expect(retrieved).toEqual(userProfile);
  });

  it('should return null for non-existent keys', () => {
    const result = storage.get('non_existent_key');
    expect(result).toBeNull();
  });

  it('should remove items correctly', () => {
    storage.set(STORAGE_KEYS.USER_GOALS, 'sleep');
    expect(storage.get(STORAGE_KEYS.USER_GOALS)).toBe('sleep');

    storage.remove(STORAGE_KEYS.USER_GOALS);
    expect(storage.get(STORAGE_KEYS.USER_GOALS)).toBeNull();
  });

  it('should clear all items', () => {
    storage.set(STORAGE_KEYS.USER_GOALS, 'energy');
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);

    storage.clear();

    expect(storage.get(STORAGE_KEYS.USER_GOALS)).toBeNull();
    expect(storage.get(STORAGE_KEYS.ONBOARDING_COMPLETE)).toBeNull();
  });
});
