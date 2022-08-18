<template>
	<view class="my-settle-container">
	    <label class="radio">
	        <radio color="#C00000" :checked="flg" @click="qx" /><text>全选</text>
	    </label>
	    <view class="amount-box">
	        合计:<text class="amount">￥{{jg}}</text>
	    </view>
	    <view class="btn-settle" @click="sent">结算({{nums}})</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	
	export default {
		data() {
			return {
				seconds: 3,
				 timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['nums', 'total', 'jg']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			flg() {
				return this.total === this.nums
			},
		},
		methods: {
			...mapMutations('m_cart', ['updataFlg']),
			qx() {
				this.updataFlg(!this.nums)
			},
			,
			// 展示倒计时的提示消息
			showTips(n) {
			  uni.showToast({
			    icon: 'none',
			    title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
			    // 为页面添加透明遮罩，防止点击穿透
			    mask: true,
			    duration: 1500
			  })
			}
			// 展示倒计时的提示消息
			showTips(n) {
			  uni.showToast({
			    icon: 'none',
			    title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
			    // 为页面添加透明遮罩，防止点击穿透
			    mask: true,
			    duration: 1500
			  })
			}
			sent() {
				// 先判断是否勾选了要结算的商品
				if (!this.nums) return uni.$showMssg('请选择要结算的商品！')
				// 再判断用户是否选择了收货地址
				if (!this.addstr) return uni.$showMssg('请选择收货地址！')
				//  最后判断用户是否登录了
				if (!this.token) return uni.$showMssg('请先登录！')
				//  最后判断用户是否登录了，如果没有登录，则调用 delayNavigate() 进行倒计时的导航跳转
				if (!this.token) return this.delayNavigate()
				
			},
			// 延迟导航到 my 页面
			delayNavigate() {
				this.seconds = 3
			  this.showTips(this.seconds)
			  // 1. 将定时器的 Id 存储到 timer 中
			  this.timer = setInterval(() => {
			    this.seconds--
			    if (this.seconds <= 0) {
			      clearInterval(this.timer)
			      uni.switchTab({
			        url: '/pages/my/my',
					success: () => {
					   // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
					  this.updateRedirectInfo({
					    // 跳转的方式
					    openType: 'switchTab',
					    // 从哪个页面跳转过去的
					    from: '/pages/cart/cart'
					  })
					}
			      })
			      return
			    }
			    this.showTips(this.seconds)
			  }, 1000)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
