import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class DataDisplay extends Vue {
  private dataList: any[] = [
    { count: 12, title: 'xxx' },
    { count: 12, title: 'xxx' },
    { count: 12, title: 'xxx' },
    { count: 12, title: 'xxx' },
    { count: 12, title: 'xxx' },
    { count: 12, title: 'xxx' }
  ]

  private render () {
    return (
      <div class={ style['data-display-content'] }>
        <div class={ style['data-display-wrapper'] }>
          { this.dataList.map(item => {
            return <div class={ style['data-display-item'] }>
              <span class={ `${style['data-display-item-icon']} ${style['icon-person']}` }></span>
              <p class={ style['data-display-item-count'] }>{ item.count }</p>
              <p class={ style['data-display-item-title'] }>{ item.title }</p>
            </div>
          }) }
        </div>
      </div>
    )
  }
}
