# Build a ferderated App based on Vue


## Before you start
::: warning 注意
由于Vue-CLI@5.x之前的版本内置的webpack版本均是5.x以下，5以下的版本是不包含[module federation](https://webpack.js.org/concepts/module-federation/)功能，所以为了节省不必要的麻烦（基于Vue-CLI5之前的版本自己做webpack升级很折腾，不信你可以试试），我们直接升级最新的[@vue/cli 5.0.0-rc.1](https://next.cli.vuejs.org/config/#vue-config-js)，Vue CLI 5.x以后的版本，内置的是[Webpack@5.x](https://webpack.js.org)的版本，这样能给我们剩下不少时间
:::

## Upgrade @vue-cli to latest

这个步骤自行查看[官方安装文档](https://next.cli.vuejs.org/guide/installation.html)，需要注意的是，Vue CLI4.x版本要求nodejs的版本要v8.9及以上（推荐v10+）

## Create 4 projects

为了尽可能模拟Vue不同版本之间的模块联邦，我们创建4个Vue项目，分别是hotel、train、flight、platform

```js

// 1. 创建一个空文件夹并进入

mkdir module-federation && cd module-federation

// 2. 初始化lerna

lerna init

// 为了更加形象，我把packages目录改为applications
//另外也需要在lerna.json里面修改一下对应的packages字段

// 3. 创建项目


vue create hotel // 创建hotel项目，default Vue2
vue create train // 创建train项目，Vue2 + TypeScript, steps follow below

// 1. Manually select features
// 2. toggle a
// 3. 2.x
// 4. Use class-style component syntax? (Y/n) Y
// 5. Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n) Y
// 6. Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) n
// 7. Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass) 
// 8. Pick a linter / formatter config: ESLint + Prettier 
// 9. Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection) <a> toggle
// 10. Pick a unit testing solution: Jest
// 11.  Pick an E2E testing solution: (Use arrow keys) Cypress (Chrome only) 
// 12.  Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys) In dedicated config files 
// 13.  Save this as a preset for future projects? (y/N) y

vue create flight // 创建flight项目，default Vue3

vue create platform // 创建platform项目，具体步骤参考train项目的步骤，唯一的区别是选择Vue3版本

// 创建完以上项目后，记得在每个项目内把package.json对应name字段修改为 
// @applications/${name}，name值对应fligjht、train、hotel、platform的一个

```

::: tip Lerna
为了方便统一管理多个项目，我们使用[lerna](https://lerna.js.org/)来完成项目初始化，具体使用可以参考[官方文档](https://github.com/lerna/lerna#readme)，这里不做详细介绍
:::

## Set npm client

创建完项目以后，修改lerna.json新增"npmClient"属性并设置值为"yarn"

然后执行命令
```js
lerna bootstrap

// 输出结果为
// lerna notice cli v4.0.0
// lerna info Bootstrapping 4 packages
// lerna info Symlinking packages and binaries
// lerna success Bootstrapped 4 packages
```

## Install http-server
为每个项目安装http-server，并修改每个项目的package.json，新增"start"属性，并设置值为"http-server -c-1 -p 8081 ./dist"

```js
lerna add http-server --dev
```

## Add scripts for root package.json

在根目录下的package.json文件内新增脚本命令

```json
"scripts": {
  "start": "lerna run --scope @applications/* --parallel start",
  "build": "lerna run --scope @applications/* build",
  "serve": "lerna run --scope @applications/* --parallel serve",
  "clean": "lerna run --scope @applications/* --parallel clean"
}
```

## Bootstraping your app

每个项目下src目录下都有main.ts或main.js默认启动文件（后面方便统一称为main.js），现在需要做一点小改动。
在main.js的同目录下创建bootstrap.js，文件内容为main.js里面的内容，然后再把main.js的内容改为
```js
// main.js
import("./bootstrap");
```


## Modify webpack config

在每个项目里面配置（vue.config.js）新增webpack配置项
``` js
const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:8080/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "moduleName",
        filename: "remoteEntry.js",
        exposes: {
        },
        remotes: {
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 8081
  }
});
```
具体的配置详情可以参考下面的案例，也可以直接查看[完整案例](https://github.com/justbefree/module-fereation-vue)
::: details Flight's vue.config.js
```js
const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:8081/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "flight",
        // library: { type: "umd", name: "flight" },
        // library: { type: "umd" },
        filename: "remoteEntry.js",
        exposes: {
          "./vue2": "./node_modules/vue/dist/vue",
          "./flightList": "./src/components/flightList",
          "./vue2Button": "./src/components/vue2Button",
          "./vue2Count": "./src/components/vue2Count"
        },
        remotes: {
          // hotel: "hotel@http://localhost:8082/remoteEntry.js",
          train: "train@http://localhost:8083/remoteEntry.js",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 8081
  }
});
```
:::

::: details Hotel's vue.config.js
```js
const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:8082/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "hotel",
        // library: { type: "umd", name: "hotel" },
        // library: { type: "umd" },
        filename: "remoteEntry.js",
        exposes: {
          "./hotelList": "./src/components/hotelList"
        },
        // remotes: {
        //   flight: "flight@http://localhost:8081/remoteEntry.js",
        //   hotel: "hotel@http://localhost:8082/remoteEntry.js",
        //   train: "train@http://localhost:8083/remoteEntry.js",
        // },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 8082
  }
});
```
:::

::: details Platform's vue.config.js
```js
const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: "http://localhost:8080/",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "platform",
        // library: { type: "var", name: "platform" },
        filename: "remoteEntry.js",
        exposes: {},
        remotes: {
          flight: "flight@http://localhost:8081/remoteEntry.js",
          hotel: "hotel@http://localhost:8082/remoteEntry.js",
          train: "train@http://localhost:8083/remoteEntry.js",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 8080,
  },
});

```
:::

::: details Train's vue.config.js
```js
const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:8083/",
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "train",
        // library: { type: "umd", name: "train" },
        // library: { type: "umd" },
        filename: "remoteEntry.js",
        exposes: {
          "./trainList": "./src/components/trainList",
        },
        // remotes: {
        //   flight: "flight@http://localhost:8081/remoteEntry.js",
        //   hotel: "hotel@http://localhost:8082/remoteEntry.js",
        //   train: "train@http://localhost:8083/remoteEntry.js",
        // },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 8083,
  },
});

```
:::

## Give it a try

现在就完成了整个项目，现在可以启动了

```js
// 在项目跟目录文件夹内执行
yarn serve
// 这时候访问所有的项目都启动了，启动信息如下
// http://localhost:8080 platform
// http://localhost:8081 flight
// http://localhost:8082 hotel
// http://localhost:8083 train
```

## Structure
<img :src="$withBase('/imgs/module-federation-vue.png')"/>




