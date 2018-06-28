<template>
    <div>
        <div class="confirm-main">
            <span class="iconImgs"><icon-svg icon-class="ling" /></span>
            <div class="confirm-title" v-if="title">
                 <h1 class="confirm-text">{{title}}</h1> 
            </div>
            <p class="confirm-content">{{content || '此条录音是否涉及违规'}}已被乔文艳<span class="optal">设为精品</span></p>
            <!-- <div class="confirm-footer">
                <button class="confirm-footer-success" @click="okFn">{{ok || '确定'}}</button>
                <button class="confirm-footer-success" v-if="showModify" @click="modifyFn">{{'修改'}}</button>
                <button class="confirm-footer-default" @click="cancelFn">{{cancel || '取消'}}</button>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
      props: ['title', 'content', 'ok', 'cancel', 'shhowModify'],
      data() {
        return {
        }
      },
      methods: {
        okFn: function() {
          this.$emit('$ok', this.$el)
        },
        cancelFn: function() {
          this.$emit('$cancel', this.$el)
        },
        modifyFn: function() {
          this.$emit('$modify', this.$el)
        }
      }
    }
</script>

<style scoped lang="scss">
.confirm-main{
    width: 300px;
    height: auto;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0px 0px 2px #666;
    padding: 15px 20px 10px 30px;
    box-sizing: border-box;
    position: relative;
    .iconImgs{
        position: absolute;
        left: 5px;
        top: 30px;
        font-size: 20px;
        color: red;
    }
    .confirm-title{
        margin-bottom: 10px;
        font-size: 16px;
    }
    .optal{
        color: green;
    }
}
</style>