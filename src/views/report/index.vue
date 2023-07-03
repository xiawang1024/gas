<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:01:26
 * @LastEditTime: 2023-07-03 19:25:26
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/views/report/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <MapXw />
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'

import MapXw from './modules/map.vue'

export default {
  name: 'Report',
  components: {
    NavHeader,
    MapXw,
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
