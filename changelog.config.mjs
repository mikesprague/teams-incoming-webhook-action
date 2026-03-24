import { mainTemplate } from './node_modules/conventional-changelog-conventionalcommits/src/templates.js';

// Changelog section mapping by Conventional Commit type.
// - Rename a heading: change `section`.
// - Hide a heading: set `hidden: true` for that type.
// - Show a heading: set `hidden: false` (or remove `hidden`).
// - Add support for a new type: add a new object to this array.

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
{{> footer}}

`;

const template =
  mainTemplate.length > 0 && mainTemplate.includes('{{#each commits}}')
    ? `;${mainTemplate}

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
    template,
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
