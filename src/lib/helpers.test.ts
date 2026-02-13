import { describe, expect, it } from 'vitest';

import {
  buildMentionEntities,
  getAdaptiveCardColorString,
  getEmoji,
  parseUserMentions,
  renderMentionsText,
} from './helpers.js';

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

  it('parses valid user mentions and ignores empty input', () => {
    const result = parseUserMentions('Alice|alice@example.com, Bob|bob@ex.com');

    expect(result).toEqual({
      mentions: [
        { name: 'Alice', id: 'alice@example.com' },
        { name: 'Bob', id: 'bob@ex.com' },
      ],
      invalidEntries: [],
    });

    expect(parseUserMentions('')).toEqual({
      mentions: [],
      invalidEntries: [],
    });
  });

  it('collects invalid user mention entries', () => {
    const result = parseUserMentions('Alice|, NoPipe, |missing');

    expect(result).toEqual({
      mentions: [],
      invalidEntries: ['Alice|', 'NoPipe', '|missing'],
    });
  });

  it('builds mention entities and formatted text', () => {
    const mentions = [
      { name: 'Alice', id: 'alice@example.com' },
      { name: 'Bob', id: 'bob@example.com' },
    ];

    expect(buildMentionEntities(mentions)).toEqual([
      {
        type: 'mention',
        text: '<at>Alice</at>',
        mentioned: { id: 'alice@example.com', name: 'Alice' },
      },
      {
        type: 'mention',
        text: '<at>Bob</at>',
        mentioned: { id: 'bob@example.com', name: 'Bob' },
      },
    ]);

    expect(renderMentionsText(mentions)).toBe(
      '**Mentions:** <at>Alice</at>, <at>Bob</at>'
    );
  });
});
