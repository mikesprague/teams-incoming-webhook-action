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
  pullRequests = null,
}) {
  const hasPullRequest =
    pullRequests && pullRequests.data && pullRequests.data.length;
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
            value: `${branch}`,
          },
          {
            name: 'Commit',
            value: `${sha.substr(0, 7)}`,
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
        target: [
          hasPullRequest ? pullRequests.data[0].html_url : commit.data.html_url,
        ],
        '@type': 'ViewAction',
        name: hasPullRequest ? 'View Pull Request' : 'View Commit Changes',
      },
    ],
  };
  return messageCard;
};
