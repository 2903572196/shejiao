<template>
	<view>
		<!-- 顶部选项卡-->
		<scroll-view scroll-x="true" style="height: 100rpx;" class="scroll-row border-bottom border-white"
		 scroll-with-animation :scroll-into-view="scrollInto">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-5 py-3 font-md " :id="'tab'+index"
			 :class="tabIndex===index ?'text-main font-lg font-weight-bold':''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<swiper :style="'height:'+scrollH+'px'" :duration="500" :current="tabIndex" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<!-- 首页列表样式 -->
					<!-- 当列表有数据显示这个 -->
				     <template v-if="item.list.length>0">
				     	<block v-for="(item2,index2) in item.list" :key="index2">
				     		<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
				     		<fengexian></fengexian>
				     	</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
				     </template>
					 <!-- 当列表没有数据显示这个部分 -->
					 <template v-else>
					 <no-thing></no-thing>
					 </template>
				
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
			isFollow: false,
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
			isFollow: false,
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
			isFollow: false,
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
	import commonList from "@/components/common/common-list.vue"
	import loadMore from "@/components/common/load-more.vue"


	export default {
		components: {
			commonList,
			loadMore

		},
		data() {
			return {
				// 列表的高度
				scrollH: 600,
				scrollInto: '',
				tabIndex: 0,
				tabBars: [{
						name: "关注"
						// id: 1
					},
					{
						name: "推荐"
						// id: 2
					},
					{
						name: "体育"
						// id: 3
					},
					{
						name: "热点"
						// id: 4
					},
					{
						name: "财经"
						// id: 5
					},
					{
						name: "娱乐"
						// id: 6
					},
					{
						name: "军事"
						// id: 7
					},
					{
						name: "历史"
						// id: 8
					},
				],
				newsList: []
			}
		},
		// 监听点击导航栏搜索框
		onNavigationBarSearchInputClicked(){
                 uni.navigateTo({
                 	url:'../search/search',//跳转到那个页面的地址
                 })
		},
		// 监听导航按钮点击事件
	     onNavigationBarButtonTap() {
	     	uni.navigateTo({
				url:"../ad-info/ad-info"
			})
	     },
		onLoad() {
			// 页面加载获取系统高度信息---可以获取当前系统的宽高等各种信息
			uni.getSystemInfo({
					success: res => {// console.log(res)
						res.windowHeight - uni.upx2px(101)
					}
				}),
				// 根据选项生成列表
				this.getData()
		},
		methods: {
			// 获取数据
			getData() {
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					// 生产列表模板
					let obj = {
						//loadmore的三个状态： 1.上拉加载更多 2.加载中 3.没有更多
						loadmore: "上拉加载更多",
						list: []
					}
					// 判断那个页面有数据
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			follow(e) {
				// 关注
				// console.log(e,"关注")
				this.list[e].isFollow = true
				uni.showToast({
					title: "关注成功"
				})
			},
			// 顶踩操作
			doSupport(e) {
				//拿到用户当前对象
				let item = this.newsList[0].list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				//判断之前是否已经顶踩
				// 之前没有操作过
				if (item.support.type === '') {
					// item.support.type=e.type
					item.support[e.type + '_count']++ //点击后累加	

				} else if (item.support.type === 'support' && e.type === 'unsupport') {
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
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				// 滚动到指定元素上
				this.scrollInto = 'tab' + index

			},
			// 监听滑动
			onChangeTab(e) {
				// console.log(e.detail.current)
				this.scrollH = this.changeTab(e.detail.current)

			},
			loadmore(index) {
				// 先拿到当前列表
				let item = this.newsList[index]
				// 判断是否处于可加载状态
				if (item.loadmore !== "上拉加载更多") return;
				// 修改当前列表的加载状态
				item.loadmore = "加载中..."
				// 模拟数据请求
				setTimeout(() => {
					// 加载数据
					item.list = [...item.list, ...item.list]
					// 恢复加载状态
					item.loadmore = "上拉加载更多"
				}, 2000)
			}


		}
	}
</script>

<style>



</style>
