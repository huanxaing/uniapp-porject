<template>
	<view class="sa" v-if="cart.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
		  <uni-icons type="shop" size="18"></uni-icons>
		  <text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action class="sd">
			<block v-for="(item, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="sc(item)">
					<my-goods :item="item" :showH="true" :flg='true' @raid="zt" @numH="shuj"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
	    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
	    <text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import mins from '../../mixins/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		mixins: [mins],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F00000'
					}
				}]
			}
		},
		methods: {
			...mapMutations('m_cart', ['UpdatagoodsState', 'UpdataNum', 'DeleteGoods']),
			zt(e) {
				this.UpdatagoodsState(e)
			},
			shuj(e) {
				this.UpdataNum(e)
			},
			sc(e) {
				this.DeleteGoods(e)
			}
		}
	}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.sa{
	position: relative;
}
.sd{
	position: absolute;
	margin-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
