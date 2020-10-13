import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
import PageFirst from './tabs/page1'
import PageSecond from './tabs/page2'
interface TabsItem {
  label: string;
  name: string;
  componentId: string;
}
@Component({
  components: {
    PageFirst,
    PageSecond
  }
})

export default class TabsContainer extends Vue {
  private tabsList: TabsItem[] = [
    { label: 'Page1', name: 'Page1', componentId: 'PageFirst' },
    { label: 'Page2', name: 'Page2', componentId: 'PageSecond' }
  ]

  private render () {
    return (
      <div class={style['tabs-container-wrapper']}>
        <tabs type='card' closable>
          {this.tabsList.map(item => {
            return <tab-pane label={ item.label } name={ item.name }>
              {item.componentId === 'PageFirst' ? <PageFirst /> : <PageSecond />}
            </tab-pane>
          })}
        </tabs>
      </div>
    )
  }
}
