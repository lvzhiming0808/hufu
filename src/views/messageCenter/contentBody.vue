<template>
	<div class="body-wrapper">
		<contentItem 
			v-for="item in messageList" 
			:key="item.id"
			:subject="item.subject"
			:status="item.status"
			:sendDate="item.sendDate"
			:url="item.url"
			:contentType="item.contentType"
			:id="item.id"
			:subjectType="item.subjectType"
			@seeDetail="seeDetail">
		</contentItem>
	</div>
</template>
<script>
import contentItem from './contentItem'
export default {
  props: ['messageList'],
  components: {
    contentItem
  },
  methods: {
    seeDetail(id) {
      this.$emit('seeDetail', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.body-wrapper {
	height: calc(100vh - 240px);
	overflow: auto;
	.item-wrapper {
		border-bottom: 1px solid #ebebeb;
	}
	.item-wrapper:last-child {
		border-bottom: none;
	}
}

</style>
