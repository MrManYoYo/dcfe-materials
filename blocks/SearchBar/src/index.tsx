import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class SearchBar extends Vue {
  private search = ''

  private getList () {
    console.log('getList :>> ')
  }

  private addHandle () {
    console.log('addHandle :>> ')
  }

  private render () {
    return (
      <div class={style['search-bar-wrapper']}>
        <i-input
          prefix='ios-search'
          v-model={ this.search }
          clearable
          on={{
            'on-enter': this.getList,
            'on-clear': this.getList
          }}
          maxlength='20'
          placeholder='请输入关键字搜索'
          class={style['search-ipt']}
        />

        <div class={style['search-bar-right']}>
          <i-button
            onClick={ this.addHandle }
            icon='md-add' type='info' ghost
          >新增</i-button>
        </div>
      </div>
    )
  }
}
