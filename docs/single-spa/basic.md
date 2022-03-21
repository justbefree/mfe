# 微前端基础

在single-spa之前，我们怎么实现多个独立项目聚合？答案很明显，iframe，对于iframe我们再熟悉不过，如果是在PC端使用iframe好像还没有想象的那么糟糕，但是现在移动互联时代，移动端应用已经成为主流，如果依然沿用iframe的方案去解决移动时代下的大型web应用，真的是一件糟心的事儿。

## iframe有哪些弊端

 - 每次进来都要加载，状态不能保留
 - DOM 结构不共享。比如在子应用里面，有个modal弹框，弹框的全局遮罩层仅仅覆盖iframe内区域，无法覆盖浏览器可视区范围
 - 无法跟随浏览器前进后退
 - 天生的硬隔离，无法与主应用进行资源共享，交流也很困难

 references:

  - [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)


 ## SPA完美解决上面的问题

 - 切换路由就是切换页面组件，组件的挂载和卸载非常快
 - 单页应用肯定共享 DOM
 - 前端控制路由，想前就前，想后就后
 - React 通信有 Redux，Vue 通信有 Vuex，可与 App 组件进行资源共享，交流很爽

 ::: warning 注意
注意我们上面所说的SPA还不是single-spa，我们说的SPA是single page application的简称
 :::

 ## 微前端的由来

 所以我们就会想，有没有一种在SPA之上的框架来控制一堆SPA的应用。这就是微前端的由来，所以就有了single-spa
 ::: tip 为什么叫single-spa？
 这点我们真的不用纠结，官方给了说明，[isnt-single-spa-sort-of-a-redundant-name](https://single-spa.js.org/docs/getting-started-overview#isnt-single-spa-sort-of-a-redundant-name)。我们就简单的理解为凌驾于SPA应用之上的框架来管理SPA应用的技术
 :::
所以，single-spa跟SPA之间的关系类似下图
 <file-image name="spa"></file-image>
可以简单的理解为single-spa就是一个控制容器，其它的应用可以通过注册的方式把自己挂载到容器上，但同时每个应用又有自己独立的路由，状态，仓库，打包流等等。


