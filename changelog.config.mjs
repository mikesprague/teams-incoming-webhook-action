// Changelog section mapping by Conventional Commit type.
// - Rename a heading: change `section`.
// - Hide a heading: set `hidden: true` for that type.
// - Show a heading: set `hidden: false` (or remove `hidden`).
// - Add support for a new type: add a new object to this array.

const types = [
  { type: 'feat', section: '✨ Features', hidden: false },
  { type: 'fix', section: '🐛 Fixes', hidden: false },
  { type: 'perf', section: '⚡ Performance Improvements', hidden: false },
  { type: 'revert', section: '⏪ Reverts', hidden: false },
  { type: 'docs', section: '📚 Documentation', hidden: false },
  { type: 'chore', section: '🔧 Miscellaneous Chores', hidden: false },
  { type: 'refactor', section: '🛠️ Code Refactoring', hidden: false },
  { type: 'build', section: '🏗️ Build System', hidden: false },
  { type: 'ci', section: '🔄 Continuous Integration', hidden: false },
  { type: 'test', section: '🧪 Tests', hidden: false },
];

const typeMap = new Map(types.map((entry) => [entry.type, entry]));

export default {
  writer: {
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
