<template>
<div class="content-wrapper">
  <div class="detail-select">
    <span style="width: 75px;">筛选维度:</span>
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
      <div class="content-selecter">
        <span style="width: 75px;">优秀类型:</span>
        <div class="picker">
          <el-select 
            v-model="goodType" 
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in goodTypeValue"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <!-- <div class="picker">
          <el-select 
            v-model="itemType" 
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in itemTypeValue"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div> -->
      </div>
    </div>
    <div class="content-select">
    </div>
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
        children: 'cities'
      }
    }
  },
  computed: {
    ...mapGetters('boutiqueBank/record', [
      'status',
      'time',
      'structureValue',
      'goodTypeValue',
      'screeningDimensionValue',
      'sellGroupIdValue',
      'itemTypeValue'
    ]),
    time: {
      get() {
        return this.$store.state.boutiqueBank.record.time
      },
      set(value) {
        this[types.SET_TIME](value)
      }
    },
    screeningDimension: {
      get() {
        return this.$store.state.boutiqueBank.record.screeningDimension
      },
      set(value) {
        this[types.SET_SCREENINGDIMENSION](value)
      }
    },
    itemType: {
      get() {
        return this.$store.state.boutiqueBank.itemType
      },
      set(value) {
        this[types.SET_ITEMTYPE](value)
      }
    },
    structure: {
      get() {
        return this.$store.state.boutiqueBank.record.selectedStructureValue
      },
      set(value) {
      }
    },
    goodType: {
      get() {
        return this.$store.state.boutiqueBank.record.goodType
      },
      set(value) {
        this[types.SET_GOODTYPE](value)
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
    ...mapMutations('boutiqueBank/record', [
      types.SET_TIME,
      types.SET_GOODTYPE,
      types.SET_ITEMTYPE
    ]),
    ...mapActions('boutiqueBank/record', [
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
      this.$store.commit('boutiqueBank/record/' + types.UPDATE_STRUCTUREVALUE, {
        currentId: this.sellGroupIdValue.filter(item => item.id === text)[0].id
      })
      this.$store.commit('boutiqueBank/record/' + types.HANDLE_SELECTEDSTRUCTUREVALUE, {
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
  .record-type {
    width: 100%;
    height: 20px;
  }
  .detail-select {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ededed;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    .select-container {
      margin-right: 5px;
      display: flex;
      .picker {
        margin-right: 5px;
      }
    }
    .content-selecter {
      display: flex;
      align-items: center;
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

