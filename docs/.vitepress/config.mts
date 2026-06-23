import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'web-message',
  description: 'A lightweight browser-side message/toast library.',
  base: '/web-message/',
  lang: 'en-US',
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#2f6fed' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/install' },
      { text: 'API', link: '/guide/api' },
      { text: 'Demo', link: '/guide/demo' },
      { text: 'GitHub', link: 'https://github.com/xcy960815/web-message' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Install', link: '/guide/install' },
          { text: 'API', link: '/guide/api' },
          { text: 'Online Demo', link: '/guide/demo' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xcy960815/web-message' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © xcy960815',
    },
  },
})
