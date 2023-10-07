<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:01:26
 * @LastEditTime: 2023-08-31 10:56:42
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/specialOperation/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <FormCore />
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import FormCore from './modules/formCore.vue'

export default {
  name: 'SpecialOperation',
  components: {
    NavHeader,
    FormCore,
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
