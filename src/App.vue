<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-07-04 17:26:06
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/App.vue
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

.amap-info-window-custom {
  width: 130px;
  background-color: #fff;
  padding: 4px 12px;
  color: #333333;
  border-radius: 4px;
  line-height: 1.5;
  font-size: 13px;
}

div.amap-marker-label {
  background: transparent;
  border: none;
  left: 0 !important;
}
</style>
