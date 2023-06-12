<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-06-12 16:52:59
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/App.vue
 * 工作，生活，健康
-->
<template>
  <div id="app">
    <!-- <datav /> -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {}
  }
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
</style>
