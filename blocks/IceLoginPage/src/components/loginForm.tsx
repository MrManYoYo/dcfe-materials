import { Vue, Component } from 'vue-property-decorator'
import style from './loginForm.module.scss'
@Component

export default class LoginForm extends Vue {
  public loginFormModel: any = {
    account: '',
    password: '',
    code: ''
  }

  private loginFormRule = {
    account: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }

  private loginLoading = false

  private created () {
    // 重新登录，页面创建后不反回前一个页面
    if (window.history) {
      window.history.pushState(null, '', document.URL)
    }
  }

  private loginHandle () {
    this.loginLoading = true;
    (this.$refs.loginForm as Vue & {validate: (params: any) => boolean}).validate((valid: any) => {
      if (valid) {
        // send login request
      } else {
        this.loginLoading = false
      }
    })
  }

  private render () {
    return (
      <div class={style['login-form-container']}>
        <div class={style['login-form-title']}>账号密码登录</div>
        <i-form ref='loginForm' props={{ model: this.loginFormModel }} rules={this.loginFormRule}>
          <form-item class={style['login-form-item']} prop='account'>
            <i-input vModel={this.loginFormModel.account} placeholder='请输入用户名' />
          </form-item>
          <form-item class={style['login-form-item']} prop='password'>
            <i-input vModel={this.loginFormModel.password} placeholder='请输入用户密码' />
          </form-item>
          <form-item class={style['login-form-item']} prop='code'>
            <i-input vModel={this.loginFormModel.code} placeholder='请输入验证码' />
          </form-item>
          <form-item class={style['login-form-item']}>
            <i-button type='primary' long onClick={ this.loginHandle.bind(this) } loading={this.loginLoading} class={style['login-btn']}>登录</i-button>
          </form-item>
        </i-form>
      </div>
    )
  }
}
