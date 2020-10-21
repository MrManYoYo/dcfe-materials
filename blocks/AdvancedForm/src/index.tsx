import { Vue, Component, Watch } from 'vue-property-decorator'
import style from './index.module.scss'
import * as IndexTSI from './advancedForm.d'

@Component

export default class AdvancedForm extends Vue {
  public get form () {
    return this.$refs.advancedForm as IndexTSI.VForm
  }

  // 表单model
  private advancedForm = {
    name: '', // 名称
    status: '', // 类型
    type: '', // 分类
    tag: '', // 标签
    group: '', // 分组
    groupCn: '', // 分组中文
    device: '', // 设备
    deviceCn: '' // 设备中文
  }

  // 表单校验规则
  private formRules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'change', type: 'number' }
    ],
    type: [
      { required: true, message: '请选择类型', trigger: 'change' }
    ],
    tag: [
      { required: true, message: '请选择标签', trigger: 'change' }
    ],
    group: [
      { required: true, message: '请选择分组', trigger: 'change' }
    ],
    device: [
      { required: true, message: '请选择设备', trigger: 'change' }
    ]
  }

  // 按钮等待状态
  private postLoading = false

  // 标签数据
  private currTag = ''
  private tagList: IndexTSI.SelectItem[] = []
  private selectedTagList: IndexTSI.SelectItem[] = []
  @Watch('selectedTagList')
  private onSelectedTagListChange (list: IndexTSI.SelectItem[]) {
    this.advancedForm.tag = list.map(t => t.value).join(',')
    this.tagList.forEach(item => {
      item.disabled = false
      if (list.find(t => item.value === t.value)) {
        item.disabled = true
      }
    })
    this.form.validateField('tag')
  }

  // 分组数据
  private currGroup: any[] = [] // 当前选中的分组
  private groupList: IndexTSI.CascaderItem[] = []

  // 设备数据
  private currDevice: any[] = [] // 当前选中的设备
  private deviceList: IndexTSI.CascaderItem[] = []
  private selectedDevList: IndexTSI.SelectItem[] = []
  @Watch('selectedDevList')
  private onSelectedDevListChange (value: IndexTSI.SelectItem[]) {
    this.advancedForm.device = value.map(t => t.value).join(',')
    this.advancedForm.deviceCn = value.map(t => t.label).join(',')
    this.form.validateField('device')
  }

  private created () {
    this.tagList = [
      { label: '标签1', value: '标签1' },
      { label: '标签2', value: '标签2' },
      { label: '标签3', value: '标签3' }
    ]
    this.groupList = [
      {
        value: 'group1',
        label: '分组1',
        children: [
          { value: 'group1.1', label: '分组1.1' },
          { value: 'group1.2', label: '分组1.2' },
          { value: 'group1.3', label: '分组1.3' }
        ]
      }, {
        value: 'group2',
        label: '分组2',
        children: [
          {
            value: 'group2.1',
            label: '分组2.1',
            children: [
              { value: 'group2.1.1', label: '分组2.1.1' }
            ]
          }, {
            value: 'group2.2',
            label: '分组2.2',
            children: [
              { value: 'group2.2.1', label: '分组2.2.1' },
              { value: 'group2.2.2', label: '分组2.2.2' }
            ]
          }
        ]
      }
    ]
    this.deviceList = [
      {
        value: 'device1',
        label: '设备1',
        children: [
          { value: 'device1.1', label: '设备1.1' },
          { value: 'device1.2', label: '设备1.2' },
          { value: 'device1.3', label: '设备1.3' }
        ]
      }, {
        value: 'device2',
        label: '设备2',
        children: [
          {
            value: 'device2.1',
            label: '设备2.1',
            children: [
              { value: 'device2.1.1', label: '设备2.1.1' }
            ]
          }, {
            value: 'device2.2',
            label: '设备2.2',
            children: [
              { value: 'device2.2.1', label: '设备2.2.1' },
              { value: 'device2.2.2', label: '设备2.2.2' }
            ]
          }
        ]
      }
    ]
  }

  // 选中并添加标签
  private tagChangeHandle (value: any) {
    if (!value) {
      return
    }
    const item = this.tagList.find(t => t.value === value)
    if (item) {
      this.selectedTagList.push(item)
    }
    setTimeout(() => {
      this.currTag = ''
    })
  }

  // 分组发生变化
  private groupChangeHandle (value: any[], selectedData: any[]) {
    const labelArr = selectedData.map(item => item.label)
    this.advancedForm.group = value.join('_')
    this.advancedForm.groupCn = labelArr.join('_')
  }

  // 选中并添加设备
  private deviceChangeHandle (value: any[], selectedData: any[]) {
    if (!value || !value.length) {
      return
    }
    const deviceData = {
      value: value.join('_'),
      label: selectedData.map(item => item.label).join('_')
    }
    const index = this.selectedDevList.findIndex(t => t.value === deviceData.value)
    if (index >= 0) {
      this.selectedDevList.splice(index, 1)
    }
    this.selectedDevList.push(deviceData)
    this.currDevice = []
  }

  private postHandle () {
    this.form.validate((valid?: boolean) => {
      if (valid) {
        this.postLoading = true
        // valid success
        setTimeout(() => {
          this.postLoading = false
        }, 2000)
      }
    })
  }

  private cancelHandle () {
    this.selectedTagList = []
    this.currGroup = []
    this.selectedDevList = []
    this.form.resetFields()
  }

  private render () {
    const form = this.advancedForm
    return (
      <div class={ style['advanced-form-content'] }>
        <i-form ref='advancedForm' props={{ model: form }} rules={ this.formRules } labelWidth={ 100 }>
          <form-item label='名称' prop='name'>
            <i-input v-model={ form.name } maxlength='20' placeholder='请输入名称'></i-input>
          </form-item>

          <form-item label='状态' prop='status'>
            <radio-group vModel={ form.status }>
              <radio label={ 1 }>是</radio>
              <radio label={ 0 }>否</radio>
            </radio-group>
          </form-item>

          <form-item label='类型' prop='type'>
            <i-select v-model={ form.type } filterable placeholder='请选择类型'>
              <i-option value='type1'>类型1</i-option>
              <i-option value='type2'>类型2</i-option>
              <i-option value='type3'>类型3</i-option>
            </i-select>
          </form-item>

          <form-item label='分组' prop='group'>
            <cascader
              data={ this.groupList }
              v-model={ this.currGroup }
              on={{ 'on-change': this.groupChangeHandle }}
              placeholder='请选择分组'
              render-format={ (label: any[]) => label.join('_') }
              clearable={ false }
            />
          </form-item>

          <form-item label='标签' prop='tag'>
            <div class={ style['multi-select-box'] }>
              <div class={ style['selected-list'] }>
                {this.selectedTagList.map((item, index) => {
                  return <span class={ style['tag-item'] }>
                    { item.label }
                    <icon onClick={() => this.selectedTagList.splice(index, 1)} class={ style['icon-close'] } type='md-close-circle' />
                  </span>
                })}
              </div>
              <i-select
                v-model={ this.currTag }
                on={{ 'on-change': this.tagChangeHandle }}
                placeholder='请选择类型'
                filterable clearable
                class={ style.select }
              >
                {this.tagList.map(item => {
                  return <i-option value={ item.value } disabled={ !!item.disabled }>{ item.label }</i-option>
                })}
              </i-select>
            </div>
          </form-item>

          <form-item label='设备' prop='device'>
            <div class={ style['multi-select-box'] }>
              <div class={ style['selected-list'] }>
                {this.selectedDevList.map((item, index) => {
                  return <span class={ style['tag-item'] }>
                    { item.label }
                    <icon onClick={() => this.selectedDevList.splice(index, 1)} class={ style['icon-close'] } type='md-close-circle' />
                  </span>
                })}
              </div>
              <cascader
                data={ this.deviceList }
                v-model={ this.currDevice }
                on={{ 'on-change': this.deviceChangeHandle }}
                placeholder='请选择设备'
                render-format={ (label: any[]) => label.join('_') }
                clearable={ false }
                class={ style.select }
              />
            </div>
          </form-item>

          <form-item label=''>
            <i-button onClick={ this.postHandle } loading={ this.postLoading }
              type='primary' ghost class={ style['save-btn'] }>保存</i-button>
            <i-button onClick={ this.cancelHandle }>取消</i-button>
          </form-item>
        </i-form>
      </div>
    )
  }
}
