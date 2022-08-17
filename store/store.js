 import Vue from 'vue'
 import Vuex from 'vuex'
 // 导入购物车的 vuex 模块
 import moduleCart from '@/store/cart.js'
 import moduleUser from '@/store/user.js'
 
 // 将 Vuex 安装为 Vue 的插件
 Vue.use(Vuex)
 
 // 创建 Store 的实例对象
 const store = new Vuex.Store({
	 // TODO: 挂载 store 模块
	 modules: {
		 'm_cart': moduleCart,
		 'm_user': moduleUser
	 }
 })
 
 export default store