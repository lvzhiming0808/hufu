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
    xAxisData: {
      type: Array,
      default: []
    },
    barData: {
      type: Array
    },
    barColor: {
      type: String,
      default: '#f79300'
    },
    fontColor: {
      type: String,
      default: '#fff'
    },
    barHoverColor: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      options: {
        color: [this.barColor],
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //   }
        // },
        grid: {
          left: '0',
          right: '0',
          bottom: '9%',
          width: '100%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: [],
          axisTick: {
            show: false,
            interval: 0
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,
            formatter(val) {
              if (val.length > 5) {
                const len = val.length - 5
                const str = `${val.slice(0, 5)}\n${val.slice(-len)}`
                return str
              } else {
                return val
              }
            },
            textStyle: {
              color: this.fontColor,
              fontSize: 12
            }
          }
        }],
        yAxis: [{
          show: false,
          type: 'value'
        }],
        series: [{
          type: 'bar',
          barWidth: '50%',
          label: {
            normal: {
              show: true,
              position: 'top',
              color: this.fontColor,
              formatter: '{c}%'
            }
          },
          itemStyle: {
            emphasis: {
              color: this.barHoverColor
            }
          },
          data: this.barData
        }]
      }
    }
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
    if (!this.chart) {
      window.removeEventListener('resize')
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.chart.resize)
  },
  methods: {
    initChart() {
      const wrapper = this.$el
      this.chart = echarts.init(wrapper)
      this.chart.setOption(this.options)
    }
  },
  watch: {
    barData: {
      // this.options.series[0].data = [...newVal]
      handler(newVal, oldVal) {
        if (newVal.length > 3) {
          setTimeout(() => {
            this.options.series[0].data = [...newVal]
          }, 500)
        } else {
          if (this.chart) {
            setTimeout(() => {
              this.options.series[0].data = [...newVal]
            }, 500)
          } else {
            this.options.series[0].data = [...newVal]
          }
        }
        if (this.chart) {
          window.addEventListener('resize', this.chart.resize)
        }
      },
      deep: true
    },
    xAxisData: {
      handler(newVal, oldVal) {
        if (newVal.length > 3) {
          this.chart.dispose()
          this.chart = null
          setTimeout(() => {
            this.options.xAxis[0].data = [...newVal]
            this.initChart()
          }, 500)
        } else {
          if (this.chart) {
            this.chart.dispose()
            this.chart = null
            setTimeout(() => {
              this.options.xAxis[0].data = [...newVal]
              this.initChart()
            }, 500)
          } else {
            this.options.xAxis[0].data = [...newVal]
            this.initChart()
          }
        }
        if (this.chart) {
          window.addEventListener('resize', this.chart.resize)
        }
      },
      deep: true
    }
  }
}
</script>
