<template>
<div :style="{height:height,width:width}" style="padding-top: 20px;"></div>
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
    },
    chartName: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{c}'
        },
        toolbox: { // 可视化的工具箱
          show: true,
          right: 20,
          feature: {
            dataView: { // 数据视图
              show: true,
              readOnly: true,
              optionToContent(opt) {
                const table =
                  `
                  <div style="width:100%;height:100%;border-radius: 2px;padding: 0 25px;padding-top: 2px;">
                    <div style="width: 100%;height:100%;
                    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
                    display: flex;flex-direction: column;
                    ">
                      <h3 style="padding-left: 24px;color: rgba(0, 0, 0, 0.87);font-size: 21px;font-weight: 500;
                      border-bottom: 1px solid #ebebeb;flex: 1;display: flex;align-items: center;">${opt.series[0].name}</h3>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">本周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[0]}</li>
                      </ul>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">前一周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[1]}</li>
                      </ul>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">前二周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[2]}</li>
                      </ul>
                    </div>
                  </div>
                `
                return table
              }
            },
            saveAsImage: { // 保存图片
              show: true,
              name: this.chartName
            },
            magicType: { // 动态类型切换
              type: ['bar', 'line']
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#000',
              fontSize: '12px'
            }
          }
        }],
        yAxis: [{
          type: 'category',
          data: ['本周', '前一周', '前二周'],
          splitLine: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          name: this.chartName,
          data: [],
          normal: {
            show: true,
            position: 'top',
            formatter: '{value}'
          },
          itemStyle: {
            normal: {
              color(params) {
                // build a color map as your need.
                const colorList = [
                  '#9ECFC1', '#75B1C3', '#C06B92'
                ]
                return colorList[params.dataIndex]
              }
            }
          }
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
  mounted() {},
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
        this.options.series[0].data = newVal
        // this.options.series[0].data = [42, 65, 89]
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
