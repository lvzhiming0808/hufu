<template>
<div ref="musk" class="musk" v-show="showMusk">
  <div class="nb-box" v-show="showBox">
    <h3>备注</h3>
    <el-input type="textarea" @blur="handleBlur" @focus="handleFocus" @input="handleInput" name="msg" placeholder="请输入备注内容" v-model="textarea">
    </el-input>
    <p style="color:red;margin5px auto;height:20px;text-align:center">
      <span class="error" v-show="showError">{{error}}</span>
    </p>
    <div class="button-wrapper">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="saveRemark">保存</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showMusk: false,
      showBox: false,
      showError: false,
      textarea: '',
      error: ''
    }
  },
  mounted() {
    const musk = this.$refs.musk
    const winWidth = document.body.clientWidth
    const winHeight = document.body.clientHeight
    musk.style.width = `${winWidth}px`
    musk.style.height = `${winHeight}px`
  },
  methods: {
    cancel() {
      this.showMusk = false
      this.showBox = false
    },
    saveRemark() {
      this.$emit('submitRemark')
    },
    handleBlur() {
      if (this.textarea === '') {
        this.error = '你还没有输入备注内容~~'
        this.showError = true
      }
    },
    handleFocus() {
      this.showError = false
    },
    handleInput() {
      if (this.textarea.trim().length > 250) {
        this.error = '你输入的内容超过了字数的限制~~'
        this.showError = true
      } else {
        this.showError = false
      }
    }
  }

}
</script>

<style lang="scss">
.musk {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10002;
    > .nb-box {
        width: 348px;
        height: 258px !important;
        background: #fff;
        border-radius: 10px;
        > h3 {
            background: #f79300;
            height: 48px;
            color: #fff;
            padding-left: 49px;
            font-size: 16px;
            line-height: 48px;
            border-radius: 10px 10px 0 0;
        }
        .el-textarea__inner {
            height: 110px !important;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .el-textarea {
            > textarea {
                display: block;
                min-height: 110px !important;
                width: 80% !important;
                margin: 20px auto !important;
            }
        }
        > .button-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 5px;
        }
    }
}
</style>
