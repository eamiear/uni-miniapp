<template>
  <view class="page login">
    <view class="l-wrap">
      <view class="w-title">
        <text>手机号登录</text>
      </view>
      <view class="w-form">
        <view class="f-input">
          <view class="i-item">
            <input type="text" placeholder="请输入手机号" v-model="form.mobile" />
          </view>
          <view class="i-item">
            <input type="password" placeholder="请输入验证码" />
            <text class="btn btn-disable" v-if="time">{{ time }}S后重发</text>
            <text class="btn" v-else @tap="sendCode">获取验证码</text>
          </view>
        </view>
        <view class="f-btn">
          <text>登录</text>
        </view>
      </view>
      <view class="w-service">
        <text>点击登录即同意</text>
        <text @tap="nav('/pages/h5/index')">《用户手册》</text>
      </view>
      <view class="w-third">
        <view class="t-title">
          <text>第三方账号登录：</text>
        </view>
        <view class="t-entry">
          <view class="e-item">
            <text class="iconfont" style="color: #ff8200">&#xe61b;</text>
          </view>
          <view class="e-item">
            <text class="iconfont" style="color: #07c160">&#xe7e5;</text>
            <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doWeixinLogin"></button>
          </view>
          <view class="e-item">
            <text class="iconfont" style="color: #007fff">&#xe64b;</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import { validate } from '../../utils/validate'
// import { token } from '../../utils/token'
// import { mapActions } from 'vuex'
export default {
    data () {
        return {
            time: 0,
            form: {
                mobile: '',
                code: ''
            }
        }
    }
    // methods: {
    //     ...mapActions('user', ['login', 'getUserInfo']),
    //     sendCode() {
    //         if (!this.form.mobile) {
    //             this.toast('手机号必填')
    //             return
    //         }
    //         if (!validate.isMobile(this.form.mobile)) {
    //             this.toast('手机号格式有误')
    //             return
    //         }
    //         let timer = null
    //         this.time = 60
    //         timer = setInterval(() => {
    //             if (this.time === 0 && this.timer) {
    //                 this.time = 60
    //                 timer = null
    //                 return
    //             }
    //             this.time = this.time - 1
    //         }, 1000)
    //     },
    //     doWeixinLogin(o) {
    //         if (!o.detail.iv) {
    //             return
    //         }
    //         this.login().then(() => {
    //             this.getUserInfo().then(() => {
    //                 this.swi('/pages/index/index')
    //             })
    //         }).catch(() => {
    //             this.toast('服务器出小差啦')
    //         })
    //     }
    // }
}
</script>

<style lang="less">
.login{
  background: white;
  .l-wrap{
    width:540rpx;
    padding-top: 200rpx;
    margin:0 auto;
    .w-title{
      padding-bottom: 40rpx;
      text{
        font-size: 36rpx;
        font-weight: 600;
      }
    }
    .w-form{
      .f-input{
          .i-item{
              position: relative;
              display: flex;
              align-items: center;
              height: 80rpx;
              padding: 0 30rpx;
              background: #f7f7f7;
              input{
                  flex:1;
                  border:none;
                  outline: none;
                  background: #f7f7f7;
              }
              .btn{
                  position: absolute;
                  top:50%;
                  right:30rpx;
                  transform: translateY(-50%);
                  display: block;
                  height: 60rpx;
                  padding: 0 30rpx;
                  line-height: 60rpx;
                  border-radius: 10rpx;
                background: @color-primary;
                  color:white;
                z-index: 10;
                &-disable{
                  background: #f7f7f7;
                  color:@color-primary;
                }
              }
              &:not(:first-child){
                  margin-top: 20rpx;
              }
          }
      }
      .f-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
        margin-top: 40rpx;
        background: @color-primary;
        text{
          color:white;
        }
      }
    }
    .w-service{
      display: flex;
      align-items: center;
      padding: 20rpx 0 40rpx 0;
      font-size: 28rpx;
      color:#71777c;
      text{
        &:last-child{
          color:@color-primary;
        }
      }
    }
    .w-third{
      .t-title{
        text{
          color:#71777c;
        }
      }
      .t-entry{
        display: flex;
        justify-content: space-around;
        padding-top: 40rpx;
        .e-item{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width:90rpx;
          height: 90rpx;
          border-radius: 45rpx;
          background: #f7f7f7;
          text{
            font-size: 60rpx;
          }
          button{
            position: absolute;
            top:0;
            bottom:0;
            width:100%;
            opacity: 0;
            z-index: 10;
          }
        }
      }
    }
  }
}
</style>
