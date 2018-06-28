<template>
<div class="creating-analysis-wrapper">
  <header-bar></header-bar>
  <h2>
    <a @click="backToList">
      <i class="el-icon-arrow-left"></i>  返回列表页
    </a>
    <span @click="cancel">X</span>
  </h2>
  <div class="analysiSreport ">
    <div class="annlybody">
      <h1>
         <el-form ref="form1" label-width="100px" size="small">
           <el-form-item label="分析报告名称">
             <el-input type="text" v-validate="'required|max:50'" name="name0"  v-model="reportName" placeholder="" @blur="changeTypes"></el-input>
             <span class="error" ref="rep" v-show="errors.has('name0')" >{{ errors.first('name0') }}</span>
           </el-form-item>
         </el-form>
       </h1>
      <p class="paddingleftnone">
        <el-form ref="form2" label-width="60px" size="small">
          <el-form-item label="军团">
            {{legion}}
          </el-form-item>
        </el-form>
      </p>
      <p>
        <el-form ref="form3" label-width="60px" size="small">
          <el-form-item label="军团长">
            {{egatus}}
          </el-form-item>
        </el-form>
      </p>
      <p>
        <el-form ref="form4" label-width="60px" size="small">
          <el-form-item label="创建人">
            <span>{{showName}}</span>
          </el-form-item>
        </el-form>
      </p>
    </div>
    <div class="annlycont">
      <div class="dynamicdata">
        <div class="policyexecution2">
          <p>策略执行率</p>
        </div>
        <div class="policyexecution">
          <p><img src="../../assets/strategyss.png" :class="{isRotate:this.ok1!=='1'}"></p>
          <p><span class="lllegal">{{implementMom}}%</span></p>
          <p class="mom">环比</p>
        </div>
        <pie :value="implementPercent" :color="color" :fontColor="fontcolor" :backGround="back"></pie>
        <div class="ranking">
          <!-- <p>军团排行：<span class="lllegal">{{performRanking || '-'}}</span></p> -->
          <p>集团排行：<span class="lllegal">{{rankNum}}</span></p>
        </div>
      </div>
      <div class="dynamicdata">
        <div class="policyexecution2">
          <p>流程完整度</p>
        </div>
        <div class="policyexecution">
          <p><img src="../../assets/strategyss.png" :class="{isRotate:this.ok2!=='1'}"></p>
          <p><span class="lllegal">{{taskFinishMom}}%</span></p>
          <p class="mom">环比</p>
        </div>
        <pie :value="taskFinishPercent || 0" :color="color2" :fontColor="fontcolor" :backGround="back"></pie>
        <div class="ranking ranking2">
          <p>探需：<span class="lllegal">{{talkPercent}}</span></p>
          <p>专业：<span class="lllegal">{{mainMajorPercent}}</span></p>
          <p>班型：<span class="lllegal">{{mainClassPercent}}</span></p>
          <p>截杀：<span class="lllegal">{{runOutPercent}}</span></p>
          <p>销转：<span class="lllegal">{{transfer}}</span></p>
        </div>
      </div>
      <p class="annlyp">抽检数量：<span class="lllegal">{{checkCount}}</span></p>
      <p class="annlyp">抽检率：<span class="lllegal">{{qualityCheckPercent}}</span></p>
      <p class="annlyp">违规率：<span class="lllegal">{{violationPercent}}</span></p>
      <p class="annlyp">RPA：<span class="lllegal">{{rpa}}</span></p>
    </div>
    <div class="form-wrapper">

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">执行问题与建议</p>
          <el-input type="textarea" :rows="3" v-validate="'required|max:1000'" name="name1" v-model="issuesAndrec" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name1')">{{ errors.first('name1') }}</span>
      </div>
      <div class="input-item">
        <div class="input-item-main">
          <p class="label">用户模块</p>
          <p class="label">学员最关心问题1</p>
          <el-input type="text" v-model="form.type1" v-validate="'required|max:50'" name="name2" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name2')">{{ errors.first('name2') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">学员最关心问题2</p>
          <el-input type="text" v-model="form.type2" v-validate="'required|max:50'" name="name3" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name3')">{{ errors.first('name3') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">学员最关心问题3</p>
          <el-input type="text" v-model="form.type3" v-validate="'required|max:50'" name="name4" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name4')">{{ errors.first('name4') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">用户分析</p>
          <el-input type="textarea" :rows="3" v-validate="'required|max:250'" v-model="userAnalysis" name="name5" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name5')">{{ errors.first('name5') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">主要违规点1</p>
          <el-select v-model="violations1" size="small" @change="getVioId1" placeholder="请选择" @blur="changeTypes">
            <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">问题话术</p>
          <el-input :disabled="isDisabled" type="textarea" v-validate="validates" :rows="3" v-model="questionWord1" name="name6" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name6')">{{ errors.first('name6') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">建议话术</p>
          <el-input :disabled="isDisabled" type="textarea" v-validate="validates" :rows="3" v-model="suggestedWord1" name="name7" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name7')">{{ errors.first('name7') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">主要违规点2</p>
          <el-select v-model="violations2" @change="getVioId2" size="small" placeholder="请选择" @blur="changeTypes">
            <el-option v-for="item in options2" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">问题话术</p>
          <el-input :disabled="isDisabled2" type="textarea" v-validate="validates" :rows="3" v-model="questionWord2" name="name10" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name10')">{{ errors.first('name10') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label"></p>
          <p class="label">建议话术</p>
          <el-input :disabled="isDisabled2" type="textarea" v-validate="validates" :rows="3" v-model="suggestedWord2" name="name11" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name11')">{{ errors.first('name11') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">上周培训效果分析</p>
          <el-input type="textarea" :rows="2" v-validate="'max:100'" v-model="weekEffect" name="name8" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name8')">{{ errors.first('name8') }}</span>
      </div>

      <div class="input-item">
        <div class="input-item-main">
          <p class="label">备注</p>
          <el-input type="textarea" :rows="3" v-validate="'max:250'" v-model="remark" name="name9" placeholder="请输入文字" @blur="changeTypes"></el-input>
        </div>
        <span class="error" v-show="errors.has('name9')">{{ errors.first('name9') }}</span>
      </div>
    </div>
    <div class="annlyxian"></div>
    <div class="annlybtn">
      <el-button type="warning" plain @click="cancel">取消</el-button>
      <el-button @click="handleSubmit" type="warning">提交</el-button>
    </div>
  </div>
  <div class="loacl-wrapper" v-if="isLocalShow">
    <div class="local-box">
      <p class="local-h3">您之前正在创建 <span style="color:red">{{titles}}</span> 的分析报告，是否继续？</p>
      <span slot="footer" class="dialog-footer">
         <button class="cancel" @click="clearLocal">放弃</button>
         <button class="sure" @click="sureLocal">确定</button>
      </span>
    </div>
  </div>
