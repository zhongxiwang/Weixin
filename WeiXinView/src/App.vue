<template>
  <div id="app">
   <keep-alive>
    <router-view v-if="$route.meta.keepAlive"/><!-- 这里是会被缓存的视图组件 -->
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
}
html,
body {
  font-size: 10px;
  height: 100%;
  margin: 0;
}
#app,
.viewbody {
  height: 100%;
  /* overflow-x:hidden; */
}
</style>
