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
    value: {
      type: Number
    },
    color: {
      type: String
    },
    fontColor: {
      type: String,
      default: '#fff'
    },
    backGround: {
      type: String,
      default: '#fff'
    },
    name: {
      type: String
    },
    orgId: {
      type: Number
    },
    position: {
      type: Array,
      default() {
        return ['29.3%', '56%']
      }
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      options: {
        animation: true,
        // tooltip: { // 提示框. Can be overwrited by series or data
        //   trigger: 'axis', // show: true,   //default true
        //   showDelay: 0,
        //   hideDelay: 50,
        //   transitionDuration: 0,
        //   borderRadius: 8,
        //   borderWidth: 2,
        //   padding: 10 // [5, 10, 15, 20]
        // },
        series: [{
          type: 'pie',
          name: this.name,
          center: this.position, // 圆心坐标（div中的%比例）
          radius: [45, 55], // 半径
          itemStyle: { // 上层样式
            normal: {
              color: this.color,
              label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                  baseline: 'bottom',
                  fontSize: 26,
                  color: this.fontColor
                }
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [{
            value: this.value,
            itemStyle: { // 上层样式
              normal: {
                color: this.color,
                label: {
                  show: true,
                  position: 'center',
                  formatter: '{b}',
                  textStyle: {
                    baseline: 'bottom',
                    fontSize: 26,
                    color: this.fontColor
                  }
                },
                labelLine: {
                  show: false
                }
              }
            }
          },
          {
            name: `${this.value}%`, // 百分比数据
            value: `${100 - this.value}`,
            itemStyle: { // 底层样式
              normal: {
                color: this.backGround,
                label: {
                  show: true,
                  position: 'center',
                  fontSize: 20
                }
              }
            }
          }
          ],
          startAngle: 270
        }]
      }
    }
  },
  mounted() {
    // this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
      window.removeEventListener('resize')
    }
  },
  methods: {
    initChart() {
      const wrapper = this.$el
      this.chart = echarts.init(wrapper)
      this.chart.setOption(this.options)
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.options.series[0].data[0].value = newVal
        this.options.series[0].data[1].name = `${newVal}%`
        this.options.series[0].data[1].value = `${100 - newVal}`
        this.initChart()
        if (this.chart) {
          window.addEventListener('resize', this.chart.resize)
        }
      },
      deep: true
    }
  }
}
</script>
