<template>
	<!-- 首页列表组件	 -->
	<view class="p-2">
		<!-- 头像昵称	/关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image :src="item.userpic" @click="openSpace" class="rounded-circle mr-2" style="width: 65rpx; height: 65rpx;  margin-right: 20rpx;"
				 lazy-load mode=""></image>
				<!-- 昵称以及发布时间 -->
				<view class="">
					<view class="font" style=" line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted">{{item.newstime}}</text>
				</view>
			</view>
			<!-- 右边按钮 -->
			<view @click="follow" v-if="!item.isFollow"  class="flex align-center justify-center bg-main text-white animated " hover-class="pulse" style="width: 90rpx; ;height:50rpx ; 
				border-radius: 5rpx;">
				关注
			</view>
			
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">{{item.title}}</view>
		<!-- 图片 -->
		<image v-if="item.titlepic" :src="item.titlepic" style="height: 350rpx; width: 100%; border-radius: 5rpx;" mode=""></image>
		<!-- 图片按钮 -->
		<view class="flex align-center">
			<!-- 顶 -->
			<view class="flex align-center justify-center flex-1 animated faster"
			  :class="item.support.type==='support'?'supports-active':''"
			 hover-class="jello  text-main" @click="doSupport('support')">
				<text class="iconfont icon-dianzan2" style="margin-right: 20rpx;"></text>
				<text>{{item.support.support_count>0 ? item.support.support_count :'支持'}}</text>
			</view>
			<!-- 踩 -->
			<view class="flex align-center justify-center flex-1  animated faster" 
			 :class="item.support.type==='unsupport'?'supports-active':''"
			 hover-class="jello text-main" @click="doSupport('unsupport')">
				<text class="iconfont icon-cai" style="margin-right: 20rpx;"></text>
				<text>{{item.support.unsupport_count>0?item.support.unsupport_count:'反对'}}</text>
			</view>
	
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
				<text class="iconfont icon-pinglun2" style="margin-right: 20rpx;"></text>
				<text>{{item.comment_count>0 ? item.comment_count:'评论'}}</text>
			</view>
	
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
				<text class="iconfont icon-fenxiang" style="margin-right: 20rpx;"></text>
				<text>{{item.share_num >0 ?item.share_num:'分享'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:	{
					item:Object,
					index:Number
		},
		methods:{
			// 头像点击事件
			openSpace(){
				console.log("openSpace")
			},
			// 关注
			follow(){
				// console.log("关注")
				// this.item.isFollow=true
				// 通知父组件
				this.$emit('follow',this.index)
			},
			openDetail(){
				console.log("标题")
			},
			// 顶踩操作
			doSupport(type){
				// console.log(type,"顶踩操作")
				// 通知父组件
				this.$emit("doSupport",{
					type:type,
					index:this.index
					
				})
			}
		}
	}
</script>

<style>
	.supports-active{
		color:#FF4A6A;
	}
</style>
