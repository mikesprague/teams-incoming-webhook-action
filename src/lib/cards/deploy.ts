import type { Endpoints } from '@octokit/types';

import {
  buildMentionEntities,
  getEmoji,
  renderMentionsText,
  type UserMention,
} from '../helpers.js';

type GetCommitResponse =
  Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response'];

export interface DeployCardParams {
  author: GetCommitResponse['data']['author'];
  branch: string | undefined;
  color: string;
  commit: GetCommitResponse;
  message?: string;
  repoName: string;
  repoUrl: string;
  runId: string;
  runNum: string;
  sha: string;
  showCommitMessage?: boolean;
  timestamp: string;
  title: string;
  titleSize?: 'Default' | 'Large';
  userMentions?: UserMention[];
}

export const populateCard = ({
  author,
  branch,
  color,
  commit,
  message,
  repoName,
  repoUrl,
  runId,
  runNum,
  sha,
  showCommitMessage = false,
  timestamp,
  title,
  titleSize = 'Default',
  userMentions = [],
}: DeployCardParams) => {
  const workflowStatusCard = {
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
                  text: `${getEmoji(color)}${title}`,
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
            ...(message
              ? [
                  {
                    type: 'TextBlock',
                    text: message,
                    wrap: true,
                    size: 'Default',
                    spacing: 'Small',
                  },
                ]
              : []),
            {
              type: 'TextBlock',
              text: `[**Workflow Run #${runNum}**](${repoUrl}/actions/runs/${runId}) on [**${repoName}**](${repoUrl})`,
              wrap: true,
              size: 'Default',
              spacing: 'Small',
              weight: 'Default',
            },
            {
              type: 'TextBlock',
              text: `by **${commit.data.commit.author?.name ?? 'Unknown'}**${
                author?.login
                  ? author.login.includes('dependabot') ||
                    author.login.includes('github-actions')
                    ? ` (**@${author.login}**)`
                    : ` ([**@${author.login}**](https://github.com/${author.login}))`
                  : ''
              } on **${timestamp}**`,
              wrap: true,
              size: 'Small',
              spacing: 'None',
            },
            {
              type: 'Container',
              spacing: 'Small',
              targetWidth: 'atLeast:Narrow',
              items: [
                {
                  type: 'ColumnSet',
                  height: 'auto',
                  spacing: 'None',
                  targetWidth: 'atLeast:Narrow',
                  width: 'auto',
                  columns: [
                    {
                      type: 'Column',
                      width: 'auto',
                      verticalContentAlignment: 'Top',
                      items: [
                        {
                          type: 'TextBlock',
                          text: 'Branch:',
                          weight: 'Bolder',
                          size: 'Default',
                          spacing: 'None',
                        },
                        {
                          type: 'TextBlock',
                          text: 'Commit:',
                          weight: 'Bolder',
                          size: 'Default',
                          spacing: 'None',
                        },
                      ],
                    },
                    {
                      type: 'Column',
                      width: 'auto',
                      verticalContentAlignment: 'Top',
                      items: [
                        {
                          type: 'TextBlock',
                          text: `[**${branch}**](${repoUrl}/tree/${branch})`,
                          fontType: 'Monospace',
                          size: 'Default',
                          spacing: 'None',
                        },
                        {
                          type: 'TextBlock',
                          text: `[**${sha.slice(0, 7)}**](${commit.data.html_url})${
                            showCommitMessage && commit.data.commit.message
                              ? ` - ${commit.data.commit.message.split('\n')[0]}`
                              : ''
                          }`,
                          fontType: 'Monospace',
                          size: 'Default',
                          spacing: 'None',
                        },
                      ],
                    },
                  ],
                },
              ],
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

  return workflowStatusCard;
};
