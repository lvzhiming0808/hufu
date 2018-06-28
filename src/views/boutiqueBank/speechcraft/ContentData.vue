<template>
<div class="content-wrapper">
  <div class="detail-select">
    <span style="margin-right: 10px;">筛选维度:</span>
    <div class="select-container">
      <div class="picker">
        <el-cascader
          expand-trigger="hover"
          :options="screeningDimensionValue"
          v-model="screeningDimension"
          size="mini">
        </el-cascader>
      </div>

      <div class="picker" style="margin-right: 40px" v-if="showTime">
        <el-date-picker
          v-model="time"
          size="mini"
          :type="selectHolder.type"
          :format="selectHolder.format"
          :placeholder="selectHolder.placeholder">
        </el-date-picker>
      </div>

      <div class="picker" style="margin-right: 40px" v-else>
        <el-cascader
          :options="structureValue"
          @active-item-change="handleItemChange"
          :props="props"
          v-model="structure"
          @change="handleStructureChange"
          size="mini"
        ></el-cascader> 
      </div>
    </div>
    <slot name="content-type-selecter"></slot>
    <div class="btn-wrapper">
      <el-button type="primary" size="mini" @click="handleSearch">确定</el-button>
      <el-button type="primary" size="mini" @click="handleReset" plain>重置</el-button>
    </div>
  </div>

  <div class="tool-bar">
    <span 
      class="download"
      @click="handleDownload">下载</span>  
  </div>  
  <div class="content">
    <slot name="table-data"></slot>
  </div>
</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as types from '@/store/modules/boutiqueBank/modules/actionTypes'
export default {
  data() {
    return {
      selectHolder: {
        format: 'yyyy 第 WW 周',
        placeholder: '选择周',
        type: 'week'
      },
      showTime: false,
      props: {
        value: 'label',
        children: 'cities'
      }
    }
  },
  computed: {
    ...mapGetters('boutiqueBank/speechcraft', [
      'time',
      'structureValue',
      'goodTypeValue',
      'screeningDimensionValue',
      'sellGroupIdValue',
      'pagination'
    ]),
    time: {
      get() {
        return this.$store.state.boutiqueBank.speechcraft.time
      },
      set(value) {
        this[types.SET_TIME](value)
      }
    },
    screeningDimension: {
      get() {
        return this.$store.state.boutiqueBank.speechcraft.screeningDimension
      },
      set(value) {
        this[types.SET_SCREENINGDIMENSION](value)
      }
    },
    structure: {
      get() {
        return this.$store.state.boutiqueBank.speechcraft.selectedStructureValue
      },
      set(value) {

      }
    }
  },
  watch: {
    screeningDimension(newValue, oldValue) {
      if (newValue.length === 2) {
        this.showTime = true
        if (newValue[1] === 'week') {
          this.selectHolder = {
            format: 'yyyy 第 WW 周',
            placeholder: '选择周',
            type: 'week'
          }
        } else {
          this.selectHolder = {
            format: '',
            placeholder: '选择月',
            type: 'month'
          }
        }
      } else {
        this.showTime = false
      }
    }
  },
  methods: {
    ...mapMutations('boutiqueBank/speechcraft', [
      types.SET_TIME
    ]),
    ...mapActions('boutiqueBank/speechcraft', [
      types.UPDATE_STRUCTUREVALUE,
      types.HANDLE_SEARCH,
      types.HANDLE_RESET,
      types.HANDLE_DOWNLOAD,
      types.SET_SCREENINGDIMENSION
    ]),
    handleItemChange(value) {
      this[types.UPDATE_STRUCTUREVALUE](value)
    },
    handleStructureChange(value) {
      const text = value[value.length - 1]
      this.$store.commit('boutiqueBank/speechcraft/' + types.UPDATE_STRUCTUREVALUE, {
        currentId: this.sellGroupIdValue.filter(item => item.name === text)[0].id
      })
      this.$store.commit('boutiqueBank/speechcraft/' + types.HANDLE_SELECTEDSTRUCTUREVALUE, {
        i: 3,
        text
      })
      this.handleSearch()
    },
    handleSearch() {
      this[types.HANDLE_SEARCH]()
    },
    handleReset() {
      this[types.HANDLE_RESET]()
    },
    handleDownload() {
      this[types.HANDLE_DOWNLOAD]()
    },
    pageChange(page) {
      this.pageNum = page
      this.handleSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.content-wrapper {
  padding: 0 20px;
  .detail-select {
    width: 100%;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #ededed;
    margin-bottom: 20px;
    justify-content: flex-start;
    display: flex;
    .select-container {
      margin-right: 5px;
      display: flex;
      .picker {
        margin-right: 5px;
      }
    }
    .btn-wrapper {
      display: flex;
    }
  }
  .tool-bar {
    display: flex;
    justify-content: flex-start;
    color: #72ACE3;
    .download {
      width: 80px;
      height: 30px;
      background-color: #f5a623;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      color: #fff;
    }
    .share{
      margin-left: 15px;
    }
  }
  .content {
    margin-top: 10px;
  }
  .footer {
    float: right;
    margin-right: 15px;
  }
}

</style>

