export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	state: () => ({
		// 购物车的数组， 用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下6个属性：
		// { goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult) {
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车中的数据持久化存储到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		UpdatagoodsState(state, goods) {
			const sta = state.cart.find(x => x.goods_id === goods.goods_id)
			if(sta) {
				sta.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		UpdataNum(state, goods) {
			const sta = state.cart.find(x => x.goods_id === goods.goods_id)
			if(sta) {
				sta.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		DeleteGoods(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('m_cart/saveToStorage')
		},
		updataFlg(state, flg) {
			state.cart.forEach( x => x.goods_state = flg )
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters: {
		total(state) {
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		nums(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		jg(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
		}
	}
		
	
}
