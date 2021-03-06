# 背景

随着前端功能越来越丰富，面临的一个棘手问题就是如何通过<text-yellow txt="模块共享"></text-yellow>来实现代码复用以及减少打包体积。目前我们通用的做法就是通过把公用的包发布到npm，然后将包安装到项目内，在通过webpack构建上线
<img :src="$withBase('/imgs/npm.png')"/>
这样仅仅解决了代码共享的问题，但是项目变得越来越大会导致打包的速度越来越慢，以及打包后的体积也越来越大。你可能会说，项目大了就拆分嘛，把一个大的项目拆分成N个独立的子项目，子项目独立打包，更解耦，问题是拆分打包就没法抽取公共部分。更重要的是，对于用户来说多个项目之间切换在体验上会大打折扣。怎么办呢？

## 模块联邦（module federation）

<img :src="$withBase('/imgs/federation.png')"/>

从图中可以看到，模块联邦的方式就是把一个应用的包提供给另一个应用直接使用，并且同时兼顾了公共包抽取的能力。换句话说，模块联邦提供了一种能力，让每个应用能独立输出对外暴露包，并且这个包是在线提供的，也即runtime运行时。


下面这张图也许看的更直接一点
<img :src="$withBase('/imgs/mfe.png')"/>
一个应用由来自多个应用对外暴露包的集合

## 功能与目的

功能：webpack4 以下的构建结果标明，webpack对外只提供了一个全局的webpackJsonp数组(注意不是方法)，每个异步chunk加载后通过该数组将自身的modules push(该push方法实际上被劫持修改过的)到内部webpack_modules这个对象上，内部变量可以访问到该对象，但外部是无法获取到的，完全属于“暗箱操作”，这也导致了无法跟外界环境进行模块“联邦”，这也是为什么webpack5中引进了模块联邦机制。通过该机制，可以让构建后的代码库动态的、运行时的跑在另一个代码库中。

目的：通过细化功能模块、组件复用、共享第三方库、runtime dependencies线上加载npm包等，可以更好的服务于多页应用、微前端等开发模式。

[精读《Webpack5 新特性 - 模块联邦》](https://mp.weixin.qq.com/s/b5Gl_1yX1enktU9oulO9zg)

[探索 webpack5 新特性 Module federation 引发的javascript共享模块变革](https://blog.csdn.net/yingyangxing/article/details/109653116)

