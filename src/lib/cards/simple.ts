import {
  buildMentionEntities,
  renderMentionsText,
  type UserMention,
} from '../helpers.js';

export interface SimpleCardParams {
  color?: string;
  text: string;
  title: string;
  titleSize?: 'Default' | 'Large';
  userMentions?: UserMention[];
}

export const populateCard = ({
  color = 'Emphasis',
  text,
  title,
  titleSize = 'Default',
  userMentions = [],
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
            ...(userMentions.length > 0
              ? {
                  entities: buildMentionEntities(userMentions),
                }
              : {}),
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
            ...(userMentions.length > 0
              ? [
                  {
                    type: 'TextBlock',
                    text: renderMentionsText(userMentions),
                    wrap: true,
                    size: 'Small',
                    spacing: 'Small',
                  },
                ]
              : []),
          ],
        },
      },
    ],
  };

  return simpleNotificationCard;
};
