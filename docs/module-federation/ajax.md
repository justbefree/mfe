## 思考一个问题

现在有两个应用分别是Flight和Hotel，如果在Hotel的应用里面通过module federation去引用Flight里面的一个组件，比如是A，如果A里面有相应的异步接口请求，这时候在Hotel里面要做什么改动吗？

答案是需要的，也就是说需要在Hotel的应用里面新增路由转发的配置，不然接口请求会存在跨域。为什么这样呢？其实很简单，模块联邦的方式只是把remote的静态JS资源加载到host里面并且动态执行，代码执行环境的宿主是host，请求的域名是相对于当前host域名


代码来说明上面的问题

### Flight
```js
...
devServer: {
  port: 8080,
  proxy: {
    '/flight': {
      target: 'http://example-flight.com',
      changeOrigin: true
    }
  }
},
...

```

### Hotel

```js
...
devServer: {
  port: 8081,
  proxy: {
    '/hotel': {
      target: 'http://example-hotel.com',
      changeOrigin: truer
    },
    '/flight': {
      target: 'http://example-flight.com',
      changeOrigin: true
    }
  }
},
...

```
