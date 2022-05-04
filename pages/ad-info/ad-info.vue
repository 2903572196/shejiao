<template>
	<!-- 发布页面 -->
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar left-icon="back" :statusBar="true" :border="false" 	@clickLeft="goBack" >
			<view class="flex align-center justify-center w-100">所有人可见<text class="iconfont icon-shezhi"></text></view>
		</uni-nav-bar>


		<!-- 文本域组件 -->

		<textarea v-model="conent" placeholder="说一句话吧" class="uni-textarea p-2" />

		<!-- 多图上传 -->
			<upload-image :show="show" ref="uploadImage" :list="imageList" @change="changeImage"></upload-image>
			<!-- 底部操作条 -->
			<view class="fixed-bottom bg-white align-center flex mr-1" style="height: 85rpx;">
				<!-- 图标按钮 -->
				<view class="iconfont icon-caidan footer-btn animated"  hover-class="pulse"></view>
				<view class="iconfont icon-huati footer-btn animated"  hover-class="pulse"></view>
				<view class="iconfont icon-tupian footer-btn animated" @click="iconClickEvent('uploadImage')"  hover-class="pulse"></view>
				
				<!-- 发送按钮 -->
                  <view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-3 mb-4 animated"
				  hover-class="pulse"
				   style="width: 130rpx; height: 60rpx;">发送</view>
			</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import uploadImage from "../../components/common/upload-image.vue"
	export default {
		components:{
			uniNavBar,uploadImage
		},
		data() {
			return {
				conent:"",
				imageList:[],
				// 是否已经弹出弹出框
				showBack:false
			};
		},
		computed:{
			show(){
				return this.imageList.length>0
			}
		},
		// 监听返回
		onBackPress() {
		  // 保存草稿判断
		  if((this.conent !==''|| this.imageList.length>0) && !this.showBack){
			uni.showModal({
				content:'是否要保存为草稿?',
				showCancel:true,
				cancelText:'不保存',
				confirmText:'保存',
				success:res=>{
					if(res.confirm)	{
						this.store()
					}else{
						// 点击取消时清除缓存
						uni.removeStorage({
							key:"ad-info",
							
						})
					}
					// 手动执行返回
					uni.navigateBack({delta:1})
				},
			})
			this.showBack=true
			  return true
		  }
		},
		onLoad() {
			// 取出保存的内容
			uni.getStorage({
				key:"ad-info",
				success:(res)=>{
					 if(res.data){
						let result= JSON.parse(res.data)  //解析
						this.conent=result.conent
						this.imageList=result.imageList		
						// console.log(result.imageList,"图片")
					 }
				},
				
			})
		},
		methods:{
			// 底部图标点击事件
			iconClickEvent(e){
				switch (e){
					case"uploadImage":this.$refs.uploadImage.chooseImage()
						break;
			
				}
			},
			// 返回
			goBack(){
				// console.log("1")
				uni.navigateBack({ delta: 1 });
				
			},
			// 选中图片
			changeImage(e){
				// console.log(e)
				this.imageList=e
			},
			// 保存草稿功能
			store(){
				let obj={
					conent:this.conent,
					imageList:this.imageList
				}
				console.log(obj,"55")
			  uni.setStorage({
				key:"ad-info",
				data:JSON.stringify(obj)
			})
			}
		}
	}
</script>

<style>
.footer-btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	align-content: center;
    justify-content: center;
	font-size: 50rpx;
	margin-bottom: 40rpx;
}
</style>
