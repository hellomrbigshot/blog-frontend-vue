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
                    <Button type="default" size="large" long :style="{marginTop: '10px'}" @click="toRegisterPage">注册</Button>
                </FormItem>
                <FormItem label="第三方登录：">
                  <ul class="icon-list">
                    <li>
                      <a href="/api/oauth/github" :style="{ color: '#2c3e50' }">
                          <Icon type="logo-github" :size="30"></Icon>
                      </a>
                    </li>
                    <li>
                      <a href="/api/oauth/weibo" :style="{ color: '#2c3e50' }">
                        <Icon custom="iconfont  icon-weibo-circle-fill" :size="30" />
                      </a>
                    </li>
                  </ul>
                </FormItem>
            </Form>
            <!-- <mForm ref="signinForm" :model="formData" :rules="rule" class="login-form">
              <mFormItem prop="username" label="用户名">
                <mInput type="text" v-model="formData.username" placeholder="用户名" transfer></mInput>
              </mFormItem>
            </mForm> -->
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  components: {
    mForm: () => import('@/components/mUi/src/components/form/form'),
    mFormItem: () => import('@/components/mUi/src/components/form/form-item'),
    mInput: () => import('@/components/mUi/src/components/Input/input')
  },
  data() {
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
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  methods: {
    logIn(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return
        this.Common.axios('/api/signin', this.formData).then(res => {
          this.Cookies.set('user', this.formData.username, { expires: 7 }) // 设置 cookie 过期时间为7天，防止关闭浏览器就删除 cookie
          if (this.formData.username === 'admin') {
            this.$router.push({ name: 'admin' })
            return false
          }
          if (this.$route.query.redirect) {
            const url = decodeURIComponent(this.$route.query.redirect)
            this.$router.push(url.indexOf('/admin') >= 0 ? { name: 'normalPageList' } : url)
            return false
          }
          this.$router.push({ name: 'normalPageList' })
        })
      })
    },
    toRegisterPage() {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
<style scoped lang="scss">
@import './login.scss';
</style>
<style lang="scss" scoped>
.icon-list {
    list-style: none;
    li {
      float: left;
    }
    li:not(:first-child) {
      margin-left: 10px;
    }
}
</style>

