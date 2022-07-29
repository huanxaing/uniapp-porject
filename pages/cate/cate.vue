<template>
	<view class="rollinging">
		<my-search></my-search>
		<view class="rolling">
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="rolling-left">
				<view @click="qh(i)" :class="['rolling-left-item', i === act?'act':'']" v-for="(item, i) in arr" :key="i">
					{{ item.cat_name }}
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop" class="rolling-right">
				<view class="rolling-right-item" v-for="(item, i) in arr1" :key="i">
					<text style="font-weight:bold">/&nbsp;{{ item.cat_name }}&nbsp;/	</text>
					<view class="right-item">
						<view class="rolling-right-item_1" v-for="(item1, i) in item.children" :key="i">
							<navigator :url="'../../subpkg/goods_list/goods_list?cat_id=' + item1.cat_id" class="rolling-right-item_bottom">
								<image class="rolling-right-item_bottom-img" :src="item1.cat_icon" mode="widthFix"></image>
							</navigator>	
							<view class="rolling-right-item_top">
								{{ item1.cat_name }}
							</view>	
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				arr: [],
				act: 0,
				arr1: [],
				scrollTop: 0 // 滚动条距离顶部的距离
			};
		},
		methods:{
			async getRoll() {
				 const { data: res } = await uni.$http.get('/api/public/v1/categories')	
				if (res.meta.status !== 200) return uni.$showMssg()
				this.arr = res.message
				res.message.forEach(val => {
					val.children.forEach(val1 => {
						if(val1.children) {
							val1.children.forEach(val2 => {
								val2.cat_icon = val2.cat_icon.replace('https://api-ugo-dev.itheima.net/', 'https://api-ugo-web.itheima.net/')
							})
						}
					})
				})
				this.arr1 = res.message[0].children
			},
			qh(i) {
				this.act = i
				this.arr1 = this.arr[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			}
		},
		onLoad() {
			const sty = uni.getSystemInfoSync()
			this.wh = sty.windowHeight - 50
			this.getRoll()
		}
	}
</script>

<style lang="scss">
.rollinging{
	.rolling{
		display: flex;
		.rolling-left{
			width: 140px;
			.rolling-left-item{
				text-align: center;
				line-height: 60px;
				font-size: 24rpx;
				&.act{
					background: white;
					position: relative;
					&::before{
						content: ' ';
						width: 3px;
						display: block;
						height: 30px;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						background-color: red;
					}
				}
			}
			
		}
		.rolling-right{
			.rolling-right-item{
				text-align: center;
				line-height: 60px;
				.right-item{
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.rolling-right-item_1{
						margin: 10px;
						.rolling-right-item_bottom-img{
							width: 150rpx;
							
						}
						.rolling-right-item_top{
							margin-top: -30px;
							font-size: 24rpx;
						}
					}
				}
				
			}
		}
	}
}
</style>
