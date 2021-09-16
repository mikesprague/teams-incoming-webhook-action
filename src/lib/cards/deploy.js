exports.deployCard = function ({
  title,
  color = '17a2b8',
  commit,
  branch,
  author,
  runNum,
  runId,
  repoName,
  sha,
  repoUrl,
  timestamp,
}) {
  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: title,
    themeColor: color,
    title: title,
    sections: [
      {
        activityTitle: `**Workflow Run [#${runNum}](${repoUrl}/actions/runs/${runId})** on [${repoName}](${repoUrl})`,
        facts: [
          {
            name: 'Branch:',
            value: `[${branch}](${repoUrl}/tree/${branch})`,
          },
          {
            name: 'Commit',
            value: `[${sha.substr(0, 7)}](commit.data.commit.html_url)`,
          },
        ],
        activitySubtitle: `by ${commit.data.commit.author.name} [(@${author.login})](${author.html_url}) on ${timestamp}`,
      },
    ],
    potentialAction: [
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/actions/runs/${runId}`],
        '@type': 'ViewAction',
        name: 'View Workflow Run',
      },
      {
        '@context': 'http://schema.org',
        target: [commit.data.html_url],
        '@type': 'ViewAction',
        name: 'View Commit Changes',
      },
    ],
  };
  return messageCard;
};
