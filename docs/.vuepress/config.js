module.exports = {
  title: 'SPC的自由天空',
  description: 'SPC的自由天空，就是一个博客啦',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  theme: 'reco',
  themeConfig: {
    head: [
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    //logo: '/assets/img/logo.png',
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '时间轴', link: '/timeLine/', icon: 'reco-date' }
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
    // 自动生成侧栏
    sidebar: 'auto',
    // 页面滚动
    smoothScroll: true,
    // 最后更新时间
    lastUpdated: 'Last Updated',
    type: 'blog',
    huawei: false,
    // 备案号
    record: '皖ICP备17002097号-1',
    // 项目开始时间，只填写年份
    startYear: '2019',
  },
  plugins: [
    ['@vuepress/nprogress'],
    // ['@vuepress-reco/comments', {
    //   solution: 'vuess',
    //   options: {
    //     title: 'vuepress-theme-reco',
    //     platform: 'github-v4',
    //     owner: 'specialpointcentral',
    //     repo: 'specialpointcentral.github.io',
    //     clientId: 'bafa9288f91f1259ba98',
    //     clientSecret: '3f81ac450bbbb87a6dd22207b31b96393fefa58c',
    //   }
    // }]
  ]
}