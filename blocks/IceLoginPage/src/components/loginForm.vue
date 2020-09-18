<template>
  <div class="login-form-container">
    <div class="login-form-title">账号密码登录</div>
    <Form ref="loginForm" :model="loginFormModel" :rules="loginFormRule">
      <FormItem label="" class="login-form-item" prop='account'>
        <Input v-model="loginFormModel.account" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="" class="login-form-item" prop='password'>
        <Input v-model="loginFormModel.password" placeholder="请输入用户密码" />
      </FormItem>
      <FormItem label="" class="login-form-item" prop='code'>
        <Input v-model="loginFormModel.code" placeholder="请输入验证码" />
      </FormItem>
      <FormItem label="" class="login-form-item">
        <Button type="primary" long @click='loginHandle' :loading='loginLoading' class="login-btn">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        loginFormModel: {
          account: '',
          password: '',
          code: ''
        },
        loginFormRule: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        loginLoading: false
      }
    },
    created() {
      // 重新登录，页面创建后不反回前一个页面
      if (window.history) {
        window.history.pushState(null, '', document.URL)
      }
    },
    methods: {
      loginHandle () {
        this.loginLoading = true
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // send login request
          } else {
            this.loginLoading = false
          }
        })
      },
    },
  }
</script>

<style scoped>
  .login-form-container{
    padding: 30px;
    border: 1px solid #f0f0f0;
  }
  .login-form-title{
    text-align: center;
    margin: 18px 0 30px;
    font-size: 18px;
    line-height: 1;
  }
  .login-form-item:last-of-type{
    margin-bottom: 0;
  }
  .login-btn{
    /* letter-spacing: 1em; */
    /* text-indent: .5em; */
  }
</style>