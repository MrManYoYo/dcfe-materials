import { Vue, Component, Prop } from 'vue-property-decorator'
import style from './index.module.scss'
import * as IndexTSI from './searchGroup.d'
const ipRegexp = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)

@Component

export default class SearchGroup extends Vue {
  @Prop({ default: '条件查询', type: String }) title!: string

  public get form () {
    return this.$refs.searchForm as IndexTSI.VForm
  }

  private searchForm = {
    attackIP: '',
    state: 0,
    threatType: [],
    startTime: '',
    endTime: ''
  }

  private formRules = {
    attackIP: [{
      validator: (rule: any, value: any, cb: any) => {
        if (!value) {
          cb()
          return
        }
        // IP 校验
        if (value && !ipRegexp.test(value)) {
          cb(new Error('请输入合法IP'))
        }
        cb()
      },
      trigger: 'blur'
    }],
    state: [
      { type: 'number' }
    ],
    threatType: [
      { type: 'array' }
    ]
  }

  private stateList: IndexTSI.StateItem[] = []
  private threatTypeList: IndexTSI.ThreatItem[] = []

  private resetHandle () {
    this.form.resetFields()
  }

  private render () {
    return (
      <div class={ style['search-group-container'] }>
        <h3 class={ style['search-group-title'] }>{ this.title }</h3>

        <i-form ref='searchForm' props={{ model: this.searchForm }} rules={ this.formRules } label-width={ 100 } inline>
          <form-item label='攻击者IP' prop='attackIP'>
            <i-input v-model={ this.searchForm.attackIP } placeholder='请输入攻击源IP' />
          </form-item>
          <form-item label='状态' prop='state'>
            <i-select v-model={ this.searchForm.state } transfer>
              {/* <i-option v-for={item in this.stateList} key={item.value} value={item.value}>{{ item.label }}</i-option> */}
              {this.stateList.map((item: any) => {
                return <i-option value={ item.value }>{ item.label }</i-option>
              })}
            </i-select>
          </form-item>
          <form-item label='威胁类型' prop='threatType'>
            <cascader data={ this.threatTypeList } change-on-select transfer></cascader>
          </form-item>
          <form-item label='时间范围'>
            <div class={ style['form-sub-item-group'] }>
              <form-item prop='startTime' class={ style['form-sub-item'] }>
                <date-picker value={ this.searchForm.startTime } transfer format='yyyy年MM月dd日'
                  type='date' class={ style['search-form-datepicker'] } placeholder='请选择开始时间' />
              </form-item>
              <span class={ style['form-sub-item-split'] }>-</span>
              <form-item prop='endTime' class={ style['form-sub-item'] }>
                <date-picker value={ this.searchForm.endTime } transfer format='yyyy年MM月dd日'
                  type='date' class={ style['search-form-datepicker'] } placeholder='请选择结束时间' />
              </form-item>
            </div>
          </form-item>
        </i-form>

        <div class={ style['search-group-bottom'] }>
          <i-button type='primary' ghost class={ style['search-group-btn'] }>查询</i-button>
          <i-button type='error' ghost onClick={ this.resetHandle } class={ style['search-group-btn'] }>重置</i-button>
        </div>
      </div>
    )
  }
}
