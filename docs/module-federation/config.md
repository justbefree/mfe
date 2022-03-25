# 配置文件解读


```js
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      runtime: false,
      name: "",
      filename: "",
      exposes: {},
      remotes: {},
      shared: []
    })
  ] 
}
```

## runtime

创建一个runtime的chunk名称

## name

应用名，全局唯一，不可冲突
## filename

对外提供的入口文件，一般为remoteEntry.js(可自行设置)

## exposes

提供了exposes的应用表明当前应用是一个Remote，exposes内的模块可以被其他Host引用，引用的方式为
```js
import(`{name}/${expose}`)
```

## remotes

提供了remotes的应用表明当前应用是一个Host，可以引用Remote应用内exposes的模块

示例
```js
remotes: {
  moduleA: `moduleA@https://example.com/remoteEntry.js`,
  // 通用格式为
  [name]: `${name}@https://example.com/${filename}`
}
```

## shared

这个配置的意义是主要防止项目出现多个公共依赖。

需要注意的是remotes的代码是不会被打包到APP内的，类似webpack的external；但是shared的代码应用自己是打包的


references:

 - [micro-frontends](https://micro-frontends.org/)