<template>
	<view>
		<view class="shop-box" v-for="(item, i) in arr" :key="i" @click="tz(item)">
			<my-goods :item="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quey: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 20
				},
				arr: [],
				total: 0,
				zy: 0,
				flg: false
			}
		},
		onLoad(e) {
			this.quey.query = e.query || ''
			this.cid = e.cat_id || ''
			this.sa()
		},
		methods: {
			async sa(cb) {
				uni.showLoading({
					title: "加载中"
				})
				this.flg = true
				
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.quey)
				
				this.arr = [...this.arr, ...res.message.goods]
				this.total = res.message.total
				this.zy = Math.ceil(this.total / this.quey.pagesize)
				uni.hideLoading()
				cb && cb()
				this.flg = false
			},
			tz(val) {
				uni.navigateTo({
					url: '../goods_detail/goods_detail?goods_id=' + val.goods_id
				})
			},
			onReachBottom() {
				if(this.flg) return
				if(this.quey.pagenum < this.zy) {
					this.quey.pagenum++
					this.sa()
				}else {
					uni.$showMssg("没有更多数据了")
				}
			},
			onPullDownRefresh() {
				// 重置关键数据
				this.quey.pagenum = 1
				this.total = 0
				this.flg = false
				this.arr = []
				// 重新发起数据请求
				this.sa(() => uni.stopPullDownRefresh())
			}
		}
	}
</script>

<style lang="scss">

</style>
