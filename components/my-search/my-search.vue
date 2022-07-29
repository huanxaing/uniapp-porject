<template>
	<view class="my-search-box" :style="{ 'background': bgcolor }">
		<view class="search" :style="{ 'border-radius': bgradius + 'px' }" @click="sa">
			<uni-icons type="search" size="15"></uni-icons>
			<text class="tex">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#f00000'
			},
			bgradius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			sa() {
				uni.navigateTo({
					url: '../../subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.my-search-box{
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.search{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 36px;
		vertical-align:middle;
		background-color: white;
		.tex{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
