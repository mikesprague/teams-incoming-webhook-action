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
  titleSize = 'Large',
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
              text: `**Workflow Run #${runNum}** on [${repoName}](${repoUrl})`,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `by ${commit.data.commit.author?.name ?? 'Unknown'}${
                author?.login ? ` (@${author.login})` : ''
              } on ${timestamp}`,
              wrap: true,
              size: 'Small',
              spacing: 'None',
            },
            {
              type: 'FactSet',
              facts: [
                {
                  title: 'Branch',
                  value: branch,
                },
                {
                  title: 'Commit',
                  value: `${sha.slice(0, 7)}`,
                },
              ],
            },
            {
              type: 'ActionSet',
              actions: [
                {
                  type: 'Action.OpenUrl',
                  title: 'View Workflow Run',
                  url: `${repoUrl}/actions/runs/${runId}`,
                  style: 'default',
                },
                {
                  type: 'Action.OpenUrl',
                  title: 'View Commit Changes',
                  url: commit.data.html_url,
                  style: 'default',
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
