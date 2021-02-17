
<template>
  <view>
    <view class="padding">
      <form @submit="handleFormSubmit">
        <view class="form-body">
          <view>
            <image src="/static/images/logo.png"></image>
          </view>
          <view class="row">
            <view class="col-3">账号</view>
            <view class="col-9">
              <input name="username" auto-focus="true" placeholder="请输入用户名" />
            </view>
          </view>
          <view class="row">
            <view class="col-3">密码</view>
            <view class="col-9">
              <input password name="password" placeholder="请输入密码" />
            </view>
          </view>
        </view>
        <view class="row mgb-sm font-size-lg text-color-grey">
          <navigator class="col" :url="'/pages/read/read?identify='+about">关于我们</navigator>
          <view class="col text-right" @click="findPassword">忘记密码？</view>
        </view>
        <view class="row">
          <button class="btn-submit btn-block" :loading="loading" form-type="submit"> 马上登录 </button>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <view class="row">
          <button @getuserinfo="wechatLogin" :loading="loadingWechat" open-type="getUserInfo" class="btn-auth btn-block">
            微信登录
          </button>
        </view>
        <!-- #endif -->
        <view class="row">
          <button @click="toReg" class="btn-login btn-block"> 注册账号 </button>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { showToastError, showToastSuccess } from '@/utils/logic'
export default {
  data () {
    return {
      loading: false,
      about: '',
      redirect: '',
      loadingWechat: false
    }
  },
  onLoad (option) {
    this.$logger.log(option)
    if (option.redirect) this.redirect = option.redirect
  },
  methods: {
    ...mapActions(['Login', 'LoginByWechat', 'Logout']),
    toReg () {
      this.$$router.toReg({ redirect: this.redirect })
    },
    findPassword () {
      this.$showModal({
        title: '温馨提示',
        content: '暂不支持找回密码的功能'
      })
    },
    handleFormSubmit (e) {
      if (this.loading) return
      const { username, password } = e.detail.value
      if (!password || !username) {
        return this.$showToastError('账号和密码均不能为空')
      }
      const _password = md5(password)
      this.loading = true
      this.Login({ username, password: _password }).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.$showToastSuccess('登录成功')
          this.$$router.toHome()
        } else {
          this.$showToastError(res.message || '登录失败：未知错误')
        }
      }).catch((err) => {
        this.$showToastError('登录失败：未知错误')
        console.log(err)
      }).finally(() => { this.loading = false })
    },
    wechatLogin (e) {
      if (this.loadingWechat) return
      this.loadingWechat = true
      this.$logic.login().then(code => {
        this.LoginByWechat(code, e.detail).then(() => {
          showToastSuccess('登录成功')
          this.redirect ? this.$$router.redirectTo(this.redirect) : this.$$router.toHome()
        }).catch(() => { showToastError('登录失败') })
      }).catch(() => {
        this.$$router.toBind()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-body {
  margin-bottom: 30rpx;
}

.form-body .row {
  border-bottom: 1rpx solid #efefef;
  color: #353535;
  height: 100rpx;
  line-height: 100rpx;

  input {
    margin-top: 24rpx;
  }
}

.btn-block {
  width: 100%;
  border-radius: 6rpx;
  color: #fff;
  margin-bottom: 30rpx;
}

.btn-submit {
  background-color: #00acff;
  border-color: #00acff;
}

.btn-auth {
  background-color: #00c706;
  border-color: #00c706;
}

.btn-reg,
.btn-login {
  color: #353535;
}

image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 90rpx;
  border: 1px solid #ddd;
  margin: 15px auto;
  display: block;
}
</style>