</div>
</template>
<script>
import fetch from '@/utils/fetch'
import pie from '@/components/charts/pie'
import HeaderBar from '../layout/HeadBar.vue'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Validator.addLocale(zh)
const config = {
  locale: 'zh_CN'
}
const dictionary = {
  zh_CN: {
    messages: {
      max: () => '你输入的内容超过了字数的限制~~'
    },
    attributes: {
      name0: '分析报告名称',
      name1: '执行问题与建议',
      name2: '学员最关心的问题1',
      name3: '学员最关心的问题2',
      name4: '学员最关心的问题3',
      name5: '用户分析',
      name6: '问题话术',
      name7: '建议话术',
      name8: '上周培训效果分析',
      name9: '备注',
      name10: '问题话术',
      name11: '建议话术'
    }
  }
}
Validator.updateDictionary(dictionary)
Vue.use(VeeValidate, config)

export default {
  components: {
    HeaderBar,
    pie
  },
  data() {
    return {
      isDisabled: false,
      isDisabled2: false,
      validates: 'required|max:250',
      strategyId: null, // 策略ID
      implementPercent: 0, // 执行力
      taskFinishPercent: 0, // 完整度
      talkPercent: '',
      mainMajorPercent: '',
      mainClassPercent: '',
      runOutPercent: '',
      transfer: '',
      rpa: '',
      qualityCheckPercent: '',
      performRanking: '',
      violationPercent: '',
      checkCount: '',
      rankNum: '',
      reportName: '',
      legion: '',
      egatus: '',
      creater: '',
      violations1: '', // 违规1
      violations2: '', // 违规2
      vioID1: 1, // 违规ID1
      vioID2: 1, // 违规ID2
      enforcedPolicies: 0, //  策略执行率
      integrityProcess: 0, //  流程完整度sd
      agents: '0', //  探需
      majors: '0', //  专业
      classType: '0', //  班型
      putAway: '0', //  截杀
      pinTurn: '0', //  销转
      violationRate: '0', //  违规率
      qualityNumber: '0', //  质检抽检数
      issuesAndrec: '', //  执行问题与建议
      userAnalysis: '', //  用户分析
      questionWord1: '', //  问题话术
      suggestedWord1: '', // 建议话术
      questionWord2: '', //  问题话术
      suggestedWord2: '', // 建议话术
      groupRanksd: '', //  集团排名
      samplingRate: '', // 抽检率
      weekEffect: '',
      remark: '',
      form: {
        type1: '',
        type2: '',
        type3: '',
        desc5: '',
        desc6: ''
      },
      color: '#f59303',
      fontcolor: '#f59303',
      color2: '#f59303',
      back: '#c2c2c2',
      options1: [],
      options2: [],
      ok: null,
      objects: {},
      isLocalShow: false,
      titles: '',
      workNums: '',
      implementMom: '',
      taskFinishMom: '',
      ok1: '',
      ok2: '',
      strategyName: ''
    }
  },
  mounted() {
// 二向箔事业部 武汉销售 四部三组
    this.strategyId = this.$route.query.id
    fetch({
      url: `/reports/strategyVO/${this.strategyId}`
    }).then(res => {
      this.legion = res.legion
      this.egatus = res.egatus
      this.strategyName = res.strategyName
    })
    fetch({
      url: `/users/me`
    }).then(res => {
      this.workNums = res.workNum
      var url = location.href
      if (url.indexOf('creatingAnalysis') !== -1) {
        var local = JSON.parse(localStorage.getItem(this.workNums))
        for (const key in local) {
          if (local[key] !== '') {
            this.isLocalShow = true
            if (local.strategyName1) {
              this.titles = local.strategyName1
            } else {
              this.titles = this.strategyName
            }
            document.querySelector('body').style.overflow = 'hidden'
          } else {
            this.isLocalShow = false
            document.querySelector('body').style.overflow = 'auto'
          }
        }
      }
    })
    fetch({
      url: `/reports/integrated/${this.strategyId}`
    }).then(res => {
      this.implementPercent = res.implementPercent.replace(/%/, '') // 执行力
      this.taskFinishPercent = res.taskFinishPercent.replace(/%/, '') // 完整度
      this.talkPercent = res.talkPercent
      this.mainMajorPercent = res.mainMajorPercent
      this.mainClassPercent = res.mainClassPercent
      this.runOutPercent = res.runOutPercent
      this.transfer = res.transfer
      this.rpa = res.rpa
      this.qualityCheckPercent = res.qualityCheckPercent
      this.performRanking = res.performRanking
      this.violationPercent = res.violationPercent
      this.checkCount = res.checkCount
      this.rankNum = res.rankNum
      this.implementMom = res.implementMom
      this.taskFinishMom = res.taskFinishMom

      if (res.implementMom.indexOf('-') === -1) {
        this.ok1 = '1'// 正的
      } else {
        this.ok1 = '0'
      }
      if (res.taskFinishMom.indexOf('-') === -1) {
        this.ok2 = '1'
      } else {
        this.ok2 = '0'
      }
    })

    fetch({
      url: `/violation`
    }).then(res => {
      for (let i = 0; i < res.length; i++) {
        delete res[i].children
        this.options1.push(res[i])
        this.options2.push(res[i])
      }
    })
  },
  computed: {
    ...mapGetters([
      'showName'
    ])
  },
  methods: {
    clearLocal() {
      this.isLocalShow = false
      document.querySelector('body').style.overflow = 'auto'
      localStorage.removeItem(this.workNums)
    },
    sureLocal() {
      this.isLocalShow = false
      document.querySelector('body').style.overflow = 'auto'
      const saveObject = JSON.parse(localStorage.getItem(this.workNums))
      this.reportName = saveObject.reportName
      this.issuesAndrec = saveObject.issuesAndrec
      this.form.type1 = saveObject.type1
      this.form.type2 = saveObject.type2
      this.form.type3 = saveObject.type3
      this.userAnalysis = saveObject.userAnalysis
      this.violations1 = saveObject.violations1
      this.questionWord1 = saveObject.questionWord1
      this.suggestedWord1 = saveObject.suggestedWord1
      this.violations2 = saveObject.violations2
      this.questionWord2 = saveObject.questionWord2
      this.suggestedWord2 = saveObject.suggestedWord2
      this.weekEffect = saveObject.weekEffect
      this.remark = saveObject.remark
      if (this.$route.query.id !== saveObject.idOld) {
        this.$router.push({ path: '/creatingAnalysis', query: { id: saveObject.idOld }})
        fetch({
          url: `/reports/strategyVO/${saveObject.idOld}`
        }).then(res => {
          this.legion = res.legion
          this.egatus = res.egatus
          this.strategyName = res.strategyName
        })
        fetch({
          url: `/reports/integrated/${saveObject.idOld}`
        }).then(res => {
          this.implementPercent = Number(res.implementPercent.replace(/%/, '')) // 执行力
          this.taskFinishPercent = Number(res.taskFinishPercent.replace(/%/, '')) // 完整度
          this.talkPercent = res.talkPercent
          this.mainMajorPercent = res.mainMajorPercent
          this.mainClassPercent = res.mainClassPercent
          this.runOutPercent = res.runOutPercent
          this.transfer = res.transfer
          this.rpa = res.rpa
          this.qualityCheckPercent = res.qualityCheckPercent
          this.performRanking = res.performRanking
          this.violationPercent = res.violationPercent
          this.checkCount = res.checkCount
          this.rankNum = res.rankNum
          this.implementMom = res.implementMom
          this.taskFinishMom = res.taskFinishMom

          if (res.implementMom.indexOf('-') === -1) {
            this.ok1 = '1'// 正的
          } else {
            this.ok1 = '0'
          }
          if (res.taskFinishMom.indexOf('-') === -1) {
            this.ok2 = '1'
          } else {
            this.ok2 = '0'
          }
        })
      }
    },
    changeTypes(val) {
      this.objects = {
        reportName: this.reportName,
        issuesAndrec: this.issuesAndrec,
        type1: this.form.type1,
        type2: this.form.type2,
        type3: this.form.type3,
        userAnalysis: this.userAnalysis,
        violations1: this.violations1,
        questionWord1: this.questionWord1,
        suggestedWord1: this.suggestedWord1,
        violations2: this.violations2,
        questionWord2: this.questionWord2,
        suggestedWord2: this.suggestedWord2,
        weekEffect: this.weekEffect,
        remark: this.remark,
        idOld: this.$route.query.id,
        workNum: this.workNums,
        strategyName1: this.strategyName
      }
      for (var i in this.objects) {
        if (i === 'workNum' || i === 'idOld' || i === 'strategyName1') {
          continue
        } else {
          if (this.objects[i].trim().length > 0) {
            var str = JSON.stringify(this.objects)
            localStorage.setItem(this.workNums, str)
          }
        }
      }
    },
    handleSubmit() {
      this.ok = 0
      const errors = this.errors.items.length
      const min50 = [
        this.reportName,
        this.form.type1,
        this.form.type2,
        this.form.type3
      ]

      const min100 = [
        this.weekEffect
      ]

      const min250 = [
        this.userAnalysis,
        this.questionWord1,
        this.suggestedWord1,
        this.questionWord2,
        this.suggestedWord2,
        this.remark
      ]

      const min1000 = [
        this.issuesAndrec
      ]
      min250.pop()

      const needs = [
        ...min50,
        ...min250
      ]

      min1000.forEach((item, index) => {
        if (item.trim().length > 1000) {
          this.ok = 5
        }
      })

      min250.forEach((item, index) => {
        if (item.trim().length > 250) {
          this.ok = 3
        }
      })

      min100.forEach((item, index) => {
        if (item.trim().length > 100) {
          this.ok = 4
        }
      })

      min50.forEach((item, index) => {
        if (item.trim().length > 50) {
          this.ok = 2
        }
      })

      needs.forEach((item, index) => {
        if (item.trim().length === 0 && !this.isDisabled && this.validates) {
          this.ok = 1
        }
      })

      if (this.ok === 1) {
        this.$message({
          message: '你还有内容没有填写完~~~',
          type: 'error',
          customClass: 'element-ui-message'
        })
      } else if (this.ok === 2) {
        this.$message({
          message: '请输入50字符以内的内容',
          type: 'error',
          customClass: 'element-ui-message'
        })
      } else if (this.ok === 3) {
        this.$message({
          message: '请输入250字符以内的内容',
          type: 'error',
          customClass: 'element-ui-message'
        })
      } else if (this.ok === 4) {
        this.$message({
          message: '请输入100字符以内的内容',
          type: 'error',
          customClass: 'element-ui-message'
        })
      } else if (this.ok === 5) {
        this.$message({
          message: '请输入1000字符以内的内容',
          type: 'error',
          customClass: 'element-ui-message'
        })
      }
      const idd = this.$route.query.id
      if (errors === 0 && this.ok === 0) {
        this.ok = 0
        fetch({
          url: `/reports/strategys`, //  上传接口
          method: 'post',
          data: {
            strategyId: idd,
            reportName: this.reportName,
            legion: this.legion,
            egatus: this.egatus,
            creater: this.showName,
            issuesAndrec: this.issuesAndrec, //  执行问题与建议
            userModules: [{
              code: 1,
              name: this.form.type1
            }, {
              code: 2,
              name: this.form.type2
            }, {
              code: 3,
              name: this.form.type3
            }],
            userAnalysis: this.userAnalysis, //  用户分析
            type: '103',
            mainViolationOneId: this.vioID1,
            mainViolationTwoId: this.vioID2,
            mainViolationOneName: this.violations1, // 违规点1
            mainViolationTwoName: this.violations2, // 违规点2
            questionWord: this.questionWord1, //  问题话术1
            suggestedWord: this.suggestedWord1, //  建议话术2
            questionWordTwo: this.questionWord2, //  问题话术1
            suggestedWordTwo: this.suggestedWord2, //  建议话术2
            weekEffect: this.weekEffect, // 上周培训效果分析
            remark: this.remark // 备注
          }
        }).then(res => {
          if (res.id) {
            this.$message({
              showClose: true,
              message: '创建成功！',
              type: 'success',
              customClass: 'element-ui-message'
            })
            localStorage.removeItem(this.workNums)
            sessionStorage.setItem('ids', this.strategyId)
            this.$router.push({
              path: '/strategyDetail'
              // query: {
              //   id: this.strategyId
              // }
            })
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error',
              customClass: 'element-ui-message'
            })
          }
        })
      }
    },
    backToList() {
      this.$router.push({
        path: '/layout/myStrategy'
      })
    },
    cancel() {
      this.$router.push(sessionStorage.getItem('editMessage'))
    },
    getVioName(id) {
      let name = ''
      for (let i = 0; i < this.options1.length; i++) {
        if (id === this.options1[i].id) {
          name = this.options1[i].label
          break
        }
      }
      return name
    },
    getVioId1(val) {
      this.vioID1 = val
      this.violations1 = this.getVioName(val)
      if (this.violations1 === '无') {
        this.isDisabled = true
        this.validates = false
        this.questionWord1 = ''
        this.suggestedWord1 = ''
      } else {
        this.isDisabled = false
        this.validates = 'required|max:250'
      }
    },
    getVioId2(val) {
      this.vioID2 = val
      this.violations2 = this.getVioName(val)
      if (this.violations2 === '无') {
        this.isDisabled2 = true
        this.validates = false
        this.questionWord2 = ''
        this.suggestedWord2 = ''
      } else {
        this.isDisabled2 = false
        this.validates = 'required|max:250'
      }
    }
  }
}
</script>
<style lang="scss" src="./index.scss" scoped>
</style>
