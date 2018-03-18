<template>
    <div class="main-content">
        <div class="login-div">
            <h1 class="head">
                注册
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
                <FormItem prop="gender" label="性别">
                    <RadioGroup v-model="formData.gender">
                        <Radio label="m">♂</Radio>
                        <Radio label="f">♀</Radio>
                        <Radio label="x">x</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Upload action="/signup/uploadAvatar">
                        <Button type="ghost">上传头像</Button>
                    </Upload>
                </FormItem>
                <FormItem prop="">
                    <Input type="textarea" placeholder="个人介绍" v-model="formData.bio"></Input>
                </FormItem>
                
                <FormItem>
                    <Button type="primary" size="large" long @click="register('registerForm')" >注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
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
    const gender = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请选择性别'))
            return false
        }
        callback()
    }
    return {
      formData: {
          username: '',
          password: '',
          gender: '',
          avatar: '',
          bio: '',
      },
      rule: {
          username: [{ validator: validatorName, trigger: 'blur' }],
          password: [{ validator: validatorPass, trigger: 'blur' }],
          repassword: [{ validator: validatorRepass, trigger: 'blur' }],
          gender: [{ validator: gender, trigger: 'blur'}]
      }
    }
  },
  methods: {
      register (name) {
          this.$refs[name].validate(valid => {
              if (valid) {
                  Common.axios('/signup', this.formData).then(res => {
                      if (res.data.code === 'OK') {
                          
                      } else {
                          this.$Message.error(res.data.data)
                      }
                  })
              } else {
                  return false
              }
          })
      },
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
        /* height: 400px; */
        margin: 100px auto;
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
        font-size: 35px;
        margin-bottom: 40px; 
    }
    
</style>
