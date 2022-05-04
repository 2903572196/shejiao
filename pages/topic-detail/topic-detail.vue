<template>
	<view>
		<topic-info :info="info"></topic-info>
		<fengexian></fengexian>

		<view class="p-2 flex align-center border-bottom" hover-class="bg-light" v-for="(item,index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font  text-dark text-ellipsis">
				{{item.title}}
			</text>
		</view>

		<fengexian></fengexian>

		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center  " v-for="(item,index) in tabBars" :key="index" :class="index===tabIndex?'font-lg font-weight-bold text-main':'font-md'"
			 @click="changeTab(index)">{{item.name}}</view>

		</view>
		<!-- 列表 -->
		<!-- 判断 listData数据长度 -->
		<template v-if="listData.length>0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<fengexian></fengexian>
			</block>
		</template>
		<template v-else>
		<no-thing></no-thing>
		</template>
	  <!-- 上拉加载 -->
	  <load-more :loadmore="loadtext"></load-more>
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
	import topicInfo from "@/components/topic-detail/topic-info.vue"
	import commonList from '@/components/common/common-list.vue'
	import noThing from "@/components/common/no-thing.vue"
	import loadMore from "@/components/common/load-more.vue"

	export default {
		components: {
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 2,
					news_count: 10
				},
				hotList: [{
						title: '【新人必读】失败乃成功之名'
					},
					{
						title: ' 【新人必读】三国演义'
					}
				],
				tabIndex: 0, //当前选中项
				tabBars: [{
						name: '默认'
					},
					{
						name: '最新'
					}
				],
				// 默认列表
				list1: [],
				loadtext1:"上拉加载更多",
				// 最新列表
				list2: [],
				loadtext2:"上拉加载更多"
			

			}
		},
		onLoad(e) {
			// console.log(e.detail)
			if (e.detail) {
				let res = JSON.parse(e.detail)
				// console.log(res)

			}
			this.list1 = demo


		},
		computed: {
         // 当前列表数据
			listData() {
				// 判断是默认列表还是最新列表
				if (this.tabIndex === 0) {
					return this.list1
				} else {
					return this.list2
				}
			},
			// 当前上拉加载
			loadtext(){
				if(this.tabIndex===0){
					return this.loadtext1
				}else{
					return this.loadtext2
				}
			}
		},
		// 触底事件(uni的生命周期)
          onReachBottom() {
          	// console.log('loadtext'+(this.tabIndex+1))
			this.loadMore()
          },
		methods: {
			// 导航切换点击事件
			changeTab(index) {
				// console.log(index)
				this.tabIndex = index
			},
			// 上拉加载更多
			loadMore(){
				// 拿到当前的列表
				let index=this.tabIndex
				// 判断是否处于可加载状态
				if(this.loadtext!=="上拉加载更多") return;
				// 设置上拉加载状态处于可加载状态
			   this['loadtext'+(index+1)] ='加载中...'
				// 请求数据
				setTimeout(()=>{
					   this['list'+(index+1)] = [...this['list'+(index+1)],...this['list'+(index+1)]]
					   this['loadtext'+(index+1)] ='上拉加载更多'
				},2000)
			}
		}
	}
	
</script>

<style>
	.filter {
		filter: blur(4px)
	}
</style>
