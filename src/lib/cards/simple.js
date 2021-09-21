exports.populateCard = ({ title, message, color }) => ({
  '@type': 'MessageCard',
  '@context': 'https://schema.org/extensions',
  summary: title,
  themeColor: color,
  title: title,
  text: message,
});
