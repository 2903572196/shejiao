<template>
	<view>
		<!-- 消息列表 -->
		<template v-if="list.length>0">
			<block v-for="(item,index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>

		<template v-else>
			<no-thing></no-thing>
		</template>


		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view style="background-color: #fff;">
				<view class="flex align-center justify-center font-md border-bottom py-2" hover-class="bg-light" @click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text> 添加好友
				</view>
				<view class="flex align-center justify-center font-md py-2" hover-class="bg-light" @click="popupEvent('clear')">
					<text class="iconfont icon-shanchu mr-2"></text> 清除列表
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [{
			avatar: '/static/demo/userpic/12.jpg',
			username: '绝版公子',
			update_time: 1650956668,
			data: '兼顾法律的大苏打撒旦了',
			noread: 10
		},
		{
			avatar: '/static/demo/userpic/12.jpg',
			username: '绝版公子',
			update_time: 1650956668,
			data: '兼顾法律的大苏打撒旦了兼顾法律的大苏打撒旦了兼顾法律的大苏打撒旦了',
			noread: 1
		},
		{
			avatar: '/static/demo/userpic/12.jpg',
			username: '绝版公子',
			update_time: 1650956668,
			data: '兼顾法律的大苏打撒旦了',
			noread: 6
		},
		{
			avatar: '/static/demo/userpic/12.jpg',
			username: '绝版公子',
			update_time: 1650956668,
			data: '兼顾法律的大苏打撒旦了',
			noread: 2

		}
	]


	import msgList from "@/components/msg/msg-list.vue"
	import noThing from "@/components/common/no-thing.vue"
	import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
	export default {
		components: {
			msgList,
			noThing,
			uniPopup
		},
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.list = demo

		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		// 监听原生导航栏的按钮事件
		onNavigationBarButtonTap(e) {
			console.log(e)
			switch (e.index) {
				case 0: //点击了左边
				// 关闭弹出层
				this.$refs.popup.close()
					break;
				case 1: //点击了右边
					this.$refs.popup.open()
					break;
			}
		},
		methods: {

			refresh() {
				setTimeout(() => {
					this.list = demo
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 2000)
			},
			// 弹出层选项点击事件
			popupEvent(e) {
				switch (e) {
					case 'friend':
					console.log("添加好友")
						break;
					case 'clear':
						console.log("删除列表")
						break;
				}
				// 关闭弹出层
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="less">

</style>
