<template>
	<view class="wrapper">
		<view class="padding bg-white">
			<view class="h1" @click="show1=!show1">数据响应式</view>
			<input type="text" v-model="name" placeholder="请输入名字">
			<view>我输入的名字是：{{name}}</view>
			
			
			<!--  -->
			<view class="h1" @click="show2=!show2">计算属性</view>
			<view v-if="show2">我是计算属性的值:{{comname}}</view>
			
			
			<!-- 动态添加响应式属性 -->
			<view class="h1" @click="show4=!show4">动态添加响应式属性</view>
			
			<block v-if="show4">
				<view>姓名：{{obj.name}}</view>
				<view @click="addAge">年龄：{{obj.age}}</view>
			</block>
			
			<!--  -->
			<view class="h1">数据监听</view>
			
			
			<!--  -->
			<view class="h1" @click="show3=!show3">数据循环</view>
			<view class="c" v-if="show3">
				<view class="item" v-for="(item,index) in arr1" :key="index">索引{{index}}=>{{item}}</view>
			</view>
			
			<!--  -->
			
			<view class="h1">页面跳转：注意</view>
			<button @click="go">页面跳转</button>
			<button @click="goSwitch">跳转switch页面</button>
		</view>
	</view>
</template>

<script>
	import { http2Https } from "../../common/tools.js"
	export default {
		data() {
			return {
				name:"",
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				arr1:[1,2,3,4,5],
				obj:{
					name:'姓名',
					// age:""
				}
			};
		},
		computed: {
			comname() {
				return this.name+"----往哪跑"
			}
		},
		methods:{
			addAge(){
				console.log("执行了添加年龄")
				this.obj.age=18
				console.log(this.obj)
			},
			go(){
				uni.navigateTo({
					url:"/pages/newPage/newPage"
				})
			},
			goSwitch(){
				uni.switchTab({
					url:"/pages/personal/info"
				})
			}
		},
		onLoad(){ //生命周期
		},
		
		onShow(){ //生命周期
		},
		
		watch:{
			name:(newVal,oldNew)=>{
				console.log("新数据："+newVal,"老数据："+oldNew)
			}
		},
		onShareAppMessage(){
			return {
				title:'卫蓝购',//String	是	分享标题	
				path:'/pages/infomation/index',//String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
				imageUrl:"/static/share.png"
			}
		},
		onShareTimeline(){ //分享到朋友圈
			return{
				title:'卫蓝购',
				imageUrl:"/static/share.png"
			}
		}
	}
</script>

<!-- 代表用的是stylus语法 -->
<style lang="stylus" scoped>
		.wrapper
			.h1
				font-size:30upx
				margin:30upx auto
				font-weight:bold
				color:#1e1e1e
</style>