<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @clickRight="openAddInfo">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<!-- <view class="font-lg text-main mx-1">关注</view> -->
				<view :class="tabIndex===index ?'text-main font-lg':'font-md text-light-muted'" class=" mx-1" v-for="(item,index) in tabBar"
				 :key="index" @click="changeTab(index)">{{item.name}}</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>



		<swiper :current="tabIndex" :style="'height:'+scrollH+'px'" :duration="150" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'" @scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<fengexian></fengexian>
					</block>
					<load-more :loadmore="loadmore"></load-more>

				</scroll-view>
			</swiper-item>


			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>


					<!-- 搜索框 -->
					<view class="p-2">
						<view class="flex align-center justify-center py-2 bg-light rounded text-secondary">
							<text class="iconfont icon-sousuo mr-2"></text>搜索话题
						</view>
					</view>
					
					<!-- 轮播图 -->
					<swiper class="p-1 pb-1" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(item,index) in bannerImage" :key="index">
						  <image :src="item.url" mode="" style="height: 300rpx;"class="w-100 rounded"></image>
						</swiper-item>
					
					
					</swiper>
					<fengexian></fengexian>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
         <!-- 话题列表组件  -->
		 <block v-for="(item,index) in topicList" :key="index">
			 	   <topic-list :item="item" :index="index"></topic-list>
		 </block>
				</scroll-view>
			</swiper-item>
			
		</swiper>
	</view>
</template>


<script>
	const demo = [{
			username: "昵称",
			userpic: '/static/default.jpg', //头像
			newstime: '2022-04-21 上午9:49', //时间
			isFollow: true,
			title: '我是标题',
			titlepic: '/static/demo/datapic/11.jpg', //封面图
			support: {
				type: 'support', //顶
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 3, //评论
			share_num: 2 //分享
		},
		{
			username: "昵称",
			userpic: '/static/default.jpg', //头像
			newstime: '2022-04-21 上午9:49', //时间
			isFollow: true,
			title: '我是标题',
			titlepic: '/static/demo/datapic/11.jpg', //封面图
			support: {
				type: 'unsupport', //踩
				support_count: 1,
				unsupport_count: 1
			},
			comment_count: 3, //评论
			share_num: 2 //分享
		},
		{
			username: "昵称",
			userpic: '/static/default.jpg', //头像
			newstime: '2022-04-21 上午9:49', //时间
			isFollow: true,
			title: '我是标题',
			titlepic: '/static/demo/datapic/11.jpg', //封面图
			support: {
				type: '', //未操作
				support_count: 1,
				unsupport_count: 1
			},
			comment_count: 0, //评论
			share_num: 0 //分享
		}
	]
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import commonList from "@/components/common/common-list.vue"
	import loadMore from "@/components/common/load-more.vue"
	import hotCate from "@/components/news/hot-cate.vue"
	import topicList from "@/components/news/topic-list.vue"
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				tabIndex: 0,
				scrollH: 500,
				// newsList: [],
				// 关注列表
				list: [],
				//1.上拉加载更多 2.加载中...  3.没有更多
				loadmore: "上拉加载更多",
				tabBar: [{
						name: '关注'
					},
					{
						name: '话题'
					}
				],
				hotCate: [{
						name: "关注"
					},
					{
						name: "推荐"
					},
					{
						name: "体育"
					},
					{
						name: "热点"
					},
					{
						name: "财经"
					},
					{
						name: "娱乐"
					}
				],
				// 轮播图数据
				bannerImage:[
					{
						url:'/static/demo/banner1.jpg'
					},
					{
						url:'/static/demo/banner2.jpg'
					},
					{
						url:'/static/demo/banner3.jpg'
					}
				],
				// 话题列表数据
				topicList:[
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					},
					{
						cover:'/static/demo/topicpic/1.jpeg',
						title:'话题名称',
						desc:'话题描述',
						today_count:0,
						news_count:10
					}
				]

			};
		},
		onLoad() {
			uni.getSystemInfo({
					success: res => { // console.log(res)
						this.scrollH = res.windowHeight - res.statusBarHeight - 44
					}
				}),
				// 加载测试数据
				this.list = demo
		},
		methods: {
			// 打开发布页
			openAddInfo() {
				uni.navigateTo({
					url: '../ad-info/ad-info'
				})
			},
			changeTab(index) {
				this.tabIndex = index
			},
			// 滑动监听
			onChangeTab(e) {
				// 拿到索引赋给tabIndex来实现切换
				this.tabIndex = e.detail.current
			},
			// 顶踩操作事件
			doSupport(e) {
				//拿到用户当前对象
				let item = this.list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				//判断之前是否已经顶踩
				// 之前没有操作过
				if (item.support.type === '') {
					// item.support.type=e.type
					item.support[e.type + '_count']++ //点击后累加	

				} else if (item.support.type === "support" && e.type === "unsupport") {
					// 之前顶了,我们现在想踩，那么就让顶减一
					// 顶减1，踩加1
					item.support.support_count--;
					item.support.unsupport_count++;
				} else if (item.support.type === "unsupport" && e.type === "support") {
					// 之前踩了,我们现在想顶，那么就让踩减一
					// 顶加1，踩减1
					item.support.support_count++;
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({
					title: msg + '成功'
				})


				// console.log(e.type)
				// console.log(e.index)

			},
			loadmoreEvent() {
				// 判断是否处于可加载状态
				if (this.loadmore !== "上拉加载更多") return;
				// 修改当前列表的加载状态
				this.loadmore = "加载中..."
				// 模拟数据请求
				setTimeout(() => {
					// 加载数据
					this.list = [...this.list, ...this.list]
					// 恢复加载状态
					this.loadmore = "上拉加载更多"
				}, 2000)

			}
		}

	}
</script>

<style>

</style>
