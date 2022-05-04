<template>
<view class="">
	<view class="flex align-center justify-between px-2">
		<text class="font-md">热门分类</text>
		<view class="flex align-center font text-secondary animated" @click="openMore" hover-class="pulse">
			更多 <text class="iconfont icon-jinru"></text>
		</view>
	</view>
	<view class="flex align-center py-3 px-2 border-bottom justify-center ">
		<view class="border rounded bg-light mx-1 px-2 animated " hover-class="pulse" v-for="(item,index) in hotCate" :key="index" @click="openDetail(item)">{{item.name}}</view>
	
	</view>
</view>
</template>

<script>
	export default{
		props:['hotCate'],
		methods:{
			openMore(){
				console.log("更多")
				uni.navigateTo({
					url:'../../pages/topic-nav/topic-nav',
					
				})
			},
			openDetail(item){
				console.log("打开话题分类页")
			}
		}
		}
</script>

<style>
</style>
