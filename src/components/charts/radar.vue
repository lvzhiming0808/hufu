<template>
<div :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    radarVal: {
      type: Array
    }
  },
  data() {
    return {
      chart: null,
      options: {
        tooltip: { // 提示框组件
          trigger: 'axis', // 坐标轴触发
          formatter(params, ticket, callback) {
            const str = `
            探需  ${params.value[0]}%<br/>
            销转  ${params.value[1]}%<br/>
            专业  ${params.value[2]}%<br/>
            班型  ${params.value[3]}%<br/>
            截杀  ${params.value[4]}%
            `
            return str
          }
        },
        radar: [{
          nameGap: 7,
          name: {
            textStyle: {
              color: '#f79300'
            }
          },
          indicator: [ // 雷达图的指示器，用来指定雷达图中的多个变量
            {
              text: '探需',
              max: 100
            },
            {
              text: '销转',
              max: 100
            },
            {
              text: '专业',
              max: 100
            },
            {
              text: '班型',
              max: 100
            },
            {
              text: '截杀',
              max: 100
            }
          ],
          center: ['50%', '55%'], // 极坐标系的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
          radius: 55 // 极坐标系的半径，数组的第一项是内半径，第二项是外半径。支持设置成百分比，相对于容器高宽中较小的一项的一半。
        }],
        series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
          {
            type: 'radar', // 类型
            // radarIndex: 0,
            tooltip: { // 本系列特定的 tooltip 设定。
              trigger: 'item' // 数据项图形触发
            },
            itemStyle: { // 折线拐点标志的样式
              normal: {
                areaStyle: { // 区域填充的样式。
                  type: 'default'
                },
                color: '#f79300'
              }
            }, //
            data: [ // 雷达图的数据是多变量（维度）的，和indicator对应
              {
                value: this.radarVal,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      type: 'default',
                      color: '#ffe5be' // 图表中各个图区域的颜色
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    setTimeout(() => {
      this.chart.on('click', (params) => {
        // if (params.seriesName === '数据对比-策略执行率') {
        //   this.$router.push({
        //     name: '人员对比',
        //     query: {
        //       orgId: this.orgId,
        //       name: '策略执行率'
        //     }
        //   })
        // }
      })
    }, 300)
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
    // if (!this.chart) {
    //   window.removeEventListener('resize')
    // }
  },
  methods: {
    initChart() {
      const wrapper = this.$el
      this.chart = echarts.init(wrapper)
      this.chart.setOption(this.options)
    }
  },
  watch: {
    radarVal: {
      handler(newVal, oldVal) {
        this.options.series[0].data[0].value = newVal
        this.chart.setOption(this.options)
        // if (this.chart) {
        //   window.addEventListener('resize', this.chart.resize)
        // }
      },
      deep: true
    }
  }
}
</script>
