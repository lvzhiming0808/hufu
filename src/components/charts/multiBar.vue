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
      type: Object
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
        grid: {
          x: 50,
          y: 100,
          x2: 35,
          y2: 30
        },
        tooltip: {
          trigger: 'axis',
          formatter(params, ticket, callback) {
            return `${params[0].name}<br/>
            ${params[0].marker} ${params[0].seriesName} ${params[0].value}%<br/>
            ${params[1].marker} ${params[1].seriesName} ${params[1].value}%<br/>
            ${params[2].marker} ${params[2].seriesName} ${params[2].value}%<br/>
            ${params[3].marker} ${params[3].seriesName} ${params[3].value}%
            `
          }
        },
        legend: {
          data: ['探需', '班型', '专业', '截杀']
        },
        toolbox: {
          show: true,
          right: 23,
          top: 30,
          feature: {
            dataView: {
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
                      <ul style="color: rgba(0, 0, 0, 0.87);font-size: 21px;font-weight: 500;
                        border-bottom: 1px solid #ebebeb;flex: 1;display: flex;align-items: center;"">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;"></li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].name}</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[1].name}</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[2].name}</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[3].name}</li>
                      </ul>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">本周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[0]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[1].data[0]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[2].data[0]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[3].data[0]}%</li>
                      </ul>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">前一周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[1]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[1].data[1]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[2].data[1]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[3].data[1]}%</li>
                      </ul>
                      <ul style="display: flex;color: rgba(0, 0, 0, 0.54);background: #fff;border-bottom: 1px solid #ebebeb;flex: 1;"
                      onmouseover="this.style.backgroundColor='#eeeeee'" onmouseout="this.style.backgroundColor='#fff'">
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">前二周</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[0].data[2]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[1].data[2]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[2].data[2]}%</li>
                        <li style="flex: 1;display: flex;justify-content: center;align-items: center;">${opt.series[3].data[2]}%</li>
                      </ul>
                    </div>
                  </div>
                `
                return table
              }
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            saveAsImage: {
              show: true,
              name: '探需、班型、专业、截杀'
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          data: ['本周', '前一周', '前二周']
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        }],
        series: [{
          name: '探需',
          type: 'bar',
          data: [],
          normal: {
            show: true,
            position: 'top',
            formatter: '{value}%'
          },
          itemStyle: {
            normal: {
              color(params) {
                  // build a color map as your need.
                const colorList = [
                  '#F79300', '#60BAD9', '#65C6AF', '#8F84B0'
                ]
                return colorList[params.seriesIndex]
              }
            }
          }
        },
        {
          name: '班型',
          type: 'bar',
          data: [],
          normal: {
            show: true,
            position: 'top',
            formatter: '{value}%'
          },
          itemStyle: {
            normal: {
              color(params) {
                  // build a color map as your need.
                const colorList = [
                  '#F79300', '#60BAD9', '#65C6AF', '#8F84B0'
                ]
                return colorList[params.seriesIndex]
              }
            }
          }
        },
        {
          name: '专业',
          type: 'bar',
          data: [],
          normal: {
            show: true,
            position: 'top',
            formatter: '{value}%'
          },
          itemStyle: {
            normal: {
              color(params) {
                  // build a color map as your need.
                const colorList = [
                  '#F79300', '#60BAD9', '#65C6AF', '#8F84B0'
                ]
                return colorList[params.seriesIndex]
              }
            }
          }
        },
        {
          name: '截杀',
          type: 'bar',
          data: [],
          normal: {
            show: true,
            position: 'top',
            formatter: '{value}%'
          },
          itemStyle: {
            normal: {
              color(params) {
                  // build a color map as your need.
                const colorList = [
                  '#F79300', '#60BAD9', '#65C6AF', '#8F84B0'
                ]
                return colorList[params.seriesIndex]
              }
            }
          }
        }
        ]
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
        this.options.series[1].data = newVal.classTypeRate
        this.options.series[2].data = newVal.majorsRate
        this.options.series[3].data = newVal.putAwayRate
        this.options.series[0].data = newVal.agentsScore
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
