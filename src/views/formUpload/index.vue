<template>
  <div class="upload_strategy">
    <div class="upload_strategy_title">相关话术: </div>
    <div class="upload_strategy_form">
      <p class="upload_strategy_p">点击上传话术</p>
      <form style="width: 100px; height: 20px;" enctype="multipart/form-data">
        <input class="upload_strategy_file" type="file" name="file" 
        v-on:change="fileChange" id="quanquan">
      </form>
    </div>
    <div class="upload_strategy_fileName">{{myFileName}}</div>
  </div>
</template>
<script>
import { upLoad } from '../../api/createStrategy'
export default {
  data() {
    return {
      file: { },
      isFileChange: false,
      isUpload: false,
      myFileName: '',
      ind: 0
        // fullscreenLoading: false
    }
  },
  props: ['strategyPhaseId', 'filename'],
  methods: {
      // 话术
    fileChange(event) {
      this.file = event.target.files[0]
      if (this.file) {
        const extension1 = this.file.name.substring(this.file.name.lastIndexOf('.') + 1) === 'doc'
        const extension2 = this.file.name.substring(this.file.name.lastIndexOf('.') + 1) === 'docx'
        const extension3 = this.file.name.substring(this.file.name.lastIndexOf('.') + 1) === 'pdf'
        const is0kb = this.file.size / 1024
        const isLt2M = this.file.size / 1024 / 1024 < 1
        if (!extension1 && !extension2 && !extension3) {
          this.$message({
            message: '上传模板只能是 pdf、doc、docx 格式!',
            type: 'warning',
            customClass: 'element-ui-message'
          })
          document.getElementById('quanquan').value = null
          return
        }
        const fileSize = this.file.name.length
        if (fileSize > 50) {
          this.$message({
            message: '请输入50字符以内的文件名~~',
            type: 'warning',
            customClass: 'element-ui-message'
          })
          return
        }
        if (is0kb === 0) {
          this.$message({
            message: '上传模板不能为0kb',
            type: 'warning',
            customClass: 'element-ui-message'
          })
          return
        }
        if (!isLt2M) {
          this.$message({
            message: '上传模板大小不能超过 1MB!',
            type: 'warning',
            customClass: 'element-ui-message'
          })
          return
        }
        this.isFileChange = true
        if (this.isFileChange) {
          const loading = this.$loading({
            lock: true,
            text: '文件上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.1)'
          })
          const formData = new FormData()
          formData.append('file', this.file)
          upLoad(this.strategyPhaseId, formData)
              .then(res => {
                if (res === true) {
                  clearInterval(this.timer)
                  loading.close()
                  this.myFileName = this.file.name
                  this.$message({
                    message: '文件上传成功',
                    type: 'success',
                    customClass: 'element-ui-message'
                  })
                  this.isUpload = true
                }
                if (res === false) {
                 // clearInterval(this.timer)
                  loading.close()
                  this.$message({
                    message: '文件上传失败',
                    type: 'success',
                    customClass: 'element-ui-message'
                  })
                }
              })
            // this.timer = setInterval(() => {
            //   this.ind ++
            //   if (this.ind >= 1) {
            //     clearInterval(this.timer)
            //     loading.close()
            //     this.$message({
            //       message: '文件上传超时',
            //       type: 'success',
            //       customClass: 'element-ui-message'
            //     })
            //     return false
            //   }
            // }, 1000)
        }
      }
    }
  },
  watch: {
    myFileName() {
      this.isUpload = true
    },
    filename() {
      this.myFileName = this.filename
    }
  }
}
</script>
<style lang="scss">
  .upload_strategy {
    position: relative;
    display: flex;
    .upload_strategy_title {
      position: absolute;
      top:0;
      left: 24%;
    }
    .upload_strategy_form{
      position: absolute;
      top:0;
      left: 30%;
      height: 30px;
      background-color: rgb(247,147,0);
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      text-indent: 0;
      .upload_strategy_p{
        line-height: 20px;
        vertical-align: 20px;
        color: white;
      }
      .upload_strategy_file {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .upload_strategy_button {
    position: absolute;
    top: -2px;
    left:40%;
    vertical-align: middle;
  }
  .upload_strategy_fileName {
    position: absolute;
    top: 2px;
    left:42%;
  }
</style>
