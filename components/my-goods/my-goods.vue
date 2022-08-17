<template>
	<view class="shop-box">
		<view class="box-left">
			<radio :checked="item.goods_state" color="#C00000" v-if="flg" @click="zt"></radio>
			<image class="box-img" :src="item.goods_small_logo || def" ></image>
		</view>
		<view class="box-right">
			<view class="shop-text">
				{{ item.goods_name }}
			</view>
			<view class="shop-price">
				<view>
					<text style="color: red;font-weight: bold;">{{ item.goods_price | tofiex }}</text>-￥
				</view>
				 <uni-number-box :min="1" :value="item.goods_count" v-if="showH" @change="bh"></uni-number-box>
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
			},
			flg: {
				type: Boolean,
				default: false
			},
			showH: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				def: 'https://i0.hdslb.com/bfs/album/de2ea458bbead4666330310b998c6296db5a8e41.jpg'
			}
		},
		methods: {
			zt() {
				this.$emit('raid', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			bh(val) {
				this.$emit('numH', {
					goods_id: this.item.goods_id,
					goods_count: val - 0
				})
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
				.box-img{
					height: 100px;
					width: 100px;
				}
			}
			.box-right{
				margin-left: 5px;
				width: 100%;
				padding: 10px 0;
				display: flex;
				flex: 1;
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
					display: flex;
					align-items: center;
					justify-content: space-between;

				}
			}
	}

</style>
