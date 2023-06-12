<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width:100px;height:50px;"
        />
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 style="width: 98% ;left:1%;" />
  </div>
</template>

<script>
import * as Service from '@/api/index'

const DICT = [
  {
    key: 'GuanWangLiCheng',
    unit: '公里',
    fill: '#4d99fc',
  },
  {
    key: 'FaJing',
    unit: '个',
    fill: '#f46827',
  },
  {
    key: 'TiaoYaXiang',
    unit: '个',
    fill: '#40faee',
  },
  {
    key: 'JuMinYongHu',
    unit: '个',
    fill: '#4d99fc',
  },
  {
    key: 'GongShangYongHu',
    unit: '个',
    fill: '#f46827',
  },
  {
    key: 'MenZhan',
    unit: '个',
    fill: '#40faee',
  },
  {
    key: 'YinHuanZhengGai',
    unit: '%',
    fill: '#4d99fc',
  },
]

export default {
  name: 'DigitalFlop',
  data() {
    return {
      digitalFlopData: [],
    }
  },
  mounted() {
    this.getData()
    setInterval(this.getData(), 10000)
  },
  methods: {
    getData() {
      Service.headInfo().then(res => {
        let { code, data } = res.data
        if (code == 200) {
          let list = []
          for (let i = 0; i < DICT.length; i++) {
            let { key, unit, fill } = DICT[i]
            list.push({
              title: data[key].remark,
              number: {
                number: [Number(data[key].dictValue)],
                content: '{nt}',
                textAlign: 'right',
                style: {
                  fill: fill,
                  fontWeight: 'bold',
                  fontSize: 36,
                },
              },
              unit: unit,
            })
          }
          this.digitalFlopData = list
        }
      })
    },
  },
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.3);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
