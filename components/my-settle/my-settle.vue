<template>
	<view class="my-settle-container">
	    <label class="radio">
	        <radio color="#C00000" :checked="flg" @click="qx" /><text>全选</text>
	    </label>
	    <view class="amount-box">
	        合计:<text class="amount">￥{{jg}}</text>
	    </view>
	    <view class="btn-settle">结算({{nums}})</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['nums', 'total', 'jg']),
			flg() {
				return this.total === this.nums
			},
		},
		methods: {
			...mapMutations('m_cart', ['updataFlg']),
			qx() {
				this.updataFlg(!this.nums)
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
