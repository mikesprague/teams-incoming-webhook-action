# teams-incoming-webhook-action

[![Build and Test](https://github.com/mikesprague/teams-incoming-webhook-action/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/mikesprague/teams-incoming-webhook-action/actions/workflows/build-and-test.yml)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=406118991)

Sends an [AdaptiveCard](https://adaptivecards.microsoft.com/) notification to an [MS Teams Incoming Webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) from a GitHub Action Workflow

This action requires a secret to be set up with your Teams Incoming Webhook URL named `MS_TEAMS_WEBHOOK_URL` ([official docs for creating secrets in your repo](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository))

- [Inputs](#inputs)
- [Example Usage](#example-usage)
  - [Simple Notification](#simple-notification)
  - [Simple Notification w/ Large Title](#simple-notification-w-large-title)
  - [Workflow Status Notifications](#workflow-status-notifications)
    - [Workflow Status w/ Message](#workflow-status-w-message)
    - [Workflow Status w/ Commit Message](#workflow-status-w-commit-message)
    - [Status Notification](#status-notification)
    - [Cancel Notification](#cancel-notification)
    - [Failure Notification](#failure-notification)
    - [Success Message](#success-message)
    - [Kitchen Sink Example](#kitchen-sink-example)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Testing](#testing)
  - [Code Quality](#code-quality)
  - [TypeScript Configuration](#typescript-configuration)

## Inputs

- `github-token`
  - **required:** true
  - **type:** string
  - **description:** GitHub Token for API operations (see examples for how to reference)
  - **example:** `github-token: ${{ github.token }}`
- `webhook-url`
  - **required:** true
  - **type:** string
  - **description:** MS Teams Incoming Webhook URL
  - **example:** `webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}`
- `title`
  - **required:** true
  - **type:** string
  - **description:** Message title or heading
  - **example:** `title: "Test Message Heading"`
- `title-size`
  - **required:** false
  - **type:** string
  - **default:** `"Default"`
  - **description:** Size of the title text - accepts `Default`, `Large` as values
  - **example:** `title-size: "Large"`
- `message`
  - **required:** false
  - **type:** string
  - **default:** `""`
  - **description:** Optional message body; when `deploy-card` is `true`, this appears above the deployment details
  - **example:** `message: "This is some test message content for a simple notification"`
- `color`
  - **required:** false
  - **type:** string
  - **default:** `"default"`
  - **description:** Background color of the heading in the message - accepts `default`, `info`, `success`, `failure`, `warning` as values
  - **example:** `color: "info"`
- `deploy-card`
  - **required:** false
  - **type:** boolean
  - **default:** `false`
  - **description:** Sends a workflow notification that is built dynamically from commit and repo info
  - **example:** `deploy-card: true`
- `show-commit-message`
  - **required:** false
  - **type:** boolean
  - **default:** `false`
  - **description:** Shows the first line of the commit message after the hash on deploy cards
  - **example:** `show-commit-message: true`
- `timezone`
  - **required:** false
  - **type:** string
  - **default:** `"America/New_York"`
  - **description:** Timezone to use for timestamps in messages
  - **example:** `timezone: "Europe/Rome"`

## Example Usage

This action was built with the intention of sending workflow status notifications but also supports a simple message style

### Simple Notification

The following sends a simple notification with a title and message

```yaml
- name: Send simple notification
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    title: 'Simple Notification'
    message: 'This is an example of a simple notification with a title and a body'
```

![Simple Notification Example](./readme-images/simple-notification.png 'Simple Notification Example')

### Simple Notification w/ Large Title

The following sends a simple notification with a title and message

```yaml
- name: Send Test Simple Notification w/ Large Title
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    title: 'Simple Notification w/ Large Title'
    title-size: 'Large'
    message: 'This is an example of a simple notification with a large title and a body'
```

![Simple Notification w/ Large Title Example](./readme-images/simple-notification-large-title.png 'Simple Notification w/ Large Title Example')

### Workflow Status Notifications

The following examples show how to send notifications based on your workflow status

#### Workflow Status w/ Message

```yaml
- name: Send Workflow Status Notification w/ Message
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Workflow Status w/ Message'
    message: 'This is an example of a workflow notification with a custom message included in the card body'
```

![Workflow Status w/ Message Example](./readme-images/deploy-with-message.png 'Workflow Status w/ Message Example')

#### Workflow Status w/ Commit Message

```yaml
- name: 📤 Send Workflow Status Notification w/ Commit Message
  uses: ./
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ env.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: "Workflow Status w/ Commit Message"
    show-commit-message: true
```

![Workflow Status w/ Commit Message](./readme-images/deploy-with-commit-message.png 'Workflow Status w/ Commit Message Example')

#### Status Notification

Include as first step in workflow to notify workflow run has started

```yaml
- name: Send Workflow Status Notification
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Workflow Status'
    color: 'info'
```

![Workflow Status/Info Example](./readme-images/deploy-info.png 'Workflow Status/Info Example')

#### Cancel Notification

Include anywhere in steps to notify workflow run has been cancelled

```yaml
- name: Send Workflow Cancelled Notification
  if: ${{ cancelled() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Workflow Cancelled'
    color: 'warning'
```

![Workflow Cancel Example](./readme-images/deploy-cancel.png 'Workflow Cancel Example')

#### Failure Notification

Include anywhere in steps to notify when a workflow run fails

```yaml
- name: Send Workflow Failure Notification
  if: ${{ failure() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Workflow Failed'
    color: 'failure'
```

![Workflow Failure Example](./readme-images/deploy-fail.png 'Workflow Failure Example')

#### Success Message

Include anywhere in steps to notify when workflow run is successful

```yaml
- name: Send Workflow Success Notification
  if: ${{ success() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Workflow Successful'
    color: 'success'
```

![Workflow Success Example](./readme-images/deploy-success.png 'Workflow Success Example')

#### Kitchen Sink Example

Sends a deploy card with all options enabled - large title, custom message, color set, and commit message visible

```yaml
- name: 🧪 Kitchen Sink Test
  uses: ./
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ env.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: "Kitchen Sink Test"
    title-size: "Large"
    message: "This is a kitchen sink test sending a deploy card with all options set including a custom message, color, large title, and showing the commit message."
    color: "info"
    show-commit-message: true
```

![Kitchen Sink Example](./readme-images/kitchen-sink.png 'Kitchen Sink Example')

## Development

This project uses modern TypeScript with strict type checking and comprehensive test coverage.

### Prerequisites

- Node.js >= 24.x
- npm >= 11.x

### Setup

```bash
npm install
```

### Testing

The project uses [Vitest](https://vitest.dev/) for testing with comprehensive coverage requirements:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

**Coverage Thresholds:**

- Lines: 98%
- Functions: 100%
- Branches: 92%
- Statements: 98%

**Current Coverage Report (v1.17.0):**

```bash
  ✓ src/lib/helpers.test.ts (2 tests) 2ms
 ✓ src/lib/cards/simple.test.ts (1 test) 3ms
 ✓ src/lib/cards/deploy.test.ts (4 tests) 4ms
 ✓ src/index.test.ts (6 tests) 47ms

 Test Files  4 passed (4)
      Tests  13 passed (13)
   Start at  13:43:44
   Duration  234ms (transform 141ms, setup 0ms, import 162ms, tests 56ms, environment 0ms)

 % Coverage report from v8
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|-------------------
All files      |     100 |      100 |     100 |     100 |
 src           |     100 |      100 |     100 |     100 |
  index.ts     |     100 |      100 |     100 |     100 |
 src/lib       |     100 |      100 |     100 |     100 |
  helpers.ts   |     100 |      100 |     100 |     100 |
 src/lib/cards |     100 |      100 |     100 |     100 |
  deploy.ts    |     100 |      100 |     100 |     100 |
  simple.ts    |     100 |      100 |     100 |     100 |
---------------|---------|----------|---------|---------|-------------------
```

### Code Quality

The project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Check code quality
npm run lint

# Type check
npm run check

# Build the action
npm run build
```

### TypeScript Configuration

The project uses TypeScript 5.9+ with:

- ES2023 target for modern JavaScript features
- Strict mode enabled with balanced strictness flags
- ESM module system with bundler resolution
- Top-level await support
