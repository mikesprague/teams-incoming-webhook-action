import { describe, expect, it } from 'vitest';

import { populateCard } from './simple.js';

describe('simple card', () => {
  it('builds an adaptive card payload', () => {
    const card = populateCard({
      title: 'Hello',
      text: 'World',
      color: 'accent',
    });

    expect(card.type).toBe('message');
    expect(card.attachments[0].contentType).toBe(
      'application/vnd.microsoft.card.adaptive'
    );
    expect(card.attachments[0].content.body[0].items[0].text).toBe('Hello');
    expect(card.attachments[0].content.body[0].style).toBe('accent');
    expect(card.attachments[0].content.body[1].text).toBe('World');
  });

  it('adds mention entities and text when provided', () => {
    const card = populateCard({
      title: 'Hello',
      text: 'World',
      color: 'accent',
      userMentions: [
        { name: 'Alice', id: 'alice@example.com' },
        { name: 'Bob', id: 'bob@example.com' },
      ],
    });

    const content = card.attachments[0].content;
    const entities = content.msteams.entities as Array<{
      text: string;
      mentioned: { name: string; id: string };
    }>;
    const mentionText = content.body[2].text as string;

    expect(entities).toEqual([
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
    expect(mentionText).toBe('**Mentions:** <at>Alice</at>, <at>Bob</at>');
  });
});
