<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />

    <van-form class="form" ref="form" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="password"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- button -->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            @click="sendCode"
            class="btn"
            size="small"
            round
            block
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            @finish="isShowCodeBtn = true"
            v-else
            :time="time"
            format="ss秒"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      time: 3 * 1000,
      isShowCodeBtn: true
    }
  },
  methods: {
    // submit事件只有表单校验通过以后会被触发
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中....',
        forbidClick: true,
        duration: 0
      })
    },
    // 登录
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        // 如果是手机号或者是验证码错了，用户能知道
        // error 1.js的错 2.axios封装的error对象

        // axios封装的error对象
        // error.response.data 后端返回的数据
        // error.response.status 后端返回的状态码
        // if (error.response && error.response.status === 400) {
        //   this.$toast.fail(error.response.data.message)
        // } else {
        //   // console.dir(error)
        //   this.$toast.clear()
        //   throw error
        // }
      }
    },

    // 发验证码
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        const { data } = await sendCodeAPI(this.mobile)
        console.log(data)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
          console.log(error)
        } else {
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
      this.isShowCodeBtn = false
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
/deep/.form {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
