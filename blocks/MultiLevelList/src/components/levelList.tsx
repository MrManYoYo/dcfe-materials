import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import * as IndexTSI from '../multilevelList.d'
import style from './levelList.module.scss'

@Component({
  name: 'MultilevelListComp'
})

export default class MultilevelListComp extends Vue {
  @Prop({ default: () => [] }) private listData!: IndexTSI.ListItem[] // 数据
  @Prop({ default: 0 }) private rootId!: number // 根节点 ID
  @Prop({ default: 3 }) private maxLevel!: number // 最大层级
  @Prop({ default: 1 }) private currLevel!: number // 当前层级
  @Prop() private addHandle!: (data: IndexTSI.ListItem) => any // 添加按钮回调
  @Prop() private editHandle!: (data: IndexTSI.ListItem) => any // 编辑按钮回调
  @Prop() private deleteHandle!: (data: IndexTSI.ListItem) => any // 删除按钮回调

  private treeData: IndexTSI.ListItem[] = [] // 格式化后的 tree 数据
  private currItemData: IndexTSI.ListItem | null = null // 当前选中项数据

  get showNextLevel (): boolean { // 是否显示下一级列表
    return !!this.currItemData && this.currLevel < this.maxLevel
  }

  @Watch('listData', { immediate: true })
  private onListDataChange (value: IndexTSI.ListItem[]) {
    if (this.currLevel !== 1) {
      this.treeData = value
    } else {
      this.treeData = this.formatTree(value, this.rootId)
    }
    const addItem = this.treeData.find(t => t.add)
    if (addItem) {
      this.currItemData = addItem
      addItem.add = false
    } else if (this.currItemData && !this.treeData.find(t => t.id === (this.currItemData as IndexTSI.ListItem).id)) {
      this.currItemData = null
    }
  }

  // 添加
  private addItemHandle () {
    this.currItemData = null
    this.$emit('addHandle', { parentId: this.rootId })
  }

  // 编辑
  private editItemHandle (item: IndexTSI.ListItem) {
    this.$emit('editHandle', { ...item })
  }

  // 删除
  private deleteItemHandle (item: IndexTSI.ListItem) {
    this.$emit('deleteHandle', { ...item })
  }

  // 格式化数据
  private formatTree (source: IndexTSI.ListItem[], parentId: number) {
    const nodes = source.filter(item => item.parentId === parentId)
    nodes.forEach(item => {
      const hasChildren = source.find(subitem => subitem.parentId === item.id)
      item.children = hasChildren ? this.formatTree(source, item.id) : []
    })
    return nodes
  }

  private render () {
    return (
      <div class={style['level-list-wrapper']}>
        {/* 列表 */}
        <div class={style['level-list']}>
          <div class={style['level-list-header']}>
            <span>ID</span>
            <span>显示名称</span>
            <span class={style['action-btns']}></span>
          </div>

          {
            this.treeData.map(item => {
              return <div
                onClick={() => { this.currItemData = item }}
                class={`${style['level-list-item']} ${this.currItemData && this.currItemData.id === item.id ? style.active : ''}`}
              >
                <span>{ item.code }</span>
                <span>{ item.name }</span>
                <span class={`${style['action-btns']} ${this.currLevel >= this.maxLevel ? style['no-arrow'] : ''}`}>
                  <icon onClick={() => this.editItemHandle(item)} class={style.icon} type='ios-create-outline' />
                  <icon onClick={() => this.deleteItemHandle(item)} class={style.icon} type='ios-trash-outline' />
                  <icon class={[style.icon, style.arrow]} type='md-arrow-dropright' />
                </span>
              </div>
            })
          }

          {
            // !this.treeData.length ? <div class={[style['level-list-item'], style.empty]}>暂无子类型</div> : null
          }

          <div class={style['level-list-footer']} onClick={ this.addItemHandle }>
            <icon class={style.icon} type='md-add-circle' /> 添加
          </div>
        </div>

        {/* 箭头 */}
        {this.showNextLevel
          ? <div class={style['level-list-arrow']}>
            <div class={style['arrow-icons']}>
              <icon class={style.icon} type='md-remove' />
              <icon class={style.icon} type='ios-arrow-forward' />
            </div>
          </div> : null
        }

        {/* 下一级列表 */}
        {this.showNextLevel
          ? <multilevel-list-comp
            listData={ (this.currItemData as IndexTSI.ListItem).children }
            rootId={ (this.currItemData as IndexTSI.ListItem).id }
            maxLevel={ this.maxLevel }
            currLevel={ this.currLevel + 1 }
            on={{
              addHandle: (data: IndexTSI.ListItem) => this.$emit('addHandle', data),
              editHandle: (data: IndexTSI.ListItem) => this.$emit('editHandle', data),
              deleteHandle: (data: IndexTSI.ListItem) => this.$emit('deleteHandle', data)
            }}
          /> : null
        }
      </div>
    )
  }
}
