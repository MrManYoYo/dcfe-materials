import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class TabsNav extends Vue {
  private navModeList: any[] = [
    { name: '菜单一', label: '菜单一' },
    { name: '菜单二', label: '菜单二' },
    { name: '菜单三', label: '菜单三' },
    { name: '菜单四', label: '菜单四' }
  ]

  private activeName = ''

  public navChangeHandle (name: string) {
    console.log(name)
    // this.$router.push(`/${name}`)
  }

  private render () {
    return (
      <div class={ style['tabs-nav-wrapper'] }>
        <tabs on={{ 'on-click': this.navChangeHandle }} navMode navModeList={ this.navModeList } vModel={this.activeName}></tabs>
        <div class={ style['tabs-nav-route-cont'] }>
          {/* <router-view /> */}
          <alert show-icon>此处实际开发中用router-view替换，配合keep-alive决定需要缓存的路由页面</alert>
        </div>
      </div>
    )
  }
}
