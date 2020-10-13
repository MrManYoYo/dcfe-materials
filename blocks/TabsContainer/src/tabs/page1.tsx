import { Vue, Component } from 'vue-property-decorator'

@Component

export default class Page1 extends Vue {
  private render () {
    return (
      <div>Page First</div>
    )
  }
}
