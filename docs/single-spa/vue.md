# Create spa application based on Vue framework

## Installation

```bash
npm install --global create-single-spa

# or
yarn global add create-single-spa
```

当你跟着[single-spa官网](https://single-spa.js.org/docs/create-single-spa/)一步步去走的时候发现一脸懵逼，因为create-single-spa后面接的参数眼花缭乱，你心里会有一千个疑惑。别急，我来帮你捋一下

在创建微前端项目之前你需要了解有哪几种类型的微前端。

## Types of Microfrontends

[按照官网描述](https://single-spa.js.org/docs/microfrontends-concept#types-of-microfrontends)总共有三种类型的微前端应用可以创建

 - [single-spa applications](https://single-spa.js.org/docs/building-applications)
 - [single-spa parcels](https://single-spa.js.org/docs/parcels-overview)
 - [utility modules](https://single-spa.js.org/docs/recommended-setup#utility-modules-styleguide-api-etc)

 那对于一个完整的应用来说，有可能是一个或多个类型微前端的组合

还记得这张图吗？
<file-image name="spa"></file-image>
如果我们要实现微前端，言外之意我们至少需要两个项目，不然微在哪里呢？基于之前的描述，我们首先要创建一个root-config项目，这个是single-spa的控制器，因为其余的项目都是需要注册在这个控制器上，怎么做呢？

 ## create-single-spa

 ```bash
 # 首先执行命令
create-single-spa
# 之后会有一系列选项或输入，为了简单我直接贴出来

#? Directory for new project root-config
# 其中root-config是我给创建项目的文件夹名称，这个可以随便起

#? Select type to generate single-spa root config
# 这一步比较关键，要选择single-spa root config

#? Which package manager do you want to use? yarn
# 包管理工具，这个看个人喜好，我选择的是yaran

#? Will this project use Typescript? No
# 是否在项目中使用TS，这个看个人喜好

#? Would you like to use single-spa Layout Engine No
# 是否使用single-spa Layout引擎，这个看自己需求

#? Organization name (can use letters, numbers, dash or underscore) dullarjs
# 这个是组织名称，可以自己起一个

cd root-config
# 进入root-config目录

yarn start
# 启动项目
 ```

 这时候我们就创建好了single-spa的root-config项目，接下来我们再另外创建两个子应用，随便命名一个为flight-application另一个为train-application

 ```bash
 create-single-spa --dir train-application --framework vue --moduleType app-parcel
 create-single-spa --dir flight-application --framework vue --moduleType app-parcel
 ```

 到此我们完成了一个根节点项目root-config，以及另外两个子项目flight-application（端口号8081）、train-application（端口号8082）

 ## 完成微前端改造

 创建完上面三个项目，我们需要怎么做呢？

 首先，进入root-config项目，因为它才是整个微前端实现的核心关键点，我们要对其进行改造，打开src/index.ejs文件，添加下面代码

 ```js{6,7}
 <% if (isLocal) { %>
 <script type="systemjs-importmap">
   {
     "imports": {
       "@mfe-vue/root-config": "//localhost:9000/mfe-vue-root-config.js",
       "@mfe-vue/flight-application": "//localhost:8081/js/app.js", // 新增
       "@mfe-vue/train-application": "//localhost:8082/js/app.js" // 新增
     }
   }
 </script>
 <% } %>

 ```

 然后在打开mfe-vue-root-config.js文件，新增以下代码
```js
registerApplication({
  name: "@mfe-vue/flight-application",
  app: () => System.import("@mfe-vue/flight-application"),
  activeWhen: ["/flight"]
});

registerApplication({
  name: "@mfe-vue/train-application",
  app: () => System.import("@mfe-vue/train-application"),
  activeWhen: ["/train"]
});
```

然后打开浏览器访问root-config，并修改访问路径为/flight不出意外这时候你会发现浏览器出现一下错误

```js
WebSocketClient.js:16 Refused to connect to 'ws://192.168.31.175:8081/ws' 
because it violates the following Content Security Policy directive: 
"connect-src https: localhost:* ws://localhost:*".
```
这时候可以到index.ejs文件中把以下代码注释掉

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https: localhost:*; script-src 'unsafe-inline' 'unsafe-eval' https: localhost:*; connect-src https: localhost:* ws://localhost:*; style-src 'unsafe-inline' https:; object-src 'none';">
```
刷新一下页面发现还有错误，这点很关键
<file-image name="error"></file-image>

解决方案是需要到vue.config.js配置文件内，把output的target的值改为system
```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system"
    }
  },
  devServer: {
    port: 8082,
  },
});
```
修改完后重新启动flight-application和train-application这两个项目，重启后刷新页面，这样就OK了