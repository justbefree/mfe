# 常见错误
Uncaught TypeError: Cannot set properties of undefined (setting './node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./src/App.vue?vue&type=script&lang=js')
    at webpackHotUpdate_applications_hotel



## 错误1
```js
Conflict: Multiple assets emit different content to the same filename index.html

ERROR in Conflict: Multiple assets emit different content to the same filename index.html

webpack compiled with 1 error

```

解决：不要把index.html放到public文件夹下面，删掉或者改个名字就好了；另外也可以专门建一个template目录，把模板文件单独放进去
[参考](https://github.com/sorrycc/roadhog/issues/709)

## 错误2

```js
Uncaught Error: Shared module is not available for eager consumption: 6196
```

解决：增加bootstrap.js 通过 index.js 异步加载页面
主要原因是 remote 暴露的 js 文件需要优先加载，如果 bootstrap.js 不是一个异步逻辑，在 import User 的时候，会依赖 app 的 app.js，如果直接在 index.js 执行，app 的 app.js 根本没有加载，所以会有问题

 - [参考](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption)