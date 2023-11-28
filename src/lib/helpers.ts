// accepts hex code value with optional hashtag (#000000 or 000000)
// or string of 'success', 'warning', 'info', or 'failure'
export const validateColorString = (colorString: string) => {
  return colorString.match(
    /^#?([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2}|success|info|warning|failure)\b$/i
  );
};

export type ObjectMap = Record<string, string | undefined>;

export interface ColorStrings extends ObjectMap {
  default?: string;
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export const getHexForColorString = (colorString: string) => {
  if (validateColorString(colorString)) {
    const colorStrings: ColorStrings = {
      info: '1919ff',
      failure: 'b20000',
      success: '007300',
      warning: 'ffcc00',
    };
    return colorStrings[colorString] ?? colorString;
  }
  console.log('Invalid color string, using default color');
  return '808080';
};

export const getAdaptiveCardColorString = (colorString: string) => {
  const colorStrings: ColorStrings = {
    default: 'emphasis', //gray
    info: 'accent', // blue
    failure: 'attention', // red
    success: 'good', // green
    warning: 'warning', // yellow
  };
  return colorStrings[colorString] ?? 'emphasis';
};

export interface EmojiStrings extends ObjectMap {
  good: string;
  accent: string;
  warning: string;
  attention: string;
  emphasis?: string;
}

export const getEmoji = (adaptiveCardColor = 'emphasis') => {
  const emojiList: EmojiStrings = {
    good: '✅ ',
    accent: 'ℹ️  ',
    warning: '⚠️  ',
    attention: '🚨 ',
    emphasis: '',
  };
  return emojiList[adaptiveCardColor] ?? '';
};
