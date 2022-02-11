
## 设计动机(Motivation)

多个独立的打包构建组成一个应用。这些独立的打包构建应该是两两之间没有依赖，这样他们可以独立部署。
这就是大家所熟知的微前端，但是模块联邦不仅限于微前端。

::: tip 原文
Multiple separate builds should form a single application. These separate builds should not have build dependencies between each other, so they can be developed and deployed individually.
This is often known as Micro-Frontends, but is not limited to that.
:::

## 名词解释

### A host

在页面加载过程中（当 onLoad 事件被触发）最先被初始化的 webpack 构建

:::tip 原文
a Webpack build that is initialized first during a page load (when the onLoad event is triggered)
:::

### A remote

被 “host” 消费“部分”的另一个 webpack 构建

::: tip 原文
another Webpack build, where part of it is being consumed by a **“host”**
:::


### Bidirectional（双向的）-hosts

当一个 bundle 或者 webpack build 作为一个 host 或 remote 运行时，它要么消费其他应用，要么被其他应用消费——均发生在运行时(runtime)

:::tip 原文
when a bundle or Webpack build can work as a host or as a remote. Either consuming other applications or being consumed by others - at runtime
:::

### container

 - 使用模块联邦，每个"部分"（前端组件、逻辑组件等）将是一个单独的build。 这些构建被编译为“容器Container”。

 - 容器Container可以被应用程序或其他容器引用。

 - 在这种关系中，容器是“remote”，容器的使用者是“host”。 “romote”可以将模块**暴露（exposes）**给“host”。 “host”可以使用此类模块。 它们被称为“远程模块（remote modules）”。

 - 通过使用单独的构建，我们可以获得整个系统的良好构建性能。

::: tip 原文
Each build act as container and also consumes other build as containers. This way each build is able to access any other exposed module by loading it from its container.

Shared modules are modules that are both, overridable and provided as overrides to nested container. They usually point to the same module in each build, e. g. the same library.
:::


::: tip
注意，每个独立的应用都有自己的代码仓库，也可以独立部署，也都可以在自己的SPA应用中独立运行
:::

这些应用都是双向的**hosts**，任何一个应用先加载，然后成为一个**host**，当你改变路由时候，其它federated modules被动态加载。然而当你刷新页面的时候，第一个被加载的就会成为一个**host**

怎么理解呢？举个例子
当你打开一个应用并进入着陆页，我们称为home页，这时候home页变成了**host**，然后你接着访问about页面，这时候host（home页面）会到另一个独立的应用动态加载about页面，但是注意，加载about页面并不需要加载主程序的entry point，也不是整个应用，而是仅仅包含about页面这个页面所需的字符。这个时候，如果我在about页面刷新浏览器，这时候about页面变成了**host**。所有的应用既是**remote**又是**host**，也即可被消费，也能消费其他模块（federated module）。



## 参考

  - [webpack-5-module-federation-a-game-changer-in-javascript-architecture](https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture)
  - [module-federation-motivation](https://github.com/webpack/changelog-v5/blob/master/guides/module-federation.md)

  - [Module federation 原理研究](https://blog.towavephone.com/module-federation-principle-research/)