<template>
	<div class="right-wragger">
		<div class="tottle-role">
			<el-tabs v-model="own">
				<el-tab-pane label="我的" name="0">
					<content-data>
            <table-data slot="table-data"></table-data>
          </content-data>
				</el-tab-pane>
				<el-tab-pane label="全部" name="1">
          <content-data>
            <table-data slot="table-data"></table-data>
          </content-data>
        </el-tab-pane>
			</el-tabs>
		</div>
    <div class="footer">
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="pagination.totalElements"
        :current-page="pagination.number"
        @current-change="changePage">
      </el-pagination>
  </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ContentData from './ContentData'
import TableData from './TableData'
import * as types from '@/store/modules/boutiqueBank/modules/actionTypes'
export default {
  components: {
    ContentData,
    TableData
  },
  methods: {
    ...mapActions('boutiqueBank/speechcraft', [
      types.SET_OWN,
      types.INIT_PAGE,
      types.TOGGLEPAGINATION,
      types.INIT_PAGE1
    ]),
    changePage(value) {
      this[types.TOGGLEPAGINATION](value)
    }
  },
  computed: {
    ...mapGetters('boutiqueBank/speechcraft', [
      'pagination'
    ]),
    own: {
      get() {
        return this.$store.state.boutiqueBank.speechcraft.own
      },
      set(value) {
        if (this.$store.state.boutiqueBank.speechcraft.own === value) return
        this[types.SET_OWN](value)
      }
    }
  },
  mounted() {
    if (this.$route.query.id === '0') {
      this.$store.state.boutiqueBank.speechcraft.own = '0'
      this[types.INIT_PAGE1]()
      return false
    } else if (this.$route.query.id === '1') {
      this.$store.state.boutiqueBank.speechcraft.own = '1'
      this[types.INIT_PAGE1]()
      return false
    } else {
      this[types.INIT_PAGE]()
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: right;
}
</style>

