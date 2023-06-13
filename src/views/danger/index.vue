<template>
  <div class="container">
    <el-card>
      <el-page-header @back="goBack" content="隐患排查治理"> </el-page-header>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
