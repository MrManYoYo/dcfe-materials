import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
type VForm = Vue & {
  validate: (params?: any) => boolean;
  validateField: (params?: any) => boolean;
  resetFields: () => void;
}
const phoneReg = new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/)
const telReg = new RegExp(/^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/)
const accountReg = new RegExp(/^[a-zA-Z0-9_]{6,20}$/)
@Component

export default class BaseForm extends Vue {
  // 表单model
  private baseForm = {
    name: '',
    email: '',
    tel: '',
    sex: 'male',
    mark: ''
  }

  // 表单校验规则
  private formRules = {
    name: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (accountReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入英文、数字或下划线组合的用户名，6～20个字符'))
          }
        },
        trigger: 'blur'
      }
    ],
    sex: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { message: '请输入正确的邮箱', type: 'email', trigger: 'blur' }
    ],
    tel: [
      { required: true, message: '请输入联系方式', trigger: 'blur' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (phoneReg.test(value) || telReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的联系方式'))
          }
        },
        trigger: 'blur'
      }
    ],
    mark: []
  }

  // 按钮等待状态
  private postLoading = false

  public get form () {
    return this.$refs.baseForm as VForm
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
    this.form.resetFields()
  }

  private render () {
    return (
      <div class={ style['base-form-content'] }>
        <i-form ref='baseForm' props={{ model: this.baseForm }} rules={ this.formRules } labelWidth={ 100 }>
          <form-item label='用户名' prop='name'>
            <i-input vModel={ this.baseForm.name } maxlength='20' placeholder='支持英文、数字和下划线，6～20个字符'></i-input>
          </form-item>
          <form-item label='性别' prop='sex'>
            <radio-group vModel={ this.baseForm.sex }>
              <radio label='male'>男</radio>
              <radio label='female'>女</radio>
            </radio-group>
          </form-item>
          <form-item label='邮箱' prop='email'>
            <i-input type='email' vModel={ this.baseForm.email } maxlength='50' placeholder='请输入邮箱'></i-input>
          </form-item>
          <form-item label='联系电话' prop='tel'>
            <i-input vModel={ this.baseForm.tel } maxlength='20' placeholder='请输入联系电话'></i-input>
          </form-item>
          <form-item label='备注' prop='mark'>
            <i-input type='textarea' vModel={ this.baseForm.mark } autosize={{ minRows: 2, maxRows: 5 }} placeholder='请输入备注信息'></i-input>
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
