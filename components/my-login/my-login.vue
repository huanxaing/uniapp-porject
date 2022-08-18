<template>
	 <view class="login-container">
	    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
	    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
	    <view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		computed: {
		    ...mapState('m_user', ['redirectInfo']),
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('m_user', ['userInfo', 'updateToken', 'updateRedirectInfo']),
			getUserInfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				this.userInfo(e.detail.userInfo)
				this.getuser(e.detail)
			},
			async getuser(info) {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
				const query = {
				  code: res.code,
				  encryptedData: info.encryptedData,
				  iv: info.iv,
				  rawData: info.rawData,
				  signature: info.signature
				}
				// 换取 token
				const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				
				if (loginResult.meta.status !== 200) return uni.$showMssg('登录失败！')
				 this.navigateBack()
				this.updateToken(loginResult.message.token)
			},
			// 返回登录之前的页面
			navigateBack() {
			  // redirectInfo 不为 null，并且导航方式为 switchTab
			  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
			    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
			    uni.switchTab({
			      // 要导航到的页面地址
			      url: this.redirectInfo.from,
			      // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
			      complete: () => {
			        this.updateRedirectInfo(null)
			      }
			    })
			  }
			}
		}
	}
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
