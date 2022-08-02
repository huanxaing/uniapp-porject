<template>
	<view class="zt" v-if="goods_sj.goods_name">
		<swiper indicator-color="#dedede" indicator-active-color="black" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goods_sj.pics" :key='index' @click="yl(index)">
				<view>
					<image class="swiper-item" :src="item.pics_big" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="goods_detail-box">
			<view class="box-goods_price">
				￥&nbsp;{{goods_sj.goods_price}}
			</view>
			<view class="box-goods_information">
				<view class="goods_name">
					{{goods_sj.goods_name}}
				</view>
				<view class="collection">
					<view class="collection-icons">
						<uni-icons type="star" size="22"></uni-icons>
					</view>
					<view class="collection-text">
						收藏
					</view>
				</view>
			</view>
			<view class="box-kd">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goods_sj.goods_introduce"></rich-text>
		<view class="bot">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: 0,
				goods_sj: {},
				 options: [
						{
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		onLoad(e) {
			e.goods_id === e.goods_id?e.goods_id : e.godds_id
			console.log(e)
			this.goods_id = e.goods_id || e.godds_id
			this.getGoodsDetail()
		},
		methods: {
			async getGoodsDetail() {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', {goods_id: this.goods_id})
				if (res.meta.status !== 200) return uni.$showMssg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goods_sj = res.message
			},
			yl(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_sj.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if(e.content.text === '购物车') {
					uni.switchTab({
						url: '../../pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.bot{
		position: fixed;
		bottom: 0;
		width: 100%;
		
	}
	.zt{
		background-color: white;
		padding-bottom: 50px;
	}
swiper{
	height: 750rpx;
	.swiper-item{
		width: 100%;
		height: 100%;
	}
}
.goods_detail-box{
	padding: 10px;
	.box-goods_price{
		color: red;
		font-size: 44rpx;
		font-weight: bold;
	}
	.box-goods_information{
		display: flex;
		justify-content: space-between;
		margin: 10px 0px;
		.goods_name{
			font-weight: bold;
			font-size: 30rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.collection{
			width: 150px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #dedede;
			margin-left: 20px;
		}
		
	}
	.box-kd{
		color: #b6b6b6;
	}
}
</style>
