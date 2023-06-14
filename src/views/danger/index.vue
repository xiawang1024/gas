<template>
  <div class="container">
    <NavHeader />
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
export default {
  name: 'Danger',
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
