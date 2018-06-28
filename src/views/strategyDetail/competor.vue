<template>
  <div class="detail_strategy_basic">
    <p class="detail_strategy_basicNews">竞争对手</p>
    <div class="detail_strategy_question">
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">主要竞争对手:</p>
        <div class="strategy_item_description">
          <p>{{strategy.competitor}}</p>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">主推学历或专业:</p>
        <div class="strategy_item_description">
          <p>{{strategy.compareContent}}</p>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">竞争对手价格:</p>
        <div class="strategy_item_description">
          <p>{{strategy.comparePrice}}</p>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">竞争对手截杀:</p>
        <div class="strategy_item_description">
          <p>{{strategy.compareKill}}</p>
        </div>
      </div>
      <div class="strategy_firstQuestion_item">
        <p class="strategy_firstQuestion">尚德优势分析:</p>
        <div class="strategy_item_description">
          <p>
            {{strategy.analyzeAdvantage}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      strategy: Object
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
  .detail_strategy_basic{
    margin-top: 10px;
    .detail_strategy_basicNews{
      color: rgb(247, 147, 0);
      font-size: 18px;
    }
    .detail_strategy_question{
      margin-top: 30px;
      font-size: 16px;
      .strategy_firstQuestion_item{
        display: flex;
        width: 100%;
        margin-bottom: 30px;
        .strategy_firstQuestion{
          margin-right: 20px;
          width: 16%;
          text-align: right;
        }
        .strategy_item_description{
          width: 80%;
          .el-form-item{
            margin-top: 10px;
            margin-bottom: 10px;
            .el-form-item__content{
              margin-left: 0 !important;
              width: 80%;
              .el-input{
                width: 90%;
              }
            }
          }
        }
      }
    }
  }
</style>
