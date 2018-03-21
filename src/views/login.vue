<template>
    <div class="main-content">
        <div class="login-div">
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
                    <Button type="ghost" size="large" long style="margin-top: 10px;" @click="toRegisterPage">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
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
              if (valid) {
                  Common.axios('/api/signin', this.formData).then(res => {
                      if (res.data.code === 'OK') {
                          if (this.formData.username === 'admin') {
                              this.$router.push('/admin')
                          } else {
                            this.$router.push('/main')
                          }
                        
                      } else {
                        this.$Message.error(res.data.data)
                      }
                  })
              } else {
                  
              }
          })
      },
      toRegisterPage () {
          this.$router.push('/register')
      }
  }
}
</script>
<style scoped>
    .main-content {
        background: #cdcdcd;
        width: 100%;
        height: 100%;
        overflow:hidden;
    }
    .login-div {
        width: 400px;
        height: 400px;
        margin: 250px auto;
        padding: 20px 50px;
        /* border: 1px solid #cdcdcd; */
        border-radius: 10px;
        background: #fff;
    }
    input {
        background-color: #fff !important;
    }
    .head {
        width: 100%;
        text-align: center;
        font-size: 40px;
        margin-bottom: 40px; 
    }
    
</style>
