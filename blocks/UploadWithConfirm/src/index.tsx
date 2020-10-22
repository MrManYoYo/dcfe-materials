import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class UploadWidtConfirm extends Vue {
  private uploadLoading = false

  private currUploadFileName = ''

  private fileList: File[] = []

  private triggerUploadHandle () {
    if (this.uploadLoading) {
      return
    };
    (this.$refs.hiddenIpt as HTMLInputElement).click()
  }

  // 文件重新选择后，更新fileList，如果为单选模式，则替换，多选模式追加
  private fileChangeHandle () {
    const files = (this.$refs.hiddenIpt as HTMLInputElement).files
    // files为类数组
    const filesArr = Array.prototype.slice.call(files)
    // 判断是否重复上传
    const alreadyFileNames = this.fileList.map(file => file.name)
    filesArr.forEach((file) => {
      if (alreadyFileNames.indexOf(file.name) === -1) {
        this.fileList.push(file)
      }
    });
    // 更新fileList
    // 清空input中的值，防止删除后无法上传相同文件 - 未触发change
    (this.$refs.hiddenIpt as HTMLInputElement).value = ''
  }

  // 删除已选择的文件
  private deleteFileItem (index: number) {
    this.fileList.splice(index, 1)
  }

  private confirmHandle () {
    if (this.fileList.length) {
      const formData = new FormData()
      this.fileList.forEach(file => {
        formData.append('files', file, file.name)
      })
      console.log(formData.getAll('files'))
    } else {
      return false
    }
    // API
    console.log('confirm?')
    this.uploadLoading = true
    setTimeout(() => {
      this.uploadLoading = false
    }, 2000)
  }

  private render () {
    return (
      <div class={style['upload-wrapper']}>
        <i-input nativeOnClick={ this.triggerUploadHandle }
          v-model={ this.currUploadFileName }
          readonly
          class={ style['upload-file-input'] }
          placeholder='请选择待上传的文件'>
          <i-button slot='append' type='primary'
            disabled={ this.uploadLoading } ghost
            class={ style['upload-file-btn'] }>选择文件</i-button>
        </i-input>
        {/** 隐藏的原生file */}
        <input type='file' ref='hiddenIpt' multiple
          onChange={ this.fileChangeHandle } class={ style['hidden-upload-ipt'] } />
        {/** file list 展示区 */}
        <div class={ style['upload-file-preview'] }>
          {this.fileList.map((file, index) =>
            <div class={ style['upload-file-preview-item'] }>
              <icon type='ios-paper' class={ style['preview-item-icon'] }></icon>
              <span class={ style['preview-item-name'] }>{file.name}</span>
              <icon type='md-close'
                onClick={ this.deleteFileItem.bind(this, index) }
                class={ style['preview-item-delete'] }></icon>
            </div>
          )}
        </div>
        {/** 保存按钮可放至其他地方，这里只做示范和提供上传时的代码 */}
        <i-button type='primary' ghost
          onClick={ this.confirmHandle }
          disabled={ !this.fileList.length }
          loading={ this.uploadLoading }
          class={ style['restore-btn'] }>{this.uploadLoading ? '保存中' : '底部保存按钮'}</i-button>
      </div>
    )
  }
}
