import type { Endpoints } from '@octokit/types';

import { getEmoji } from '../helpers.js';

type GetCommitResponse =
  Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response'];

export interface DeployCardParams {
  author: GetCommitResponse['data']['author'];
  branch: string | undefined;
  color: string;
  commit: GetCommitResponse;
  repoName: string;
  repoUrl: string;
  runId: string;
  runNum: string;
  sha: string;
  timestamp: string;
  title: string;
  titleSize?: 'Default' | 'Large';
}

export const populateCard = ({
  author,
  branch,
  color,
  commit,
  repoName,
  repoUrl,
  runId,
  runNum,
  sha,
  timestamp,
  title,
  titleSize = 'Default',
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
                },
              ],
              style: color,
              bleed: true,
            },
            {
              type: 'TextBlock',
              text: `[**Workflow Run #${runNum}**](${repoUrl}/actions/runs/${runId}) on [**${repoName}**](${repoUrl})`,
              wrap: true,
              size: 'Small',
              spacing: 'Small',
              weight: 'Default',
            },
            {
              type: 'TextBlock',
              text: `by **${commit.data.commit.author?.name ?? 'Unknown'}**${
                author?.login
                  ? ` ([**@${author.login}**](https://github.com/${author.login}))`
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
                          size: 'Small',
                          spacing: 'None',
                        },
                        {
                          type: 'TextBlock',
                          text: 'Commit:',
                          weight: 'Bolder',
                          size: 'Small',
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
                          size: 'Small',
                          spacing: 'None',
                        },
                        {
                          type: 'TextBlock',
                          text: `[**${sha.slice(0, 7)}**](${commit.data.html_url})`,
                          size: 'Small',
                          spacing: 'None',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  return workflowStatusCard;
};
