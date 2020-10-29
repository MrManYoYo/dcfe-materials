import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class ListFilter extends Vue {
  private headerCollapsed = false
  private serveTagList: string[] = ['111', '222', '333', '444', '555', '666', '777', '888', '999', '1010', '1111', '1212']
  private serveShowSize = 10
  private serverTagChoosed: string[] = ['不限']
  private ostypeTagList: string[] = ['111', '222', '333', '444']
  private ostypeShowSize = 10
  private ostypeTagChoosed: string[] = ['不限']
  private labelTagList: string[] = ['111', '222', '333', '444']
  private labelShowSize = 10
  private labelTagChoosed: string[] = ['不限']

  // 展开 / 收起 筛选区域
  private toggleCollapsed () {
    this.headerCollapsed = !this.headerCollapsed
  }

  // 选中 / 取消标签
  private changeTagHandle (tag: string, type: any) {
    const index = type.indexOf(tag)
    if (index === -1) {
      type.push(tag)
      const nolimitIndex = type.indexOf('不限')
      if (nolimitIndex !== -1) {
        type.splice(nolimitIndex, 1)
      }
    } else {
      type.splice(index, 1)
      if (type.length === 0) {
        type.push('不限')
      }
    }
  }

  // 显示更多
  private showMoreTagHandle (type: string) {
    switch (type) {
      case 'serveTagList':
        this.serveShowSize += 10
        break
      case 'ostypeTagList':
        this.ostypeShowSize += 10
        break
      case 'labelTagList':
        this.labelShowSize += 10
        break
    }
  }

  // 不限
  private clearLimitHandle (type: string[]) {
    type.splice(0)
    type.push('不限')
  }

  private render () {
    return (
      <div class={style['list-filter-cont']}>
        <div class={style['list-filter-header']} onClick={this.toggleCollapsed}>
          {this.headerCollapsed
            ? <icon type='md-arrow-dropright' class={style['toggle-header-btn']} />
            : <icon type='md-arrow-dropdown' class={style['toggle-header-btn']} />
          }
          <span class={style['list-filter-header-title']}>筛选</span>
          {this.headerCollapsed &&
            <div class={style['list-filter-header-overview']}>
              <div class={style['header-overview-item']}>服务
                <span class={[style['header-overview-item-text'], this.serverTagChoosed.length > 1 && style['more-text']]}>
                  { this.serverTagChoosed[0] }
                </span>
              </div>
              <div class={style['header-overview-item']}>系统
                <span class={[style['header-overview-item-text'], this.ostypeTagChoosed.length > 1 && style['more-text']]}>
                  { this.ostypeTagChoosed[0] }
                </span>
              </div>
              <div class={style['header-overview-item']}>标签
                <span class={[style['header-overview-item-text'], this.labelTagChoosed.length > 1 && style['more-text']]}>
                  { this.labelTagChoosed[0] }
                </span>
              </div>
            </div>
          }
        </div>
        {!this.headerCollapsed &&
          <div class={style['list-filter-body']}>
            <div class={style['list-filter-body-item']}>
              <div class={style['list-filter-body-item-title']}>服务</div>
              <div class={style['list-filter-body-item-cont']}>
                <span
                  class={[style['tag-item'], this.serverTagChoosed.includes('不限') && style.active]}
                  onClick={() => this.clearLimitHandle(this.serverTagChoosed)}
                >不限</span>

                {this.serveTagList.map((item, index) => {
                  if (index < this.serveShowSize && item) {
                    return <span
                      key={index}
                      class={[style['tag-item'], this.serverTagChoosed.includes(item) && style.active]}
                      onClick={() => this.changeTagHandle(item, this.serverTagChoosed)}
                    >{ item }</span>
                  }
                })}

                {this.serveTagList.length > this.serveShowSize &&
                  <span
                    class={[style['tag-item'], style['tag-item-show-more']]}
                    onClick={() => this.showMoreTagHandle('serveTagList')}
                  >
                    <icon class={style['icon-more']} type='md-arrow-dropdown' />更多
                  </span>
                }
              </div>
            </div>

            <div class={style['list-filter-body-item']}>
              <div class={style['list-filter-body-item-title']}>系统</div>
              <div class={style['list-filter-body-item-cont']}>
                <span
                  class={[style['tag-item'], this.ostypeTagChoosed.includes('不限') && style.active]}
                  onClick={() => this.clearLimitHandle(this.ostypeTagChoosed)}
                >不限</span>

                {this.ostypeTagList.map((item, index) => {
                  if (index < this.ostypeShowSize && item) {
                    return <span
                      key={index}
                      class={[style['tag-item'], this.ostypeTagChoosed.includes(item) && style.active]}
                      onClick={() => this.changeTagHandle(item, this.ostypeTagChoosed)}
                    >{ item }</span>
                  }
                })}

                {this.ostypeTagList.length > this.ostypeShowSize &&
                  <span
                    class={[style['tag-item'], style['tag-item-show-more']]}
                    onClick={() => this.showMoreTagHandle('ostypeTagList')}
                  >
                    <icon class={style['icon-more']} type='md-arrow-dropdown' />更多
                  </span>
                }
              </div>
            </div>

            <div class={style['list-filter-body-item']}>
              <div class={style['list-filter-body-item-title']}>标签</div>
              <div class={style['list-filter-body-item-cont']}>
                <span
                  class={[style['tag-item'], this.labelTagChoosed.includes('不限') && style.active]}
                  onClick={() => this.clearLimitHandle(this.labelTagChoosed)}
                >不限</span>

                {this.labelTagList.map((item, index) => {
                  if (index < this.labelShowSize && item) {
                    return <span
                      key={index}
                      class={[style['tag-item'], this.labelTagChoosed.includes(item) && style.active]}
                      onClick={() => this.changeTagHandle(item, this.labelTagChoosed)}
                    >{ item }</span>
                  }
                })}

                {this.labelTagList.length > this.labelShowSize &&
                  <span
                    class={[style['tag-item'], style['tag-item-show-more']]}
                    onClick={() => this.showMoreTagHandle('labelTagList')}
                  >
                    <icon class={style['icon-more']} type='md-arrow-dropdown' />更多
                  </span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
