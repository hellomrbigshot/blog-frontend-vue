<template>
    <div class="main-content">
        <div class="login-div">
            <h1 class="head">
                Login
            </h1>
            <Form  ref="signinForm" :model="formData" :rules="rule" class="login-form">
                <FormItem prop="username">
                    <Input style="display:none"></Input>
                    <Input type="text" v-model="formData.username" placeholder="Username" transfer></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" style="display:none"></Input>            
                    <Input type="password" v-model="formData.password" placeholder="Password"></Input>
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
  mounted () {
  },
  methods: {
      logIn (name) {
          this.$refs[name].validate(valid => {
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
        padding: 0 50px;
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
        font-size: 60px;
        margin-bottom: 40px; 
    }
    
</style>
