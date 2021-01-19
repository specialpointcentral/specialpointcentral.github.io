module.exports = {
  title: 'SPC的自由天空',
  description: 'SPC的自由天空，就是一个博客啦',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: 'reco',
  themeConfig: {
    locales: {
      '/': {
        recoLocales: {
          pagation: {
            prev: '上一页',
            next: '下一页',
            go: '前往',
            jump: '跳转至'
          }
        }
      }
    },
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
    recordLink: 'http://www.miitbeian.gov.cn/',
    cyberSecurityRecord: '皖公网安备 34100202000165号',
    cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34100202000165',
    // 项目开始时间，只填写年份
    startYear: '2019',
  },
  plugins: [
    ['@vuepress/nprogress'],
    ['md-enhance',
      {
        // 启用下角标功能
        sub: true,
        // 启用上角标
        sup: true,
        // 启用脚注
        footnote: true,
        // 启用 TeX 支持
        tex: true,
        // 启用代码演示
        demo: true,
      },
    ],
    ['@vuepress-reco/comments', 
      {
        solution: 'valine',
        options: {
          appId: 'KDS8Gw5GGqVsGP3T3cpbeHC7-9Nh9j0Va',
          appKey: 'jEGFwkHO4yBzgB7v95gxEgYN',
          placeholder: '留个脚印吧',
          avatar: 'mp',
          recordIP: 'true',
          enableQQ: 'true',
          visitor: true,
        }
      }
    ]
  ]
}