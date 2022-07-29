<template>
	<view>
		<view class="my-search-box">
			<uni-search-bar @input="input" v-model="sj" :radius="18" cancelButton="none" >
			</uni-search-bar>
		</view>
		<view class="his-box" v-if="flge">
			<view class="his-tex">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="22" @click="qc"></uni-icons>
			</view>
			<view class="his-tag">
				<uni-tag @click="tz(item)" :text="item" type="default" v-for="(item, i) in his" :key="i"></uni-tag>
			</view>
		</view>
		<uni-list :border="false" v-else>
			<uni-list-item  style="border: 0;" showArrow  v-for="(item, i) in searchList" :key="i">
				<template v-slot:body>
					<view class="sear-item" @click="tz(item)">
						{{ item.goods_name }}
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sj: '',
				time: '',
				searchList: [],
				num: 20,
				total: 0,
				flg: false,
				flge: true,
				his: ['a', 123, 'ad']
			};
		},
		onLoad() {
			this.his = JSON.parse(uni.getStorageSync('sl') || '[]')
		},
		onReachBottom() {			
			if(!this.flg) {
				if(this.num < this.total) {
					this.num += 10	
					// this.searchList = []
					this.getSearch()
				}else {
					uni.$showMssg("没有更多了")
				}
				
				
			}
		},
		methods: {
			// 输入事件处理函数
			input(e) {
				this.flge = false
				clearTimeout(this.time)
				this.time = setTimeout(()=>{
					this.sj = e
					this.getSearch()
				}, 500)
				
			},
			tz(val){
				uni.navigateTo({
					url: '../goods_details/goods_details?goods_id=' + val.goods_id
				})
			},
			async getSearch() {
				this.flg = true
				if(this.sj.length === 0) {
					this.searchList = []
					this.flge = true
					return
				}
				uni.showLoading({
					title: '数据加载中'
				})
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', { 
					query: this.sj,
					pagesize: this.num
					})
				if (res.meta.status !== 200) return uni.$showMssg()
				uni.hideLoading()
				this.losat()
				
				this.flg = false
				this.total = res.message.total
				this.searchList = res.message.goods
				// this.searchList = this.searchList.concat(res.message.goods)
				// console.log(this.searchList)
				
			},
			losat() {
				this.his.unshift(this.sj)
				// 数组转换成 sert对象 并且 去重
				const set = new Set(this.his)
				// 将 set 对象转成 数组
				this.his = Array.from(set)
				uni.setStorageSync('sl', JSON.stringify(this.his))
			},
			qc() {
				this.his = []
				uni.setStorageSync('sl', '[]')
			},
			tz(val) {
				uni.navigateTo({
					url: '../goods_list/goods_list?query=' + val
				})
			}
		}
	}
</script>

<style lang="scss">
.my-search-box{
	background-color: #f00000;
	// 设置定位效果为 “吸顶”
	position: sticky;
	// 吸顶的位置
	top: 0;
	z-index: 999;
	
}
.his-box{
	.his-tex{
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		height: 50px;
		font-size: 18px;
		
	}
	.his-tag{
		margin-top: 10px;
		.uni-tag{
			margin: 5px;
			font-size: 15px;
		}
	}
}
.sear-item{
		// 文字不允许换行
		white-space: nowrap;
		// 超出隐藏
		overflow: hidden;
		// 文字溢出后,使用...代替
		text-overflow: ellipsis;
	}
</style>
