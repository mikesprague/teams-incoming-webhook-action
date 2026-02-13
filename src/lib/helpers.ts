export interface ColorStrings extends Record<string, string | undefined> {
  dark?: string;
  default?: string;
  emphasis?: string;
  failure: string;
  info: string;
  light?: string;
  success: string;
  warning: string;
}

export const getAdaptiveCardColorString = (colorString: string) => {
  const colorStrings: ColorStrings = {
    dark: 'Dark', // unsure, spec says this is a valid option but doesn't specify the color
    default: 'Emphasis', //gray
    emphasis: 'Emphasis', //gray
    failure: 'Attention', // red
    info: 'Accent', // blue
    light: 'Light', // unsure, spec says this is a valid option but doesn't specify the color
    success: 'Good', // green
    warning: 'Warning', // yellow
  };
  return colorStrings[colorString] ?? 'Emphasis';
};

export interface EmojiStrings extends Record<string, string | undefined> {
  accent: string;
  attention: string;
  dark?: string;
  emphasis?: string;
  good: string;
  light?: string;
  warning: string;
}

export const getEmoji = (adaptiveCardColor = 'Emphasis') => {
  const emojiList: EmojiStrings = {
    accent: 'ℹ️  ',
    attention: '🚨 ',
    dark: '',
    emphasis: '',
    good: '✅ ',
    light: '',
    warning: '⚠️  ',
  };
  return emojiList[adaptiveCardColor.toLowerCase() as keyof EmojiStrings] ?? '';
};

export type UserMention = {
  name: string;
  id: string;
};

export type ParseUserMentionsResult = {
  mentions: UserMention[];
  invalidEntries: string[];
};

export const parseUserMentions = (input: string): ParseUserMentionsResult => {
  const entries = input
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  const mentions: UserMention[] = [];
  const invalidEntries: string[] = [];

  for (const entry of entries) {
    const parts = entry.split('|');
    if (parts.length !== 2) {
      invalidEntries.push(entry);
      continue;
    }

    const [name, id] = parts.map((part) => part.trim());
    if (!name || !id) {
      invalidEntries.push(entry);
      continue;
    }

    mentions.push({ name, id });
  }

  return { mentions, invalidEntries };
};

export const buildMentionEntities = (mentions: UserMention[]) =>
  mentions.map((mention) => ({
    type: 'mention',
    text: `<at>${mention.name}</at>`,
    mentioned: {
      id: mention.id,
      name: mention.name,
    },
  }));

export const renderMentionsText = (mentions: UserMention[]) =>
  `**Mentions:** ${mentions
    .map((mention) => `<at>${mention.name}</at>`)
    .join(', ')}`;
