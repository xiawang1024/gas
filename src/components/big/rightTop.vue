<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-06-12 16:18:10
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightTop.vue
 * 工作，生活，健康
-->
<template>
  <dv-scroll-board class="scroll-board" :config="config" />
</template>

<script>
export default {
  name: 'RightTop',
  data() {
    return {
      config: {
        header: ['列1', '列2', '列3'],
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3'],
        ],
        index: true,
        rowNum: 6,
        align: ['center'],
      },
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.scroll-board {
  position: absolute;
  top: 5.5%;
  left: 2%;
  width: 96%;
  height: 90%;
}
</style>
