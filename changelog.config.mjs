import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Changelog section mapping by Conventional Commit type.
// - Rename a heading: change `section`.
// - Hide a heading: set `hidden: true` for that type.
// - Show a heading: set `hidden: false` (or remove `hidden`).
// - Add support for a new type: add a new object to this array.

// read in this file: node_modules/conventional-changelog-conventionalcommits/src/templates/template.hbs
const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename =
  'node_modules/conventional-changelog-conventionalcommits/src/templates/template.hbs';
let headerTemplate = '';
try {
  headerTemplate = readFileSync(join(__dirname, __filename), 'utf-8');
} catch (error) {
  console.error(
    `Error reading template file at ${join(__dirname, __filename)}:`,
    error
  );
}

const defaultTemplate = `{{> header}}
{{#if noteGroups}}
{{#each noteGroups}}

### ⚠ {{title}}

{{#each notes}}
* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}
{{/each}}
{{/each}}
{{/if}}
{{#each commitGroups}}

{{#if title}}
### {{title}}

{{/if}}
{{#each commits}}
{{> commit root=@root}}
{{/each}}
{{/each}}

`;

const mainTemplate =
  headerTemplate.length > 0 && headerTemplate.includes('{{#each commits}}')
    ? `${headerTemplate}

`
    : defaultTemplate;

const types = [
  { type: 'build', section: '🏗️ Build System', hidden: false },
  { type: 'chore', section: '🔧 Chores', hidden: false },
  { type: 'ci', section: '🔄 Continuous Integration', hidden: false },
  { type: 'docs', section: '📚 Documentation', hidden: false },
  { type: 'feat', section: '✨ Features', hidden: false },
  { type: 'fix', section: '🐛 Fixes', hidden: false },
  { type: 'init', section: '🪄 Init', hidden: false },
  { type: 'perf', section: '⚡ Performance Improvements', hidden: false },
  { type: 'refactor', section: '🛠️ Code Refactoring', hidden: false },
  { type: 'revert', section: '⏪ Reverts', hidden: false },
  { type: 'style', section: '🎨 Style', hidden: false },
  { type: 'test', section: '🧪 Tests', hidden: false },
];

const typeMap = new Map(types.map((entry) => [entry.type, entry]));

export default {
  writer: {
    mainTemplate,
    transform(commit) {
      const commitType = (
        commit.revert ? 'revert' : commit.type || ''
      ).toLowerCase();
      const entry = typeMap.get(commitType);

      if (entry?.hidden) {
        return undefined;
      }

      const sectionTitle = entry?.section || commit.type;

      if (!sectionTitle) {
        return undefined;
      }

      return {
        type: sectionTitle,
        scope: commit.scope === '*' ? '' : commit.scope,
        subject: commit.subject,
        shortHash:
          typeof commit.hash === 'string'
            ? commit.hash.substring(0, 7)
            : commit.shortHash,
        references: commit.references || [],
        notes: (commit.notes || []).map((note) => ({
          ...note,
          title: 'BREAKING CHANGES',
        })),
      };
    },
    groupBy: 'type',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
  },
};
