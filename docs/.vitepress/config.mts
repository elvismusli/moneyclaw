import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'MoneyClaw',
  description: 'Real payments for OpenClaw agents.',
  base: '/moneyclaw/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/moneyclaw/crab.png' }],
    ['meta', { property: 'og:title', content: 'MoneyClaw' }],
    ['meta', { property: 'og:description', content: 'Real payments for OpenClaw agents.' }],
    ['meta', { property: 'og:image', content: 'https://elvismusli.github.io/moneyclaw/og.png' }],
    ['meta', { name: 'theme-color', content: '#ef6a3b' }],
  ],
  themeConfig: {
    logo: '/crab.png',
    siteTitle: 'MoneyClaw',
    nav: [
      { text: 'Start', link: '/getting-started' },
      { text: 'Quickstart', link: '/openclaw-quickstart' },
      { text: 'API', link: '/api-overview' },
      { text: 'Skill', link: '/skill' },
      { text: 'Examples', link: '/examples' },
      { text: 'GitHub', link: 'https://github.com/elvismusli/moneyclaw' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'OpenClaw Quickstart', link: '/openclaw-quickstart' },
          { text: 'API Overview', link: '/api-overview' },
          { text: 'Skill', link: '/skill' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'Trust',
        items: [
          { text: 'Security Model', link: '/security-model' },
          { text: 'Merchant Flows', link: '/merchant-flows' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/elvismusli/moneyclaw' },
    ],
    footer: {
      message: 'Public docs and skill layer for MoneyClaw.',
      copyright: 'Copyright © 2026 MoneyClaw',
    },
    search: {
      provider: 'local',
    },
  },
});
