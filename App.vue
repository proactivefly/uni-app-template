<script>
	import Vue from 'vue'
	import {perfectNavigateTo} from "common/tools.js"
	import request from "common/request.js"
	var requestUrl;
	if(process.env.NODE_ENV === 'development'){
		requestUrl="https://testqdmsapi.qingxiangchuxing.com";
	}else{
		requestUrl="https://qdmsapi.qingxiangchuxing.com";
	}
	export default {
		globalData: {
			requestUrl:requestUrl
		},
		onLaunch: function(options) {
			// 获取系统信息
			this.getSystemInfo()
			this.updateMp()
			Vue.prototype.perfectNavigateTo=perfectNavigateTo;
			Vue.prototype.request=request;
			// todo 获取系统更新状态
		},
		onHide: function() {
		},
		methods:{
			getSystemInfo(){
				uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
				
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom; // 
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;//???
						Vue.prototype.mobileModel=e.model
						Vue.prototype.systemType=e.platform
						// #endif		
				
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			},
			updateMp(){
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
					// 请求完新版本信息的回调
					if(res.hasUpdate){
						updateManager.onUpdateReady(function () {
							wx.showModal({
								title: '更新提示',
								content: '检测到有更新，是否更新并重启应用？',
								success: function (res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function () {
							uni.showToast({title:'网络异常，请稍后重试',icon:'none'})
						})
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css"
	@import "common/common.css"
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url("./static/transbg.png");
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
