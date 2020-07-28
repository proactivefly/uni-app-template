import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		forcedLogin: false, //是否需要强制登录
		hasLogin: false, //是否登录
		token:'',//token
		addrInfo:{//位置信息
			lonlat:null,
			name:null,
			adress:null,
			province:null
		},
		userInfo:{
			/* code: "11809086"
			count: 1
			deptName: "工程研究院/车型部党支部"
			mobile: "139****9420"
			name: "牛国振"
			type: 2
			userId: 1478 */
		}
	},  
	mutations: {
		LOGIN(state, userName) { //登录
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		LOGIN_OUT(state) { //登出
			state.userName = "";
			state.hasLogin = false;
		},
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_ADDRESS(state,addrInfo){
			state.addrInfo=addrInfo
		},
		SET_USER_INFO(state,userInfo){
			state.userInfo=userInfo
		}
	},
})

export default store
