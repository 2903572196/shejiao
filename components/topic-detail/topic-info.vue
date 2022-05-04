<template>
	<!-- 分类详情头部组件 -->
	<view>
	<view class="position-relative">
				   <image :src="info.cover" mode="aspectFill" style="height: 300rpx;" class="w-100 filter"	></image>
		</view>
		<view class="position-relative bg-white px-2" style="z-index: 10; padding-bottom: 30rpx;">
				   <view class="flex">
					   <image :src="info.cover" style="width: 150rpx; height: 150rpx; margin-top: -75rpx;" class="rounded mr-2" mode=""></image>
					   <text class="font-md">#{{info.title}}#</text>
				   </view>
				   <view class="flex align-center font text-secondary mt-1">
					   <text class="mr-2">动态：{{info.news_count}}</text>
					   <text>今日：{{info.today_count}}</text>
				   </view>
				   <view class="text-secondary font-md">{{info.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info']
	}
</script>

<style>
</style>
