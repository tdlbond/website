import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '拔萝卜的兔子',
  description: '拔萝卜的兔子的site，JavaScript、css、html、vue...',
  cleanUrls: false,
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'keywords', content: 'html,css,javascript,vue,jsx' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon/favicon-32x32.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/document/javascript' },
      { text: 'Vitepress Examples', link: '/demo/markdown-examples' }
    ],

    sidebar: {
      '/document/': [
        {
          text: '语言',
          items: [
            { text: 'JavaScript', link: '/document/article/javascript' },
            { text: '性能优化', link: '/document/article/performance' },
            { text: '浏览器', link: '/document/article/browser' },
            { text: '数据结构', link: '/document/article/dataStructure' },
            { text: '算法', link: '/document/article/algorithm' },
            { text: 'Vue', link: '/document/article/vue' },
            { text: 'Typescript', link: '/document/article/typescript' },
            { text: 'Css', link: '/document/article/css' },
            {
              text: '软件设计师教程',
              link: '/document/article/softwareArchitect'
            }
          ]
        },
        {
          text: '日常开发的坑点',
          items: [{ text: 'JavaScript', link: '/document/trouble/javascript' }]
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

    socialLinks: [{ icon: 'github', link: '' }],

    outlineTitle: '页面导航'
  },

  markdown: {
    lineNumbers: true
  }
})
