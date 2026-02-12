import { describe, expect, it } from 'vitest';

import { getAdaptiveCardColorString, getEmoji } from './helpers.js';

describe('helpers', () => {
  it('maps adaptive card colors with fallback', () => {
    expect(getAdaptiveCardColorString('success')).toBe('Good');
    expect(getAdaptiveCardColorString('default')).toBe('Emphasis');
    expect(getAdaptiveCardColorString('unknown')).toBe('Emphasis');
  });

  it('returns emojis for known adaptive card colors', () => {
    expect(getEmoji('Good')).toBe('✅ ');
    expect(getEmoji('unknown')).toBe('');
  });
});
