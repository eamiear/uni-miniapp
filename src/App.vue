<script>
export default {
	mpType: 'app',
	onLaunch () {
    // 小程序升级检测
    // #ifdef MP-WEIXIN
      this.$logic.updateMiniappManager()
    // #endif

    // APP版本更新
    // #ifdef APP-PLUS
      this.$logic.updateNativeAppManager()
    // #endif

    this.$logic.checkPermission()
	},
	onShow () {
		console.log('App Show')
	},
	onHide () {
		console.log('App Hide')
	}
}
</script>

<style lang="less">
/*每个页面公共css */
// #ifndef APP-PLUS
@import 'static/styles/app.less';
// #endif
</style>
