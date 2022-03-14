# Microfrontends


## Concept
A microfrontend is a microservice that exists within a browser.

Microfrontends are sections of your UI, often consisting of dozens of components, that use frameworks like React, Vue, and Angular to render their components. Each microfrontend can be managed by a different team and may be implemented using its own framework. It is practical and suggested to use just one framework for all your microfrontends, although you may add additional frameworks when migrating or when experimenting.

Each microfrontend has its own git repository, its own package.json file, and its own build tool configuration. As a result, each microfrontend has an independent build process and an independent deploy / CI. This generally means that each repo has fast build times.

::: tip 参考译文

微前端是一种在浏览器里面运行的微服务。

微前端是指UI的一部分区域，经常是由好多组件组成在一起，像是前端框架react，Vue，Angular使用render去渲染它们的组件。每一个微前端可以由不同的开发团队去维护管理，每个团队也可以有自己的框架。但是我们还是建议统一使用一个框架去做微前端，尽管你可能需要额外的框架去升级或者去实验。

每一个微前端项目有自己的git仓库，也有自己的package.json文件，当然也有自己的打包配置。总之，每一个微前端都有独立的打包进程以及独立的发版流程。这也就意味着每一个仓库都能独立快速编译。
:::

## Comparison to Microservices

Microservices are backend services that run in their own operating system process, control their own databases, and communicate with each other over the network.

Compare that to microfrontends that all exist within a single browser tab: all browser JavaScript within a tab exists in a single operating system process (and even thread!). Browser JavaScript generally does not directly access databases, and communication within a browser tab happens in-memory instead of over the network.

So what do they have in common???

Independent builds and deployments. Think of the DOM as the shared resource that your microfrontends are owning. One microfrontend's DOM should not be touched by another microfrontend, similar to how one backend microservice's database should not be touched by any microservice except the one that owns/controls it.

::: tip 参考译文
微服务是后端服务并且运行在它们自己的系统进程内，控制它们自己的数据库，并且跟其他服务通过网络信息交流。

跟微服务比起来，微前端所有的服务都在同一个浏览器的同一个tab页面内，并且在同一个系统进程内。JavaScript运行在浏览器内通常不需要权限访问数据库，而且微前端之间的交互通常是在同一个tab内存内而不是通过网络。

所以说他们有什么共同点？

都有独立的打包和发版机制。想想一下DOM作为他们自己的共享资源。一个微前端的DOM不应该被另一个微前端所控制，就像是一个微服务的数据库不会被其他任何微服务去控制一样。
:::






## references:
[microfrontends-concept](https://single-spa.js.org/docs/microfrontends-concept/)
[Video Tutorials](https://space.bilibili.com/495254378)