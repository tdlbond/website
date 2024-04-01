import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '拔萝卜的兔子',
  description: '拔萝卜的兔子 site',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/document/javascript' },
      { text: 'Vitepress Examples', link: '/demo/markdown-examples' }
    ],

    sidebar: {
      '/document/': [
        {
          text: '语言',
          items: [{ text: 'JavaScript', link: '/document/javascript' }]
        }
      ],
      '/demo/': [
        {
          text: 'Vitepress Examples',
          items: [
            { text: 'Markdown Examples', link: '/demo/markdown-examples' },
            { text: 'Runtime API Examples', link: '/demo/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: '' }]
  },

  markdown: {
    lineNumbers: true
  }
})
