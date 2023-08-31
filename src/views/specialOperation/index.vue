<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:01:26
 * @LastEditTime: 2023-08-31 10:46:00
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/homeCheck/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'

export default {
  name: 'SpecialOperation',
  components: {
    NavHeader,
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
