<template>
  <view class="padding">
    <form @submit="handleSubmit">
      <view class="form-body">
        <!-- <view class="row">
          <view class="col-3">邮箱</view>
          <view class="col-9">
            <input name="email" placeholder="请输入邮箱地址" />
          </view>
        </view> -->
        <view class="row">
          <view class="col-3">手机号码</view>
          <view class="col-9">
            <input type="text" name="phone" placeholder="请输入手机号码"/>
          </view>
        </view>
        <view class="row">
          <view class="col-3">验证码</view>
          <view class="col-9">
            <input class="code" name="code" type="text" placeholder="手机验证码"/>
            <button @click="GetCodes" class="getcode" :disabled="getCode" type="primary" hover-class="none" size="mini">
              {{ time !== 0 ? time + 's' : '获取验证码' }}
            </button>
          </view>
        </view>
        <view class="row">
          <view class="col-3">用户名</view>
          <view class="col-9">
            <input name="username" placeholder="请输入用户名" />
          </view>
        </view>
        <view class="row">
          <view class="col-3">用户昵称</view>
          <view class="col-9">
            <input name="nickname" placeholder="请输入昵称" />
          </view>
        </view>
        <view class="row">
          <view class="col-3">登录密码</view>
          <view class="col-9">
            <input password name="password" placeholder="请输入密码" />
          </view>
        </view>
        <view class="row">
          <view class="col-3">确认密码</view>
          <view class="col-9">
            <input password name="re_password" placeholder="请再次输入密码" />
          </view>
        </view>
      </view>
      <view class="row text-center">
        <view class="color-grey">以上资料项全为必填项，请认真填写</view>
      </view>
      <view class="row">
        <button :loading="loading" form-type="submit" class="btn-submit btn-block"> 立即注册 </button>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <view class="row">
        <button @getuserinfo="wechatLogin" :loading="loadingWechat" open-type="getUserInfo" class="btn-auth btn-block">
          微信登录
        </button>
      </view>
      <!-- #endif -->
      <view class="row">
        <button class="btn-block btn-login" @click="toLogin"> 马上登录 </button>
      </view>
    </form>
  </view>
</template>

<script>
// import { isEmail } from '@/utils/util'
import { isPhone } from '@/utils/util'
export default {
  data () {
    return {
      loading: false,
      redirect: '',
      loadingWechat: false
    }
  },
  methods: {
    GetCodes () {
      // getCodes().then(res => {
      //   if (this.$isAjaxSuccess(res.code)) {
      //     this.getCode = true
      //     this.time = 60
      //     const timer = setInterval(() => {
      //       this.time--
      //       if (!this.time) {
      //         clearInterval(timer)
      //         this.time = 0
      //         this.getCode = false
      //       }
      //     }, 1000)
      //     this.code = res.data.code
      //   }
      // })
    },
    handleSubmit: function (e) {
      if (this.loading) return
      const data = e.detail.value
      // if (!isEmail(data.email)) {
      //   return this.$showToastError('邮箱格式不正确')
      // }
      if (!isPhone(data.phone)) {
        return this.$showToastError('手机格式不正确')
      }
      if (data.password !== data.re_password) {
        return this.$showToastError('两次输入的密码不一致，请重新输入')
      }
      if (!data.username || !data.nickname || !data.password || !data.re_password) {
        return this.$showToastError('以上资料项均为必填项，请认真填写')
      }
      this.loading = true
      // register(data).then(res => {
      //   if (this.$isAjaxSuccess(res.code)) {
      //     this.$showToastSuccess('注册成功')
      //   } else {
      //     this.$showToastError(res.message)
      //   }
      // })
      // .catch(err => { this.$showToastError(err.data.message || '服务异常') })
      // .finally(() => { this.loading = false })
    },
    toLogin () {
      this.$$router.toLogin()
    },
    wechatLogin (e) {
    }
  }
}
</script>
