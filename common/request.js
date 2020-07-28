import store from '../store/index.js'
function request(url,data,type){
	var header={
		'content-type': 'application/x-www-form-urlencoded',
		'service-code':'QDMS'
		};
	//不需要token的接口
	var whiteList=['/user/login','/auth/getOpenIdAndSessionKey']
	if(whiteList.indexOf(url)<0){
		//取token
		let _token=uni.getStorageSync('token');   //对应的登录后要写入token
		let tokenValue;
		if(_token){
			tokenValue=JSON.parse(_token)
		}
		if(tokenValue){
			header['ticket']=tokenValue.value
		}
	}
	return new Promise(function(resolve,reject){
		uni.showLoading();
		uni.request({
			url:getApp().globalData.requestUrl+url,
			method:type?type:'post',
			data:data,
			header:header,
			success:function(res){
				if(res.data.resultCode==-1){ //未登录转状态
					uni.showToast({
						title:res.data.resultMsg?res.data.resultMsg:'登录失效,请重新登录',
						icon:'none',
						success:(res)=>{
							uni.removeStorageSync("token")
							setTimeout(function() {
								// switch 刷新当前页
								uni.switchTab({
									url:"/pages/personal/info",
									success (res) {
										let page = getCurrentPages().pop()
										if (page == undefined || page == null) {
											return
										}
										page.onShow()
									}
								})
							},1000);
						}
					})
				}else{
					resolve(res.data)
				}
			},
			fail:function(err){
				reject(err)
			},
			complete:function(){
				uni.hideLoading();
			}
		})
	})
}
export default request