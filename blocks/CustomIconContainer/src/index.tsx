import { Vue, Component, Prop } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class CustomIconContainer extends Vue {
  @Prop({ default: '' }) private title!: string // 标题
  @Prop({ default: 'bar' }) private type!: 'bar' | 'icon' | 'img' | 'slot' | 'none' // 显示 icon 的方式
  @Prop({ default: '' }) private icon!: string // type=icon时，为icon的type  type=img时，为img的src

  private render () {
    const renderTitle = <div class={[style['custom-icon-title'], style[this.type]]}>
      { this.type === 'icon' && <icon class={style['custom-icon']} type={ this.icon } /> }
      { this.type === 'img' && <img class={style['custom-icon']} src={ this.icon } /> }
      { this.type === 'slot' && this.$slots.icon }
      { this.title }
    </div>

    return (
      this.$slots.default ? (
        <div class={style['custom-icon-container']}>
          { renderTitle }
          { this.$slots.default }
        </div>
      ) : renderTitle
    )
  }
}
