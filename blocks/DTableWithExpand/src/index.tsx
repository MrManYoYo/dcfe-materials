import { Vue, Component } from 'vue-property-decorator'
import { Message } from 'dcfe-view-design'
import ExpandInfo from './components/expand'
import { CreateElement } from 'vue/types/umd'
import style from './index.module.scss'
interface TableParams {
  pagesize: number;
  pagenum: number;
  query?: string | null;
}
interface ListItem {
  name: string;
  time: string;
  [propname: string]: any;
}
@Component({
  components: { ExpandInfo }
})

export default class Block extends Vue {
  // 列表请求参数
  private tableParams: TableParams = {
    pagesize: 10,
    pagenum: 1,
    query: null
  }

  private tableTotal = 100

  // loading状态
  private tableLoading = false

  private tableData: any[] = [
    { name: 'xxx', time: 'xxx', action: 'xxx' },
    { name: 'xxx', time: 'xxx', action: 'xxx' },
    { name: 'xxx', time: 'xxx', action: 'xxx' },
    { name: 'xxx', time: 'xxx', action: 'xxx' },
    { name: 'xxx', time: 'xxx', action: 'xxx' }
  ]

  private columns: any = [
    {
      type: 'expand',
      width: 50,
      render: (h: CreateElement, params: any) => h(ExpandInfo, {
        props: {
          row: params.row
        }
      })
    },
    { title: '名称', key: 'name' },
    { title: '时间', key: 'time' },
    {
      title: '操作',
      render: (h: CreateElement, params: any) => h('div', [
        h('i-button', {
          props: {
            type: 'text',
            size: 'small'
          },
          on: {
            click: () => {
              // view detail
              (this.$Message as Message).info(params.row.name)
            }
          }
        }, '详情'),
        h('i-button', {
          props: {
            type: 'text',
            size: 'small'
          },
          on: {
            click: () => {
              // delete
            }
          }
        }, '删除')
      ]),
      width: 150
    }
  ]

  private created () {
    this.fetchListData()
  }

  // 刷新列表。reset重置请求参数
  private refreshList (reset?: boolean) {
    if (reset) {
      this.tableParams.pagenum = 1
      this.tableParams.query = null
    }
    this.fetchListData()
  }

  // 请求列表数据
  private fetchListData () {
    this.tableLoading = true
    return new Promise((resolve, reject) => {
      // api fetch
      setTimeout(() => {
        this.tableLoading = false
        if (new Date().valueOf() > 1) {
          resolve()
        } else {
          reject(new Error('fetch list fail'))
        }
      }, 300)
    })
  }

  // 分页size改变
  private pageSizeChangeHandle (pagesize: number) {
    this.tableParams.pagesize = pagesize
    this.fetchListData()
  }

  private getRowClassName () {
    return 'custom-table-row'
  }

  private render () {
    return (
      <div class={style['custom-table-wrapper']}>
        <i-table data={this.tableData} columns={this.columns} loading={ this.tableLoading }
          ref='customTable'
          rowClassName={ this.getRowClassName }
          border stripe>
          {/** 列表底部分页区 */}
          <div slot='footer' class={ style['table-footer-cont'] }>
            <page total={ this.tableTotal }
              current={ this.tableParams.pagenum }
              {...{
                on: {
                  'update:current': (val: number) => { this.tableParams.pagenum = val },
                  'on-change': this.fetchListData,
                  'on-page-size-change': this.pageSizeChangeHandle
                }
              }}
              show-sizer show-total transfer size='small'></page>
          </div>
        </i-table>
      </div>
    )
  }
}
