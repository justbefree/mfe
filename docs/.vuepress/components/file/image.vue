<template>
  <div class="file-image">
    <img :src="images[name]">
  </div>
</template>
<script type="text/javascript">
  const spa = require("./images/single-spa.png");
  const error = require("./images/error.png");
  const images = {
    spa,
    error
  };
  export default {
    name: "FileImage",
    props: {
      name: String
    },
    data() {
      return {
        images
      }
    }
  };
</script>

<style type="text/css" scoped="scoped">
  .file-image {}
</style>
