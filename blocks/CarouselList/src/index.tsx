import { Vue, Component } from 'vue-property-decorator'
import style from './index.module.scss'
@Component

export default class CarouselList extends Vue {
  private colNum = 5
  private trial = 0
  private aniStatus = true
  private itemHeight = 36
  private list: any[] = [
    { title: '事件1', descript: '这是一段描述', time: '2020-10-23 12:00:00' },
    { title: '事件2', descript: '这是一段描述', time: '2020-10-23 12:00:00' },
    { title: '事件3', descript: '这是一段描述', time: '2020-10-23 12:00:00' },
    { title: '事件4', descript: '这是一段描述', time: '2020-10-23 12:00:00' },
    { title: '事件5', descript: '这是一段描述', time: '2020-10-23 12:00:00' }
  ]

  private initScroll () {
    const listDom = this.$refs.carouselListDom as HTMLDivElement
    // const listBodyDom = this.$refs.listBodyDom as HTMLDivElement
    const listDomCopy = listDom.cloneNode(true)
    Array.prototype.slice.call(listDomCopy.childNodes).forEach(node => {
      listDom.appendChild(node)
    })
  }

  private scrollAni () {
    if (!this.aniStatus) {
      return
    }
    const listDom = this.$refs.carouselListDom as HTMLDivElement
    this.trial -= 0.5
    if (Math.abs(this.trial) >= this.list.length * this.itemHeight) {
      this.trial = 0
    }
    listDom.style.transform = `translateY(${this.trial}px) translateZ(0)`
    window.requestAnimationFrame(this.scrollAni)
  }

  private mouseEnterHandle () {
    this.aniStatus = false
  }

  private mouseLeaveHandle () {
    this.aniStatus = true
    this.scrollAni()
  }

  private mounted () {
    if (this.list.length * 2 > this.colNum) {
      this.initScroll()
      this.scrollAni()
    }
  }

  private render () {
    return (
      <div class={ style['carousel-list-wrapper'] }>
        <div class={ style['carousel-list-header'] }>
        </div>
        <div ref='listBodyDom' class={ style['carousel-list-body'] }
          onmouseenter={ this.mouseEnterHandle }
          onmouseleave={ this.mouseLeaveHandle }
          style={{ height: `${this.itemHeight * this.colNum}px` }}>
          <div ref='carouselListDom'
            class={ style['carousel-list'] }>
            {this.list.map(list =>
              <div class={ style['carousel-list-item'] }>
                <span>{ list.title }</span>
                <span>{ list.descript }</span>
                <span>{ list.time }</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
