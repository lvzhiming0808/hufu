<template>
<div class="linemarker-wrapper" :style="{height:height,width:width}"></div>
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
      default: '50%'
    },
    lineData: {
      type: Array
    }
    // barColor: {
    //   type: String,
    //   default: '#f79300'
    // },
    // fontColor: {
    //   type: String,
    //   default: '#fff'
    // },
    // barHoverColor: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    return {
      chart: null,
      options: {
        // title: {
        //     text: '',
        //     subtext: ''
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五'],
          show: false
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          show: false
        },
        series: [{
          name: '最高听线数',
          type: 'line',
          data: [],
          // symbol: 'pin', // 图标形状
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: '#f00' // 图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 1, // 连线粗细
              color: '#fff' // 连线颜色
            }
          }
        }]
      }
    }
  },
  mounted() {
    this.options.series[0].data = this.lineData.reverse()
    this.initChart()
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
    if (!this.chart) {
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
    lineData: {
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
