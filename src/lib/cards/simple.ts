export interface SimpleCardParams {
  color?: string;
  text: string;
  title: string;
  titleSize?: 'Default' | 'Large';
}

export const populateCard = ({
  color = 'Emphasis',
  text,
  title,
  titleSize = 'Default',
}: SimpleCardParams) => {
  // console.log({ color, text, title, titleSize });

  const simpleNotificationCard = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          $schema: 'https://adaptivecards.io/schemas/adaptive-card.json',
          version: '1.5',
          msteams: {
            width: 'Full',
          },
          body: [
            {
              type: 'Container',
              targetWidth: 'atLeast:Narrow',
              items: [
                {
                  type: 'TextBlock',
                  text: title,
                  wrap: true,
                  size: titleSize,
                  weight: 'Bolder',
                  spacing: 'None',
                },
              ],
              spacing: 'None',
              style: color,
              bleed: true,
            },
            {
              type: 'TextBlock',
              text: text,
              wrap: true,
              size: 'Default',
              height: 'stretch',
              spacing: 'Small',
            },
          ],
        },
      },
    ],
  };

  return simpleNotificationCard;
};
