// accepts hex code value with optional hashtag (#000000 or 000000)
// or string of 'success', 'warning', 'info', or 'failure'
exports.validateColorString = function (colorString) {
  return colorString.match(
    /^#?([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2}|success|info|warning|failure)\b$/i,
  );
};

exports.getHexForColorString = function (colorString) {
  if (exports.validateColorString(colorString)) {
    let hexCode;
    switch (colorString) {
      case 'info':
        hexCode = '1919ff';
        break;
      case 'warning':
        hexCode = 'ffcc00';
        break;
      case 'success':
        hexCode = '007300';
        break;
      case 'failure':
        hexCode = 'b20000';
        break;
      default:
        hexCode = '808080';
        break;
    }
    return hexCode;
  }
  console.log('Invalid color string, using default color');
  return '808080';
};
