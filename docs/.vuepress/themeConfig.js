/*
* @Author: Just be free
* @Date:   2020-07-10 14:04:39
* @Last Modified by:   Just be free
* @Last Modified time: 2022-03-17 17:02:14
* @E-mail: justbefree@126.com
*/
module.exports = {
  nav: [
    { text: "Home", link: "/" },
    { text: "module-federation", link: "/module-federation/" },
    { text: "single-spa", link: "/single-spa/" },
    { text: "mfe", link: "/mfe/" }
  ],
  sidebar: {
    "/module-federation/": [
      {
        title: "概念",
        collapsable: true,
        children: [
          ["background.md", "背景"]
        ]
      },
      {
        title: "实战",
        collapsable: true,
        children: [
          ["vue.md", "module federation Vue"] 
        ]
      },
      {
        title: "深入",
        collapsable: true,
        children: [
          ["ajax.md", "异步请求"],
          ["router.md", "路由"],
          ["advanced.md", "advanced"],
          ["library.md", "第三方库引用"],
          ["style.md", "样式"]
        ]
      }
    ],
    "/single-spa/": [
      {
        title: "学习",
        collapsable: true,
        children: [
          ["basic.md", "基础"],
          ["advanced.md", "深入"]
        ]
      },
      {
        title: "实战",
        collapsable: true,
        children: [
          ["vue.md", "create-single-spa"]
        ]
      }
    ],
    "/mfe/": [
      {
        title: "定义",
        collapsable: true,
        children: [
          ["define.md", "single-spa"]
        ]
      }
    ]
  },
  lastUpdated: "Last Updated",
  // Assumes GitHub. Can also be a full GitLab url.
  repo: "yny-fe/wiki",
  // Customising the header label
  // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
  repoLabel: 'Contribute!',

  // Optional options for generating "Edit this page" link

  // if your docs are in a different repo from your main project:
  docsRepo: "yny-fe/wiki",
  // if your docs are not at the root of the repo:
  docsDir: "docs",
  docsBranch: "main",
  // defaults to false, set to true to enable
  editLinks: true,
  // custom text for edit link. Defaults to "Edit this page"
  editLinkText: "Help us improve this page!"
};