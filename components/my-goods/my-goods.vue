<template>
	<view class="shop-box">
		<view class="box-left">
			<image :style="{ width: item.goods_weight + 'px' }" :src="item.goods_small_logo || def" mode="widthFix"></image>
		</view>
		<view class="box-right">
			<view class="shop-text">
				{{ item.goods_name }}
			</view>
			<view class="shop-price">
				<text style="color: red;font-weight: bold;">{{ item.goods_price | tofiex }}</text>-￥
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				def: 'https://i0.hdslb.com/bfs/album/de2ea458bbead4666330310b998c6296db5a8e41.jpg'
			}
		},
		filters: {
			tofiex(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.shop-box{
		display: flex;
		padding: 0 5px;
		height: 120px;
		
		border: 1px solid #EDEDED;
		.box-left{
				width: 133px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.box-right{
				margin-left: 5px;
				width: 100%;
				padding: 10px 0;
				display: flex;
				flex-direction: column!important;
				justify-content: space-between!important;
				.shop-text{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.shop-price{
					
				}
			}
	}

</style>
