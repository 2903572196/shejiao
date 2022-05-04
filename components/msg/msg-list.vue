<template>
	<!-- 消息列表组件 -->
	<view class="flex align-center p-2 border-bottom border-light-secondary " hover-class="bg-light">
		<image :src="item.avatar" style="width:80rpx ; height: 80rpx;" class="rounded-circle mr-2" mode=""></image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between ">
				<text class="font-md">{{item.username}}</text>
				<text class="<font-sm></font-sm> text-secondary">{{item.update_time |formatTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis" style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge class="uni-badge-left-margin" :text="item.noread" type="error" size="small"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入时间库
	import $T from "@/common/time.js"
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue"
	export default{
		components:{
				uniBadge,
		},
		props:{
			item:Object,
			index:Number
		},
		// 过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		},
	}
</script>

<style>
</style>
