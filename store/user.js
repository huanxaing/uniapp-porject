export default {
	// 开启命名空间
	namespaced: true,
	state: ()=> ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
	    // 更新收货地址
	    updateAddress(state, address) {
	      state.address = address
		  this.commit('m_user/userStorage')
	    },
		userStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		userInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserinfo')
		},
		saveUserinfo(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
		   state.token = token
		   this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
		  uni.setStorageSync('token', state.token)
		},
		// 更新重定向的信息对象
		updateRedirectInfo(state, info) {
		  state.redirectInfo = info
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}