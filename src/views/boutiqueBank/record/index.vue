<template>
  <div class="right-wragger">
    <div v-if="showMeAllTabInboutiqueBankRecord">
      <div class="tottle-role">
        <el-tabs v-model="own">
          <el-tab-pane 
            label="我的" 
            name="0">
            <content-data>
              <table-data slot="table-data" />>
            </content-data>
          </el-tab-pane>
          <el-tab-pane 
            label="全部" 
            name="1">
            <content-data>
              <table-data slot="table-data" />>
            </content-data>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-else>
      <content-data>
        <table-data slot="table-data" />>
      </content-data>
    </div>
    <div class="footer">
      <el-pagination
        layout="prev, pager, next"
        :page-size="60"
        :total="pagination.totalElements"
        :current-page="pagination.number"
        @current-change="changePage" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContentData from './ContentData'
import TableData from './TableData'
import {
  SET_OWN,
  INIT_PAGE,
  TOGGLEPAGINATION,
  INIT_PAGE1
} from '@/store/modules/boutiqueBank/modules/actionTypes'
export default {
  components: {
    ContentData,
    TableData
  },
  methods: {
    ...mapActions('boutiqueBank/record', [
      SET_OWN,
      INIT_PAGE,
      TOGGLEPAGINATION,
      INIT_PAGE1
    ]),
    changePage(value) {
      this[TOGGLEPAGINATION](value)
    }
  },
  computed: {
    ...mapGetters('boutiqueBank/record', [
      'pagination'
    ]),
    own: {
      get() {
        return this.$store.state.boutiqueBank.record.own
      },
      set(value) {
        if (this.$store.state.boutiqueBank.record.own === value) return
        this[SET_OWN](value)
      }
    },
    showMeAllTabInboutiqueBankRecord() {
      return this.$checkRole('showMeAllTabInboutiqueBankRecord')
    }
  },
  created() {
    if (this.$route.query.ida === '0') {
      this.$store.state.boutiqueBank.record.own = '0'
      this[INIT_PAGE1]()
      return false
    } else if (this.$route.query.ida === '1') {
      this.$store.state.boutiqueBank.record.own = '1'
      this[INIT_PAGE1]()
      return false
    } else {
      this[INIT_PAGE]()
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: right;
}
</style>

