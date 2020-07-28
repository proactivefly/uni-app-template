<template>
	<view class="wrapper">
		<view>
			<view>组件</view>
		</view>
		<MyColor color="yellow" @getColor="GGG">
			<view class="h1"></view>
		</MyColor>
	</view>
</template>

<script>
	import SimpleTab from "@/components/simpleTab/simpleTab.vue"
	import MyColor from "@/components/myColor/myColor.vue"
	import { http2Https } from "../../common/tools.js"
	export default {
		data() {
			return {
			};
		},
		methods:{
			GGG(color){
				console.log(color)
			}
		},
		components:{
			MyColor
		},
		onShow(){},
		onLoad(params){
		},
		onShareAppMessage(){
			return {
				title:'卫蓝购',//String	是	分享标题	
				path:'/pages/infomation/index',//String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
				imageUrl:"/static/share.png"
			}
		},
		onShareTimeline(){
			return{
				title:'卫蓝购',
				imageUrl:"/static/share.png"
			}
		}
	}
</script>

<style lang="stylus" scoped>
	
</style>