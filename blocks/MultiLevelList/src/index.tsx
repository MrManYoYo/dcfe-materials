import { Vue, Component } from 'vue-property-decorator'
import LevelList from './components/levelList'
import * as IndexTSI from './multilevelList.d'
import style from './index.module.scss'

@Component({
  components: {
    LevelList
  }
})

export default class MultiList extends Vue {
  public $refs!: {
    form: IndexTSI.VForm;
  }

  private $Modal!: IndexTSI.VModal

  private listData: IndexTSI.ListItem[] = [] // 列表数据

  private rootId = 0 // 根节点ID

  private showModal = false // 是否显示 添加 / 编辑弹框
  private isAdd = true // 是否新增
  private postLoading = false // 弹框是否保存中
  private currData: IndexTSI.ListItem | null = null // 当前编辑中的数据
  private form: IndexTSI.ItemForm = {
    code: '',
    name: ''
  }

  private formRule = {
    code: {
      required: true,
      validator: (rule: any, value: any, cb: any) => {
        if (!value) {
          cb(new Error('请输入类型ID'))
        } else if (!/^(?=.*[a-zA-Z].*)[a-zA-Z0-9]+$/.test(value)) {
          cb(new Error('只能输入字母、数字，且至少有一个字母'))
        }
        cb()
      },
      trigger: 'blur'
    },
    name: { required: true, message: '请输入显示名称', trigger: 'blur' }
  }

  private created () {
    this.getList()
  }

  // 获取列表数据
  private getList () {
    this.listData = [
      { id: 13, parentId: 12, code: 'waf', name: 'WAF' },
      { id: 16, parentId: 13, code: 'ct', name: '长亭' },
      { id: 20, parentId: 16, code: 'ver2.0', name: 'v2.0' },
      { id: 41, parentId: 13, code: 'lm', name: '绿盟' },
      { id: 42, parentId: 41, code: 'qbb', name: '全版本' },
      { id: 14, parentId: 12, code: 'ips', name: 'IPS' },
      { id: 202, parentId: 14, code: 'tq', name: '天清' },
      { id: 205, parentId: 14, code: 'qm', name: '启明星辰' }
    ]
    this.rootId = 12
  }

  // 添加操作
  private addHandle (data: IndexTSI.ListItem) {
    this.isAdd = true
    this.currData = data
    this.showModal = true
  }

  // 编辑操作
  private editHandle (data: IndexTSI.ListItem) {
    this.isAdd = false
    this.currData = data
    this.form = {
      code: data.code,
      name: data.name
    }
    this.showModal = true
  }

  // 删除操作
  private deleteHandle (data: IndexTSI.ListItem) {
    this.$Modal.confirm({
      title: '提示',
      content: data.children && data.children.length ? '当前类型包含子类型，是否继续？' : '删除操作不可逆，是否继续？',
      onOk: () => {
        const index = this.listData.findIndex(t => t.id === data.id)
        this.listData.splice(index, 1)
      }
    })
  }

  // 关闭弹框
  private cancelHandle () {
    if (this.$refs.form) {
      this.$refs.form.resetFields()
    }
    this.showModal = false
  }

  // 保存
  private saveHandle () {
    this.$refs.form.validate((valid?: boolean) => {
      if (valid) {
        this.postLoading = true
        setTimeout(() => {
          const currData = this.currData as IndexTSI.ListItem
          if (this.isAdd) {
            this.listData.push({
              ...currData,
              ...this.form,
              add: true,
              id: Math.random()
            })
          } else {
            const index = this.listData.findIndex(t => t.id === currData.id)
            this.listData.splice(index, 1, { ...currData, ...this.form })
          }

          this.postLoading = false
          this.cancelHandle()
        }, 1000)
      }
    })
  }

  private render () {
    return (
      <div class={ style['multilevel-list-wrapper'] }>
        <level-list
          listData={ this.listData }
          rootId={ this.rootId }
          on={{
            addHandle: this.addHandle,
            editHandle: this.editHandle,
            deleteHandle: this.deleteHandle
          }}
        />

        {/* 添加 / 编辑弹框 */}
        <modal
          v-model={ this.showModal }
          title={ this.isAdd ? '添加类型' : '编辑类型' }
          width='480'
          on={{
            'on-cancel': this.cancelHandle
          }}
          mask-closable={ false }
        >
          <i-form ref='form' props={{ model: this.form }} rules={ this.formRule } labelWidth={ 100 }>
            <form-item label='类型ID' prop='code'>
              <i-input
                v-model={ this.form.code }
                autofocus
                maxlength='40'
                placeholder='请输入类型ID'
                class={ style['form-input'] }
              />
            </form-item>
            <form-item label='显示名称' prop='name'>
              <i-input
                v-model={ this.form.name }
                maxlength='40'
                placeholder='请输入显示名称'
                class={ style['form-input'] }
              />
            </form-item>
          </i-form>

          <div slot='footer'>
            <i-button type='text' disabled={ this.postLoading } onClick={ this.cancelHandle }>取消</i-button>
            <i-button type='primary' loading={ this.postLoading } onClick={ this.saveHandle }>确定</i-button>
          </div>
        </modal>
      </div>
    )
  }
}
