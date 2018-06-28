<template>
  <div class="login-container">
    <el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">尚德机构虎符系统登录</h3>
       <el-form-item prop="loginName">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="account" />
        </span>
        <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password" ></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { LOG_IN } from '@/store/modules/user/actionTypes'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error('密码不能小于0位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(LOG_IN, this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/layout' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.login-container
  height 100%
  background-color #2d3a4b
  input
    -webkit-box-shadow 0 0 0px 1000px #293444 inset !important
    -webkit-text-fill-color #fff !important
  input
    background transparent
    border 0px
    -webkit-appearance none
    border-radius 0px
    padding 12px 5px 12px 0
    color #eee
    height 47px
  .el-input
    display inline-block
    height 47px
    width 85%
  .tips
    font-size 14px
    color #fff
    margin-bottom 10px
  .svg-container
    padding 6px 5px 6px 10px
    color #889aa4
    vertical-align middle
    display inline-block
  .svg-container_login
    font-size 16px
  .title
    font-size 26px
    font-weight 400
    color #eee
    margin 0px auto 40px auto
    text-align center
    font-weight bold
  .login-form
    position absolute
    left 0
    right 0
    width 400px
    padding 35px 35px 15px 35px
    margin 120px auto
  .el-form-item
    border 1px solid rgba(255, 255, 255, 0.1)
    background rgba(0, 0, 0, 0.1)
    border-radius 5px
    color #454545
  .show-pwd
    position absolute
    right 10px
    top 7px
    font-size 16px
    color #889aa4
    cursor pointer
  .thirdparty-button
    position absolute
    right 35px
    bottom 28px
</style>
