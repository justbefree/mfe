# 第三方库

现有两个应用分别为Flight和Train，在Train应用里面引用了@dullar/earth组件库，并且在trainList.vue里面调用了组件库的Toast组件
```ts
// Train app bootstrap.ts
import Vue from "vue";
import Earth from "@dullar/earth";
Vue.use(Earth);
```

```vue
// Train app trainList.vue
...
<span @click="handleClick" class="train-toast">点击我会弹框</span>
...
...
<script lang="ts">
...

export default class TrainList extends Vue {
  ...
  handleClick() {
    this.Toast("我弹出来了");
  }
  ...
}
</script>

```

在Flight应用里面通过模块联邦的方式引入了Train下面的trainList.vue组件，而且Flight应用内并没有引入@dullar/earth组件库，这时候当我们再点击“惦记我会弹框”按钮的时候，控制台会报错。原因不用多说因为在Train应用里面@dullar/earth是全局安装的，所以在打包的时候组件库会被抽离出来并不会随着trainList.vue组件一起打包，这时候上下文环境里面没有@dullar/earth。解决办法有两个，

① Train应用下的组件库不再通过全局安装，换成局部引入并调用


```vue
// Train app trainList.vue
...
<span @click="handleClick" class="train-toast">点击我会弹框</span>
...
...
<script lang="ts">
...
import { YnToast } from "@dullar/earth";
export default class TrainList extends Vue {
  ...
  handleClick() {
    // this.Toast("我弹出来了");
    YnToast("我弹出来了");
  }
  ...
}
</script>

```

② 在Flight应用下也同样全局安装@dullar/earth组件库

```js
// Flight app bootstrap.js
import Vue from "vue";
import Earth from "@dullar/earth";
Vue.use(Earth);
```



