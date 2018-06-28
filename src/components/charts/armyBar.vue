<template>
<div :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    width: {
      type: String,
      width: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    xAxisData: {
      type: Array
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
          bottom: '9%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['探需', '专业', '班型', '截杀'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.fontColor
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
      handler(newVal, oldVal) {
        this.options.series[0].data = [...newVal]
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
