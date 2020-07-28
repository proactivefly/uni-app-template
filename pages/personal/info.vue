<template>
	<view class="wrapper">
		<!-- 个人中心 -->
		<view class="persion_page" v-if='hasLogin'>
			<image :src="bg" class="response bg"></image>
			<view class='position' :style="[{top:StatusBar + CustomBar+'px'}]">
				<view class="info_w">
					<view class="info">
						<view class="txt">
							<view style="hi">Hi</view>
							<view class='name'>
								<text class='xingming'>{{userInfo.name}}</text>
								<text class='no' v-if='role!="client"'>工号：{{userInfo.code}}</text>
							</view>
							<view class="role" v-if="role!='client'">{{userInfo.deptName?userInfo.deptName:'- -'}}</view>
							<view class="edit" v-if="role=='client'" @click="editUserInfo">
								<text class='edit_txt'>修改个人信息</text>
								<image src="../../static/icon_yjt@2x.png"></image>
							</view>
						</view>
						<view class="avatar">
							<open-data type="userAvatarUrl" class="wechat_avatar"></open-data>
						</view>
					</view>
					
					<view class="desc">
						<block v-if="role=='staff'">
							<view class="_info">
								<text class='txt'>已推荐用户数</text>
								<text class='num'>{{userInfo.count}}</text>
							</view>
						</block>
						<block v-if="role=='client'">
							<view class="_info">
								<text class='txt'>{{userInfo.mobile}}</text>
								<text class='num'>{{userInfo.isBind==0?"未录入":"已录入"}}</text>
							</view>
						</block>
						
						<block v-if="role=='admin'">
							<view class="_info">
								<text class='txt'>党支部已完成数量</text>
								<text class='num'>{{adminNum}}</text>
							</view>
						</block>
					</view>
				</view>
				<!-- 工具区 -->
				<view class="box">
					<view class="title">工具</view>
					<view class="tool_list">
            <!-- 员工工具箱 -->
						<block v-if="role=='staff'">
							<block v-if="userInfo.staffType==0">
								<view class="item" @click="goPage('/pages/staff/search')">
									<image src='../../static/search.png'/>
									<text>用户查询</text>
								</view>
								<view class="item" @click="goPage('/pages/staff/recordOrder')">
									<image src='../../static/luru.png'/>
									<text>信息录入</text>
								</view>
								<view class="item" @click="goPage('/pages/staff/orderList')">
									<image src='../../static/jindu.png'/>
									<text>订单管理</text>
								</view>
								<view class="item" @click="goPage('/pages/client/searchShop')">
								  <image src="../../static/jxs.png"></image>
								  <text>经销商查询</text>
								</view>
							</block>
							
							<view class="item" @click="goPage('/pages/feedback/list?fromType=1')">
							  <image src="../../static/question.png"></image>
							  <text>问题反馈</text>
							</view>
							<view class="item" @click="lookReadMe"  v-if="userInfo.staffType==0">
							  <image src="../../static/controlpoint.png"></image>
							  <text>常见问题</text>
							</view>
						</block>
            <!-- 客户工具箱 -->
						<block v-if="role=='client'">
							<view class="item" @click="goPage('/pages/client/orderList')">
								<image src='../../static/jindu.png'/>
								<text>订单管理</text>
							</view>
							<view class="item" @click="goPage('/pages/feedback/list?fromType=1')">
							  <image src="../../static/question.png"></image>
							  <text>问题反馈</text>
							</view>
              <view class="item" @click="goPage('/pages/client/searchShop')">
                <image src="../../static/jxs.png"></image>
                <text>经销商查询</text>
              </view>
						</block>
            <!-- 管理员权限 -->
						<block v-if="role=='admin'">
							<view class="item" @click="goPage('/pages/adminControlOrder/index')">
								<view class='ibadge' v-if="waitOrderNum>0">{{waitOrderNum>99?"99+":waitOrderNum}}</view>
								<image src='../../static/order.png'/>
								<text>订单处理</text>
							</view>
							<view class="item" @click="goPage('/pages/feedback/list?fromType=2')">
								<view class='ibadge' v-if="feedBackNum>0">{{feedBackNum>99?"99+":feedBackNum}}</view>
							  <image src="../../static/question.png"></image>
							  <text>问题反馈</text>
							</view>
							<view class="item" @click="lookReadMe">
							  <image src="../../static/controlpoint.png"></image>
							  <text>常见问题</text>
							</view>
						</block>
					</view>
				</view>
				
				
			</view>
			<view class='btn_wrapper' @click="backLogin">
				<view class='padding btn_i'>
					<button class="cu-btn block lg">
					退出登录
				</button>
				</view>
			</view>
		</view>
		<!-- 显示隐藏 -->
		<view v-else>
			<cu-custom
				bgColor="" 
				:isBack="falsse"
				:titlePosition="titlePosition"
			>
				<block slot="content">我的</block>
			</cu-custom>
			<view class="section padding">
				<view class="title">欢迎您！</view>
				<view class="login_w">
					<view
						:class="['item',action?'animation-slide-bottom':'']" 
						v-for="(item,index) in loginType" 
						:Key="index" 
						@click="goAuth(item)"
						:style="[{animationDelay:(index+1)*0.1+'s'}]"
					>
						<view class="name" :key="index">{{item.name}}</view>
						<image :src="item.url" class="img"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import staffBg from "../../static/staff_bg.png"
	import clientBg from "../../static/client_bg.png"
	import adminBg from "../../static/admin_bg.png"
	import {http2Https} from "../../common/tools.js"
	export default {
		data() {
			return {
				role:'staff',// staff client admin
				bg:staffBg,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hasLogin:false,
				userInfo:{
					staffType:0 // 0是北汽员工 1是4s店员工
				},
				waitOrderNum:0, //管理员待处理订单
				feedBackNum:0,//待处理问题反馈
				loginType:[
					{
						name:"购车用户注册/登录",
						url:"../../static/client_login.png",
						type:3
					},
					{
						name:"员工登录",
						url:"../../static/staff_login.png",
						type:2
					},
					{
						name:"管理员登录",
						url:"../../static/admin_login.png",
						type:1
					}
				],
				titlePosition:'center',
				action:false,
				readMeUrl:null,
				adminNum:0 //党支部完成数量
			};
		},
		methods:{
			goAuth(item){
				this.perfectNavigateTo({
					url:'/pages/personal/authorization?roleType='+item.type
				})
			},
			getAdminNum(){
				this.request("/order/admin/deptfinishordernum").then((res)=>{
					this.adminNum=res.data
				})
			},
			looK(){
				
			},
			lookReadMe(){
				var _obj={
					url:this.readMeUrl,
					title:"常见问题"
				}
				uni.setStorageSync('webViewInfo', _obj);
				this.perfectNavigateTo({
					url:"/pages/webView/webView"
				})
			},
			editUserInfo(){
				this.perfectNavigateTo({
					url:"/pages/personal/register?fromType=2" //修改
				})
			},
			changeRole(type){
				if(type==1){ //admin
					this.bg=adminBg
					this.role="admin"
					// 请求待处理订单
					this.getWaitOrderNum()
					// 请求党支部数
					this.getAdminNum()
					// 请求待处理问题
					this.getFeedBackNum()
					this.getReadMe('admin_operation_guide')
				}else if(type==2){
					this.bg=staffBg
					this.role="staff"
					this.getReadMe('staff_operation_guide')
				}else{
					this.bg=clientBg
					this.role="client"
				}
			},
			goPage(path){
				this.perfectNavigateTo({
					url:path
				})
			},
			getWaitOrderNum(){
				this.request("/order/admin/orders",{isTreated:0}).then((res)=>{
					if(res.resultCode==0){
						let _data=res.data
						this.waitOrderNum=_data.length
					}else{
						uni.showToast({title:res.resultMsg?res.resultMsg:'网络异常,请稍后重试',icon:'none'})
					}
					})
			},
			getFeedBackNum(){
				this.request("/feedBack/feedBacklist",{pageNum:1,pageSize:99}).then((res)=>{
					if(res.resultCode==0){
						let _data=res.data.page.list
						let _total=0
						_data.forEach((item)=>{
							if(item.state==0){
								_total++
							}
						})
						this.feedBackNum=_total
					}else{
						uni.showToast({title:res.resultMsg?res.resultMsg:'网络异常,请稍后重试',icon:'none'})
					}
					})
			},
			getReadMe(keyWord){
				this.request("/common/param",{key:keyWord}).then((res)=>{
					if(res.data){
						this.readMeUrl=http2Https(res.data)
					}
				})
			},
			backLogin(){
				uni.showModal({
					title: '提示',
					content: `确认退出当前账号吗？`,
					success: (res)=>{
							if (res.confirm) {
								this.request("/user/logOut").then((res)=>{
									if(res.resultCode==1008){
										uni.removeStorageSync('token');
										uni.removeStorageSync('userInfo');
										this.hasLogin=false
									}else{
										uni.showToast({title:res.resultMsg?res.resultMsg:'网络异常，请稍后重试',icon:'none'})
									}
								})
							}
					}
				})
			},
			checkLogin(){
				let _token=uni.getStorageSync('token');
				let tokenValue;
				if(_token){
					tokenValue=JSON.parse(_token)
					this.getUserInfo()
					this.hasLogin=true
					this.changeRole(tokenValue.userType)
				}else{
					this.hasLogin=false
				}
			},
			getUserInfo(){
				this.request("/user/info").then((res)=>{
					if(res.resultCode==0){
						this.userInfo=res.data
						// this.$store.commit("SET_USER_INFO", this.userInfo)
						uni.setStorageSync('userInfo', JSON.stringify(this.userInfo));
					}else{
						uni.showToast({title:res.resultMsg?res.resultMsg:'网络异常,请稍后重试',icon:'none'})
					}
				})
			}
		},
		onShow(options){
			// console.log(wx.getLaunchOptionsSync())
			this.changeRole()
			this.checkLogin()
			if(this.systemType=='android'){
				this.titlePosition='left'
			}else{
				this.titlePosition='center'
			}
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
		},
		onLoad(){
			this.action=true
		}
	}
