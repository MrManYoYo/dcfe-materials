import { Vue, Component } from 'vue-property-decorator'
import style from './expand.module.scss'

@Component

export default class ExpandInfo extends Vue {
  private render () {
    return (
      <div class={ style['expand-wrapper'] }>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Quidem assumenda earum excepturi culpa tempora repudiandae molestias officia veritatis.</p>
        <p>Aliquid amet architecto ipsam asperiores labore.</p>
        <p>Obcaecati totam reprehenderit hic laboriosam eaque?</p>
      </div>
    )
  }
}
