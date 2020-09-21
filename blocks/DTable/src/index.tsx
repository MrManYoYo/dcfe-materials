import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class Block extends Vue {
  private tableData: any = [
    { name: 'xxx', time: 'xxx', action: 'xxx' }
  ]

  private columns: any = [
    { title: '名称', key: 'name' },
    { title: '时间', key: 'time' },
    { title: '操作', key: 'action' }
  ]

  private render () {
    return (
      <div class={style['custom-table-wrapper']}>
        <i-table data={this.tableData} columns={this.columns}></i-table>
      </div>
    )
  }
}
