## 如何注册路由

现在假设有三个应用分别是，Platform，Hotel，Flight，三个应用都独立部署（三个应用配置的路由参考下面），虽然理论上来说，三个应用都是同级别的，但是我们还是要设定一个中心应用为Platform

```js
// Hotel
...
const router = VueRouter({
  history: "hash",
  routes: [
    ...
    {
      path: "/hotel/list",
      component: () => import(
        /* webpackChunkName: "hotel-list" */ "../views/HotelList.vue"
      )
    }
    ...
  ]
});
...

```

```js
// Flight
...
const router = VueRouter({
  history: "hash",
  routes: [
    ...
    {
      path: "/flight/list",
      component: () => import(
        /* webpackChunkName: "flight-list" */ "../views/FlightList.vue"
      )
    }
    ...
  ]
});
...

```

我们以Platform为中心，整个应用的入口从Platform应用进入，这时候有两种方案来处理Platform

### ①在Platform里面注册路由，把FlightList跟HotelList当做普通组件引入

这种情况需要我们在Platform的views文件夹内创建两个路由组件，分别为PlatformHotelList和PlatformFlightList（前面加个Platform前缀跟上面FlightList和HotelList区分），然后我们在这两个组件内分别引入remote组件

```vue
<template>
  <div class="flight-list">
    <flight-list></flight-list>
  </div>
</template>
<script>
import FlightList from "flight/FlightList";
export default {
  name: "PlatformFlightList",
  components: {
    FlightList
  }
}
</script>

```

### ②直接在Platform的路由注册的地方引入FlightList及HotelList组件

```js
...
[
  {
    path: "/flight/list",
    component: () => import("flight/flightList")
  },
  {
    path: "/hotel/list",
    component: () => import("hotel/hotelList")
  }
]
...
```

## 路由参数如何跨模块传递

假如remote的某一个路由，有参数query = { a: 1, b: 2, c: 3 }，那在host里面在引入remote路由定义路由也要在query里面定义这个参数，举个栗子：

```js
// remote
// 在remote的应用里面，有下面的路由定义
// https://remote-hotel.com/#/hotel/list?a=1&b=2&c=3

// host
// 同样，在host里面因为引用了remote的模块，在调用remote模块的路由里面
// 也需要设置同样的参数
// https://host-platform.com/#/views/hotel-list?a=1&b=2&c=3
```