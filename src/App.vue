<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-07-02 12:27:42
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/App.vue
 * 工作，生活，健康
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.amap-info-window {
  background-color: #fff;
  padding: 4px 12px;
  color: #333333;
  border-radius: 4px;
}

div.amap-marker-label {
  background: transparent;
  border: none;
  left: 0 !important;
}
</style>
