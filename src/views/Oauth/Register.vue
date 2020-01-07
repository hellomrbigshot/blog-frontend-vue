<template>
  <div class="main-content">
    <div class="login-div">
      <h1 class="head">
        注册
      </h1>
      <Form
        ref="registerForm"
        class="login-form"
        :model="formData"
        :rules="rule"
      >
        <FormItem prop="username">
          <Input style="display:none"/>
          <Input
            v-model="formData.username"
            type="text"
            placeholder="用户名"
            transfer
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            style="display:none"
          />
          <Input
            v-model="formData.password"
            type="password"
            placeholder="密码"
          />
        </FormItem>
        <FormItem prop="repassword">
          <Input
            type="password"
            style="display:none"
          />
          <Input
            v-model="formData.repassword"
            type="password"
            placeholder="再次输入密码"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            long
            @click="register('registerForm')"
          >注册</Button>
          <Button
            type="default"
            size="large"
            :style="{marginTop: '10px'}"
            long
            @click="toLogin()"
          >登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    const validatorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
        return false
      }
      callback()
    }
    const validatorPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
        return false
      }
      callback()
    }
    const validatorRepass = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('两次密码输入不一致'))
        return false
      }
      callback()
    }
    return {
      formData: {
        username: '',
        password: '',
        gender: 'x',
        avatar: '',
        bio: ''
      },
      rule: {
        username: [{ validator: validatorName, trigger: 'blur' }],
        password: [{ validator: validatorPass, trigger: 'blur' }],
        repassword: [{ validator: validatorRepass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      // 头像上传成功
      this.formData.avatar = response.data
    },
    uploadError (response, file, fileList) {
      // 头像上传失败
      this.$Message.error('头像上传失败')
    },
    register (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const { username } = this.formData
          this.Common.axios('/api/signup', this.formData).then(res => {
            // 注册成功直接登录
            const { data: { data: { token, refresh_token: refreshToken } } } = res
            this.Cookies.set('user', username)
            this.Cookies.set('token', token)
            this.Cookies.set('refreshToken', refreshToken)
            this.$store.commit('updateUser', { username })
            this.$Message.success('注册成功，正在跳转...')
            setTimeout(() => {
              this.$router.push({ path: `/user/${this.formData.username}` })
            }, 2000)
          })
        } else {
          return false
        }
      })
    },
    toLogin () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
