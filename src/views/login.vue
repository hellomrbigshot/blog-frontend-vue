<template>
    <div class="main-content">
        <div class="login-div login">
            <h1 class="head">
                登录
            </h1>
            <Form  ref="signinForm" :model="formData" :rules="rule" class="login-form">
                <FormItem prop="username">
                    <Input style="display:none"></Input>
                    <Input type="text" v-model="formData.username" placeholder="用户名" transfer></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" style="display:none"></Input>            
                    <Input type="password" v-model="formData.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" long @click="logIn('signinForm')" >登录</Button>
                    <Button type="ghost" size="large" long :style="{marginTop: '10px'}" @click="toRegisterPage">注册</Button>
                </FormItem>
                <FormItem label="第三方登录：">
                    <a href="/api/github/login" :style="{ color: '#2c3e50' }">
                        <Icon type="social-github" :size="30"></Icon>
                    </a>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    const validatorName = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入账号'))
            return false
        }
        callback()
    };
    const validatorPass = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入密码'))
            return false
        }
        callback()
    }
    return {
      formData: {
          username: '',
          password: ''
      },
      rule: {
          username: [{ validator: validatorName, trigger: 'blur' }],
          password: [{ validator: validatorPass, trigger: 'blur' }],
      }
    }
  },
  methods: {
      logIn (name) {
          this.$refs[name].validate(valid => {
              if (!valid) return;
              this.Common.axios('/api/signin', this.formData).then(res => {
                    if (res.data.code === 'OK') {
                        this.Cookies.set('user', this.formData.username)
                        if (this.formData.username === 'admin') {
                          this.$router.push({ name: 'admin' })
                          return false
                        }
                        if (this.$route.query.redirect) {
                            this.$router.push(decodeURIComponent(this.$route.query.redirect))
                            return false
                        }
                        this.$router.push({ name: 'normalPageList' })
                    } else {
                        this.$Message.error(res.data.data)
                    }
                })
          })
      },
      toRegisterPage () {
          this.$router.push({name: 'register'})
      }
  }
}
</script>
<style scoped lang="scss">
@import './login.scss'
</style>
