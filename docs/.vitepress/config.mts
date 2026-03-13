import { defineConfig } from 'vitepress';

const siteUrl = process.env.DOCS_SITE_URL ?? 'https://elvismusli.github.io/moneyclaw';
const base = process.env.DOCS_BASE ?? '/moneyclaw/';

export default defineConfig({
  title: 'MoneyClaw',
  description: 'Real payments for OpenClaw agents.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}crab.png` }],
    ['meta', { property: 'og:title', content: 'MoneyClaw' }],
    ['meta', { property: 'og:description', content: 'Real payments for OpenClaw agents.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: `${siteUrl}/` }],
    ['meta', { property: 'og:image', content: `${siteUrl}/og-docs.png` }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: 'MoneyClaw' }],
    ['meta', { property: 'twitter:description', content: 'Real payments for OpenClaw agents.' }],
    ['meta', { property: 'twitter:image', content: `${siteUrl}/og-docs.png` }],
    ['meta', { name: 'theme-color', content: '#ef6a3b' }],
  ],
  themeConfig: {
    logo: '/crab.png',
    siteTitle: 'MoneyClaw',
    nav: [
      { text: 'Start', link: '/getting-started' },
      { text: 'Quickstart', link: '/openclaw-quickstart' },
      { text: 'Trust', link: '/security-model' },
      { text: 'Skill', link: '/skill' },
      { text: 'Website', link: 'https://moneyclaw.ai' },
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
      {
        text: 'Assets',
        items: [
          { text: 'Examples', link: '/examples' },
          { text: 'GitHub Repo', link: 'https://github.com/elvismusli/moneyclaw' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/elvismusli/moneyclaw' },
    ],
    footer: {
      message: 'Public docs, skill files, and trust model for MoneyClaw.',
      copyright: 'Copyright © 2026 MoneyClaw',
    },
    search: {
      provider: 'local',
    },
  },
});
