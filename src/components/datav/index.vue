<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-06-12 16:31:49
 * @LastEditors: xiawang1024
 * @Description
 * @FilePath: /electronic-file/src/components/datav/index.vue
 * 工作，生活，健康
-->
<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="title">
            <div class="left">
              <dv-decoration-8 style="width:300px;height:50px;" />
            </div>
            <div class="center">
              <h1>智慧燃气监控系统</h1>
              <p>----洛阳进合燃气有限公司</p>
            <dv-decoration-5  />
            </div>
            <div class="right">
              <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
            </div>
          </div>
      </div>
      <div class="main-top">
        <digitalFlop />
      </div>
      <div class="main-content">
        <div class="left">
          <dv-border-box-8 :reverse="true"><mapXw /></dv-border-box-8>
        </div>
        <div class="right">
          <div class="right-top">
            <dv-border-box-13 title="传感器监控">
              <RightTop />
            </dv-border-box-13>
          </div>
          <div class="right-bottom">
            <dv-border-box-9 title="视频监控">
              <RightBottom />
            </dv-border-box-9>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>

import digitalFlop from '../big/digitalFlop'
import mapXw from '../big/map.vue'
import RightTop from '../big/rightTop.vue'
import RightBottom from '../big/rightBottom.vue'

export default {
  name: 'DataView',
  components: {
    digitalFlop,
    mapXw,
    RightTop,
    RightBottom
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    padding: 10px 0;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .title{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .center{
        position: relative;
        width: 500px;
        text-align: center;
        h1{
          margin:0 10px;
          font-size: 32px;
        }
        p{
          position: absolute;
          bottom: 10%;
          right: -15%;
          font-size: 15px;
        }

      }

    }

  }

  .main-top{
    width: 100%;
    height: 10%;
  }

  .main-content{
    flex:1;
    display: flex;
    .left{
      height: 100%;
      width: 65%;
    }
    .right{
      flex: 1;
      display: flex;
      flex-direction: column;
      .right-top{
        height: 45%;
        width: 100%;
      }
      .right-bottom{
        height: 55%;
        width: 100%;
      }
    }
  }
}

</style>
