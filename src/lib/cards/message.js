exports.messageCard = function ({
  title,
  message = '',
  color = '17a2b8',
  buttons = [],
}) {
  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: title,
    themeColor: color,
    title: title,
    text: message,
    potentialAction: [],
  };
  if (buttons.length) {
    buttons.forEach(function (button) {
      const buttonData = {
        '@context': 'http://schema.org',
        target: [button.url],
        '@type': 'ViewAction',
        name: `${button.title}`,
      };
      messageCard.potentialAction.push(buttonData);
    });
  }
  return messageCard;
};
