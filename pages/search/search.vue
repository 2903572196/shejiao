<template>
	<view>
		<template v-if="searchList.length===0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" 
				hover-class="bg-light" v-for="(item,index) in list" :key="index"
				@click="clickSearch(item)"
				>{{item}}</view>
			</view>
		</template>
		<template v-else>
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>

	</view>

</template>

<script>
	// 测试数据
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
	export default {
		components: {
			commonList,
		},
		data() {
			return {
				searchText: '',
				list: ['nui-app', 'vue', 'react', 'Java', 'php', "JavaScript"],
				// 搜索结果
				searchList: []
			}
		},
		// 监听搜索框输入的内容
		onNavigationBarSearchInputChanged(e) {
			// console.log(e.text )
			this.searchText = e.text
		},
		// 监听导航搜索按钮
		onNavigationBarButtonTap(e) {
			// console.log(e)
			if (e.index === 0) {
				this.seachEvent()
			}
		},
		methods: {
			// 点击搜索历史
			clickSearch(text){
				this.searchText=text
					this.seachEvent()
				},
			seachEvent() {
				// 第一步收起键盘
				uni.hideKeyboard()
				// 显示loading状态
						uni.showLoading({
							title: '加载中...',
							mask:false
						});
				// 第二步请求搜索
				setTimeout(()=>{
					this.searchList=demo
						// 隐藏loading状态
						uni.hideLoading()
				},2000)
			}
		}
	}
</script>

<style lang="less">

</style>
