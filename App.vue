<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			// 网络监听
			// 初始化数据
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	/* 引入自定义图标库 */
	@import "./common/icon.css";
	/* 引入动画css */
	@import "./common/animate.css";
	@import "./common/free.css";
	/* 引入项目公共样式 */
	@import "./common/common.css";
</style>
