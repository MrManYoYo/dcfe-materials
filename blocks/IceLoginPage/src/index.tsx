import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
import LoginForm from './components/loginForm'
@Component({
  components: {
    LoginForm
  }
})

export default class LoginPage extends Vue {
  private render () {
    return (
      <div class={style['login-container']}>
        <div class={style['login-bg']}>
          <div class={style['login-wrapper']}></div>
        </div>
        <login-form class={style['login-form']} />
      </div>
    )
  }
}