</script>

<style lang="stylus">
	.wrapper
		.section
			.title
				height:56upx;
				font-size:40upx;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(30,30,30,1);
				line-height:56upx;
			.login_w
				.item
					height:240upx
					line-height:240upx
					margin-top:40upx
					position:relative
					border-radius:6upx
					.img
						position:absolute
						width:100%;
						height:100%
						top:0upx
						z-index:-1
					.name
						font-size:40upx;
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight:600;
						color:rgba(255,255,255,1);
						letter-spacing 2upx
						padding-left:50upx
		.persion_page
			position:relative
			.bg
				z-index:-1
				height:650upx
			.position
				position:absolute
				width:750upx
				top:0upx
				.info_w
					padding-left:30upx
					.info
						display:flex
						flex-direction row
						align-items center
						justify-content space-between
						height:225upx
						margin-bottom:40upx
						.txt
							font-size:44upx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:500;
							color:#fff
							.name
								margin:15upx 0upx
								display:flex
								flex-direction row
								align-items flex-end
								.xingming
									margin-right:20upx
									font-size:52upx
									margin-bottom:-5upx
								.no
									font-size:28upx;
									font-family:PingFangSC-Regular,PingFang SC;
									font-weight:400;
									color:rgba(255,255,255,1);
							.role
								font-size:32upx;
								font-family:PingFangSC-Medium,PingFang SC;
								font-weight:500;
								color:#fff
							.edit
								display:flex
								flex-direction row
								align-items center
								margin-top:14upx
								.edit_txt
									font-size:28upx;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:500;
									color:rgba(255,255,255,1);
								image
									margin-left:6upx
									width:28upx
									height:28upx
						.avatar
							width:136upx;
							height:136upx;
							border-radius:50%
							margin-right:60upx
							overflow:hidden
					.desc
						display:flex
						flex-direction row
						justify-content space-between
						border-top:1upx solid rgba(255,255,255,.5)
						._info
							display:flex
							flex-direction row
							margin:26upx 0upx
							align-items flex-start
							.txt
								font-size:28upx;
								font-family:PingFangSC-Medium,PingFang SC;
								font-weight:500;
								color:rgba(255,255,255,1);
								margin-top:10upx
								margin-right:10upx
							.num
								font-size:48upx;
								font-family:DINAlternate-Bold,DINAlternate;
								font-weight:bold;
								color:rgba(255,255,255,1);
				.box
					background:rgba(255,255,255,1);
					// box-shadow:0upx -10upx 30upx 0upx rgba(0,0,0,0.05);
					border-radius:24upx 24upx 0upx 0upx;
					&::before
						display:table
						content:""
					.title
						font-size:40upx;
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight:bold
						color:rgba(30,30,30,1);
						padding:0upx 30upx
						margin-top:50upx
					.tool_list
						display:flex
						flex-direction row
						justify-content flex-start
						flex-wrap:wrap
						.item
							width:25%
							display:flex
							flex-direction column
							align-items center
							text-align center
							position:relative
							margin-top:35upx
							.ibadge
								position: absolute;
								border-radius:200upx
								color:#fff
								top: -10upx;
								left:116upx
								font-size: 20upx;
								display:flex
								flex-direction row
								justify-content center
								align-items center
								min-width:40upx
								background-color: #dd514c;
								z-index:10
								text-align center
							image
								width:80upx
								height:80upx
							text
								font-size:24upx;
								font-family:PingFangSC-Regular,PingFang SC;
								font-weight:400;
								margin-top:18upx
								width:100%
								color:rgba(31,35,52,1);
			.btn_wrapper
				position:fixed
				bottom:30upx
				left:0upx
				right:0upx
				width:750upx
				height:140upx
				display:flex
				align-items center
				justify-content center
				z-index:10
				.btn_i
					width:100%
					button
						background:#F0F3F7
						letter-spacing 2upx
						color:#1F2334
						height:96upx
						border-radius:16upx;
</style>
<style>
	page{
		background:rgba(255,255,255,1);
	}
</style>