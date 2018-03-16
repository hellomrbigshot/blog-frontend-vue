<template>
  <Form autocomplete="on" ref="signinForm" :model="formData" :rules="rule" class="login-form" :label-width="80">
        <FormItem prop="username" label="Username">
            <Input type="text" v-model="formData.username" placeholder="输入密码" transfer></Input>
        </FormItem>
        <FormItem prop="password" label="Password">
            <Input type="password" v-model="formData.password" placeholder="Password"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="logIn('signinForm')">登录</Button>
        </FormItem>
    </Form>
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
      if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
            $(window).load(function(){
                $('input:-webkit-autofill').each(function(){
                    var text = $(this).val();
                    var name = $(this).attr('name');
                    $(this).after(this.outerHTML).remove();
                    $('input[name=' + name + ']').val(text);
                });
            });
        }
  },
  methods: {
      logIn (name) {
          this.$refs[name].validate(valid => {

          })
      }
  }
}
</script>
<style scoped>
    .login-form {
        width: 400px;
        height: 400px;
        margin: 300px auto;
    }
    input {
        background-color: #fff !important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
    }
</style>
