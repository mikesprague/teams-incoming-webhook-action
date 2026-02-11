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
