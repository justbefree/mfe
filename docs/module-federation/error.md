Uncaught TypeError: Cannot set properties of undefined (setting './node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/cache-loader/dist/cjs.js??ruleSet[0].use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./src/App.vue?vue&type=script&lang=js')
    at webpackHotUpdate_applications_hotel



```js
Conflict: Multiple assets emit different content to the same filename index.html

ERROR in Conflict: Multiple assets emit different content to the same filename index.html

webpack compiled with 1 error

```

解决：不要把index.html放到public文件夹下面。删掉就好了
[参考](https://github.com/sorrycc/roadhog/issues/709)