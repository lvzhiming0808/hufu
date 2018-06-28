<template>
	<div class="message-wrapper">
		<div class="header-wrapper">
			<head-bar></head-bar>
		</div>
		<div class="content-wrapper">
			<div class="left">
				<div class="item-wrapper">
					<el-menu
						:default-active="$route.path"
						background-color="#eaeaea"
						class="el-menu-vertical">
						<el-submenu index="/messageCenter">
							<!-- <template slot="title">
								<span>我的消息 <span class="count" v-show="totle">{{totle}}</span></span>
							</template> -->
							<template slot="title">
								<router-link tag="span" to="all">
									<el-menu-item index="/messageCenter/all">
									我的消息 <span class="count" v-show="totle">{{totle}}</span>
									</el-menu-item>
								</router-link>
							</template>
	
							<el-menu-item-group>			
								<router-link tag="span" to="myStrategy">
									<el-menu-item index="/messageCenter/myStrategy">
									我的策略动态 <span class="count" v-show="group">{{group}}</span>
									</el-menu-item>
								</router-link>						
								<router-link tag="span" to="sop" v-if="$checkRole('showSopInMessageCenter')">
									<el-menu-item index="/messageCenter/sop">		
										SOP 反馈 <span class="count" v-show="sop">{{sop}}</span>
									</el-menu-item>
								</router-link>
								<router-link tag="span" to="system">
									<el-menu-item index="/messageCenter/system">
										系统公告 <span class="count" v-show="system">{{system}}</span>   
									</el-menu-item>
								</router-link>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</div>
			</div>
			<div class="right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import HeadBar from '../layout/HeadBar'
export default {
  components: {
    HeadBar
  },
  computed: {
    ...mapGetters('messageCenter', [
      'system',
      'sop',
      'group',
      'totle'
    ])
  }
}
</script>
<style lang="scss" scoped>
.message-wrapper {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.header-wrapper {
		height: 80px;
	}
	.content-wrapper {
		display: flex;
		height: calc(100vh - 80px);
		padding: 30px;
		.left {
			width: 260px;
			background-color: #eaeaea;
			.el-menu-vertical {
				.is-active {
					background-color:white !important; 
				}
				.count {
					width: auto;
					height: 20px;
					padding: 0 5px;
					border-radius: 20px;
					background-color: #f79300;
					vertical-align: top;
					margin-left: 5px;
					color: white;
				}
				.el-submenu__title {
					padding: 0 !important;
				}
			}
		}
		.right {
			padding: 15px;
			width: 100%;
			background-color: white;
		}
	}
}
</style>
<style lang="scss">
</style>

