<template>
    <div class="main-content">
        <div class="login-div">
            <h1 class="head">
                第三方注册
            </h1>
            <Form  ref="registerForm" :model="formData" :rules="rule" class="login-form">
                <FormItem prop="username">
                    <Input style="display:none"></Input>
                    <Input type="text" v-model="formData.username" placeholder="用户名" transfer></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" style="display:none"></Input>            
                    <Input type="password" v-model="formData.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem prop="repassword">
                    <Input type="password" style="display:none"></Input>            
                    <Input type="password" v-model="formData.repassword" placeholder="再次输入密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" long @click="register('registerForm')" >注册</Button>
                    <Button type="ghost" size="large" :style="{marginTop: '10px'}" long @click="toLogin" >登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
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
        repassword: '',
        bio: decodeURIComponent(this.$route.query.bio),
        oauthinfo: {
          name: this.$route.query.name,
          type: this.$route.query.type,
          avatar_url: this.$route.query.avatar_url
        }
      },
      rule: {
        username: [{ validator: validatorName, trigger: 'blur' }],
        password: [{ validator: validatorPass, trigger: 'blur' }],
        repassword: [{ validator: validatorRepass, trigger: 'blur' }],
      }
    }
  },
  methods: {
    register(name) {
      // 注册
      this.$refs[name].validate(valid => {
        if (valid) {
          this.Common.axios('/api/signup/oauth', this.formData).then(res => {
            if (res.data.code === 'OK') {
              // 注册成功直接登录
              this.Cookies.set('user', this.formData.username)
              this.$Message.success('注册成功，正在跳转...')
              setTimeout(() => {
                if (this.Cookies.user === 'admin') {
                  this.$router.push({ name: 'admin' })
                } else {
                  this.$router.push({ name: 'normalPageList' })
                }
              }, 2000)
            } else {
              this.$Message.error(res.data.data)
            }
          })
        } else {
          return false
        }
      })
    },
    toLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
