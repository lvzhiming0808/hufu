<template>
<div class="itemcompare-wrapper">
  <div class="main" ref="main">
    <header>
      <i></i><span>{{name}}</span><i></i>
      <el-button type="primary" size="small" @click="back">返回</el-button>
    </header>
    <main>
      <ul v-if="!noData" :style="{width: listWrapperWidth}">
        <li v-for="(item,index) in data" :key="index">
          <div class="wrapper" @mouseenter="toggleShadow(index)" @mouseleave="!toggleShadow(index)">
            <header>
              <span>{{item.name}}</span>
              <span class="title-tag">{{item.value}}%</span>
            </header>
            <p class="line">
              <span></span>
            </p>
            <main>
              <el-tree :data="item.orgInfos || item.userMsgs" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </main>
            <div class="train">
              <p>
                <span>培训名单</span>
              </p>
              <ul>
                <li v-for="(item1,index1) in item.badMsgs" :key="index1">
                  <p style="padding-left: 15px;">
                    <span>{{item1.name}}</span>
                    <span>{{item1.value}}%</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-data" v-if="noData">
        暂无可对比数据
      </div>
    </main>
  </div>
</div>
</template>

<script>
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      noData: false,
      data: [],
      ids: [],
      name: '',
      type: '',
      defaultProps: {
        children: 'userMsgs',
        label(data) {
          return `${data.name} ${data.value}%`
        }
      },
      listWrapperWidth: 'auto'
    }
  },
  created() {
    this.type = this.$route.query.type
    const orgId = this.$route.query.orgId
    this.startTime = this.$route.query.startTime
    this.endTime = this.$route.query.endTime
    if ((this.startTime === '') || (this.endTime === '')) {
      this.startTime = this.getWeekStartDate()
      this.endTime = this.getWeekEndDate()
    }

    switch (this.type) {
      case '0':
        this.name = '流程完整度'
        break
      case '1':
        this.name = '质检抽检数'
        break
      case '2':
        this.name = '探需'
        break
      case '3':
        this.name = '主推专业'
        break
      case '4':
        this.name = '主推班型'
        break
      case '5':
        this.name = '截杀'
        break
      case '6':
        this.name = '策略执行率'
        break
      case '7':
        this.name = 'RPA'
        break
      case '8':
        this.name = '销转'
        break
      case '9':
        this.name = '执行排行'
        break
      case '10':
        this.name = '质检抽检比例'
        break
      case '11':
        this.name = '违规率'
        break
      case '12':
        this.name = '总机会数'
    }

    fetch({
      url: `/calls/commons/orgs?id=${orgId}`
    }).then(res => {
      if (res.length === 0) {
        fetch({
          url: `/reports/strategy/dataDetail`,
          data: {
            type: this.type,
            startTime: this.startTime,
            endTime: this.endTime,
            orgIds: orgId
          }
        }).then(res => {
          if (res.dateMsgs.length === 0) {
            this.noData = true
          }
          if (res.dateMsgs.length > 5) {
            this.listWrapperWidth = (res.dateMsgs.length) * 250 + 'px'
          }
          this.data = res.dateMsgs
        })
      }

      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          this.ids.push(res[i].id)
        }
        fetch({
          url: `/reports/strategy/dataDetail`,
          data: {
            type: this.type,
            startTime: this.startTime,
            endTime: this.endTime,
            orgIds: this.ids.toString()
          }
        }).then(res => {
          if (res.dateMsgs.length === 0) {
            this.noData = true
          }
          if (res.dateMsgs.length > 5) {
            this.listWrapperWidth = (res.dateMsgs.length) * 250 + 'px'
          }
          this.data = res.dateMsgs
        })
      }
    })
  },
  mounted() {
    const item = document.querySelectorAll('.sidebar-item')
    item[2].className += ' router-link-exact-active active'
  },
  methods: {
    handleNodeClick() {},
    toggleShadow(index) {
      const wrapper = document.querySelectorAll('.wrapper')
      if (wrapper[index].className.length === 7) {
        wrapper[index].className += ' shadow'
      } else {
        wrapper[index].className = 'wrapper'
      }
    },
    back() {
      this.$router.go(-1)
    },
    formatDate(date) {
      const myyear = date.getFullYear()
      let mymonth = date.getMonth() + 1
      let myweekday = date.getDate()
      if (mymonth < 10) {
        mymonth = '0' + mymonth
      }
      if (myweekday < 10) {
        myweekday = '0' + myweekday
      }
      return (myyear + '-' + mymonth + '-' + myweekday)
    },
    now() {
      const now = new Date()
      const nowDayOfWeek = now.getDay()
      const nowDay = now.getDate()
      const nowMonth = now.getMonth()
      let nowYear = now.getYear()
      nowYear += (nowYear < 2000) ? 1900 : 0
      return {
        nowDayOfWeek,
        nowDay,
        nowMonth,
        nowYear
      }
    },
    getWeekStartDate() {
      const weekStartDate = new Date(this.now().nowYear, this.now().nowMonth, this.now().nowDay - this.now().nowDayOfWeek)
      return this.formatDate(weekStartDate)
    },
    getWeekEndDate() {
      const weekEndDate = new Date(this.now().nowYear, this.now().nowMonth, this.now().nowDay + (6 - this.now().nowDayOfWeek))
      return this.formatDate(weekEndDate)
    }
  },
  beforeRouteLeave(to, from, next) {
    const item = document.querySelectorAll('.sidebar-item')
    item[2].className = 'sidebar-item'
    next()
  }
}
</script>
<style lang="scss">
body{
  overflow-x: hidden;
}
.itemcompare-wrapper {
    padding: 0 60px 0 30px;
    box-sizing: border-box;
  
    .main {
        width: 100%;
        height: auto;
        background: #fff;
        margin-top: 32px;
        > header {
            width: 100%;
            height: 64px;
            display: flex;
            align-items: center;
            padding-right: 26px;
            font-size: 16px;

            > i:nth-of-type(1) {
                display: block;
                width: 4px;
                height: 18px;
                background: #f79300;
                margin-right: 20px;
            }
            > span {
                font-size: 16px;
            }

            > i:nth-of-type(2) {
                flex: 1;
            }
        }

        > main {
            height: auto;
            width: calc(100vw - 270px);
            margin-left: 20px;
            overflow-x: auto;

            > ul {
                width: 100%;
                height: auto;
                overflow: hidden;

                > li {
                    width: 250px;
                    padding-right: 27px;
                    margin-bottom: 20px;
                    float: left;
                    height: auto;
                    .wrapper {
                        width: 100%;
                        min-height: 575px;
                        display: flex;
                        flex-direction: column;
                        background: #f9f6f3;
                        
                        .el-tree {
                            background: #f9f6f3 !important;
                            width: auto;
                        }
                        main {
                            flex: 1;
                            padding-top: 30px;
                            padding-bottom: 20px;
                        }
                        > header {
                            height: 60px;
                            display: flex;
                            > span:nth-of-type(1) {
                                line-height: 60px;
                                padding-left: 10px;
                                font-size: 16px;
                                height: 100%;
                                flex: 3;
                            }
                            > span:nth-of-type(2) {
                                line-height: 60px;
                                text-align: right;
                                height: 100%;
                                margin-right: 6px;
                            }
                             .title-tag{
                                color: red;
                                font-size: 16px;
                                i{
                                  font-style: normal;
                                  margin-left: 6px;
                                  font-size: 12px;
                                }
                              } 
                        }
                        > .line {
                            width: 100%;
                            height: 7px;
                            border-bottom: 2px solid #ccc;
                            display: flex;
                            justify-content: center;

                            > span {
                                background: #f9f6f3;
                                border-right: 2px solid #ccc;
                                border-top: 2px solid #ccc;
                                height: 10px;
                                width: 10px;
                                margin-top: 2px;
                                transform: rotate(315deg);
                                border-left: 2px solid transparent;
                                border-bottom: 2px solid transparent;
                            }
                        }
                        .train {
                            min-height: 135px;
                            border-top: 1px solid #d2d2d2;
                            > p {
                                width: 100%;
                                height: 60px;
                                line-height: 46px;
                                padding-left: 16px;
                                font-size: 18px;
                            }
                        }
                    }
                    .shadow {
                        // box-shadow: 0 1px 5px 0 #fe9300, 0 2px 2px 0 #fe9300, 0 3px 1px -2px #fe9300;
                    }

                }
            }
            .no-data {
                // width: 500px;
                color: #f79300;
                display: flex;
                // justify-content: center;
                padding-left: 10px;
                align-items: center;
            }
        }
    }
}
</style>
