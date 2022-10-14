// accepts hex code value with optional hashtag (#000000 or 000000)
// or string of 'success', 'warning', 'info', or 'failure'
export const validateColorString = function (colorString) {
  return colorString.match(
    /^#?([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2}|success|info|warning|failure)\b$/i,
  );
};

export const getHexForColorString = function (colorString) {
  if (validateColorString(colorString)) {
    const colorStrings = {
      info: '1919ff',
      failure: 'b20000',
      success: '007300',
      warning: 'ffcc00',
    };
    return colorStrings[colorString] || colorString;
  }
  console.log('Invalid color string, using default color');
  return '808080';
};

export const getAdaptiveCardColorString = function (colorString) {
  const colorStrings = {
    default: 'emphasis', //gray
    info: 'accent', // blue
    failure: 'attention', // red
    success: 'good', // green
    warning: 'warning', // yellow
  };
  return colorStrings[colorString] || 'emphasis';
};

export const getEmoji = (adaptiveCardColor = 'emphasis') => {
  const emojiList = {
    good: '✅ ',
    accent: 'ℹ️  ',
    warning: '⚠️  ',
    attention: '🚨 ',
    emphasis: '',
  };
  return emojiList[adaptiveCardColor] || '';
};
