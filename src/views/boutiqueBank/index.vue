<template>
  <div class="boutique-bank-wrapper">
    <div class="left-wrapper">
      <left></left>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import Left from './left'
  export default {
    data() {
      return {}
    },
    components: {
      Left
    }
  }
</script>
<style lang="scss">
.boutique-bank-wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
}
.el-menu{
  border-right:none;
}
.leftbox{
  float: left;
  background: #222334;
  text-align: right;
  width: 175px;
  height: 100%;
  position: relative;
  .leftb{
    border-bottom: 1px solid #2e3045;
    .active .text {
      color: #f79300;
    }
  }
  a{
    color: #7d7fa0;
    .el-button--text{
      color: #7d7fa0;
      padding-right: 15px;
    }
    .default{
      color: #f79300;
    }
    .el-button--text:hover{
      color: #f79300;
    }
  }
}
.right-wragger{
  width: 100%;
  margin: 20px 30px 0px 30px;
  background: #fff;
  height: auto;
  overflow: auto;
  position: relative;
  .el-tabs{
    .el-tabs__header{
      margin-bottom: 10px;
      .el-tabs__nav-wrap{
        .el-tabs__nav-scroll{
          .el-tabs__nav{
            width: 100%;
            .el-tabs__item{
              width: 50%;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .el-tabs__nav-wrap{
    margin: 0px 20px;
  }
  .righttitle{
    padding-left: 0px;
    margin-bottom: 15px;
    .rightspanbg{
      background: #f79300;
      padding-left: 4px;
    }
    .rightspanbg2{
      padding-left: 10px;
    }
  }
  .rightcont{
    padding-left: 15px;
    .righctop{
      overflow: hidden;
      border-bottom: 1px solid #ededed;
      margin-left: 1px;
      margin-top: 16px;
    }
    .leftcontflot2{
      float: left;
      width: 3%;
      text-align: center;
      line-height: 30px;
      margin-right: 2px;
    }
    .leftcontflot{
      float: left;
      width: 25%;
      .el-form-item__label{
        text-align: right;
      }
    }
    .leftinputleft{
      width: 20%;
      .el-date-editor.el-input{
        width: 100%;
      }
    }
    .leftcontflotright2{
      margin-right: 10px;
    }
    .leftcontflotright{
      float: right;
      padding-right: 20px;
    }
    .el-select__caret,
    .el-input__ic {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
    .el-icon-arrow-down:before,
    .el-icon-arrow-up:before {
      content: "";
    }
    .el-icon-arrow-up {
      position: absolute;
      top: 12px;
      right: 5px;
      border-bottom: 6px solid #f79300;
    }
    .righcent{
      .down{
        margin: 15px 0px;
      }
      .righcentlist{
        .el-checkbox__label:hover{
          color: #f79300;
        }
        li{
          margin:10px 0px;
        }
        .el-checkbox__label{
          color: #000;
          span{
            color: #c8c8c8;
            margin-left: 20%;
          }
        }
      }
      .righcentlistbtn{
        float: right;
        margin: 30px 10px 30px 0px;
        .el-pager li{
          color:#c8c8c8;
        }
        .el-pager li:hover {
          color: #f79300;
        }
      }
    }
  }
}



// /*滚动条 start*/
// ::-webkit-scrollbar {
//   width: 1px;
//   height: 4px;
//   background-color: #F5F5F5;
// }
// /*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
//   background: #fff ;
// }
// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 3px;
//   box-shadow: inset 0 0 6px rgba(0,0,0,.3);
//   // background-color:rgba(7, 170, 247, 0.7);
//   background-color: transparent;
// }
// ::-webkit-scrollbar-thumb:hover {
//   border-radius: 3px;
//   box-shadow: inset 0 0 6px rgba(0,0,0,.3);
//   background-color:rgba(7, 170, 247, 1);
// }

</style>
