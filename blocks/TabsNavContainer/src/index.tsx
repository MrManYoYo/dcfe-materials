import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class Block extends Vue {
  private render () {
    return (
      <div class={style['block-wrapper']}>
        lorem
      </div>
    )
  }
}
