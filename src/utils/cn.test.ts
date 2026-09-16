import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-primary');
    expect(result).toBe('px-4 py-2 bg-primary');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isPrimary = false;
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isPrimary && 'primary-class'
    );
    expect(result).toBe('base-class active-class');
  });

  it('should resolve tailwind class conflicts correctly', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });
});
