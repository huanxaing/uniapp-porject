<template>
	<view>
		<!-- 轮播图层 -->
		<swiper indicator-color="#dedede" indicator-active-color="black" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in arr" :key='index'>
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航层 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in nav" :key="i" @click="navTz(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 首页楼层数据层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image class="floor-img" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="floor-img-left" :url="item.product_list[0].url">
						<image :style="{width: item.product_list[0].image_width + 'rpx'}"
							:src="item.product_list[0].image_src" mode="widthFix"></image>
					</navigator>
					<view class="floor-img-right">
						<navigator :url="item2.url" class="floor-img-right_1" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :style="{ width: item2.image_width + 'rpx' }" :src="item2.image_src" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [], // 轮播图数据
				nav: [], // 首页分类选项数据
				floorList: [] // 首页楼层数据
			};
		},
		onLoad() {
			this.getArr()
			this.getNav()
			this.getFloor()
		},
		methods: {
			async getArr() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMssg()
				this.arr = res.message
			},
			async getNav() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMssg()
				this.nav = res.message
			},
			async getFloor() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMssg()
				res.message.forEach(val => {
					val.product_list.forEach(floor => {
						floor.url = '/subpkg/goods_list/goods_list?' + floor.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			navTz(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '../cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-list {
		margin: 15px 0;
		display: flex;
		justify-content: space-around;
	
	.nav-img {
			width: 140rpx;
			height: 140rpx;
		}
	}

	.floor-list {
		.floor-item {
			margin: 10px;
		}
	}
	.floor-img {
		width: 100%;
		height: 60rpx;
		margin-bottom: -5px;
	}
	.floor-img-box {
		display: flex;
	
	}
	.floor-img-right {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
