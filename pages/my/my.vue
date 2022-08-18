<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import mins from '../../mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	
	export default {
		mixins: [mins],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
