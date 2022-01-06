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