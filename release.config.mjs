export default {
  branches: [
    'main',
    { name: 'dev', prerelease: 'dev' }
  ],
  tagFormat: 'v${version}',
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { type: 'ci', release: false },
        { type: 'chore', release: false }
      ]
    }],
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits'
    }],
    ['@semantic-release/npm', {
      npmPublish: false
    }],
    ['@semantic-release/github', {
      successComment: false,
      failComment: false
    }],
    ['@semantic-release/git', {
      assets: ['package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ]
}