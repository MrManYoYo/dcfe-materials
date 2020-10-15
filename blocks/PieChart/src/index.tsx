import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import style from './index.module.scss'

interface ChartSourceItem {
  name: string;
  value: number;
}
interface ChartSourceObj<T = number> {
  [key: string]: T;
}

type ChartSource = (ChartSourceItem[] | ChartSourceObj)

interface FormatSource {
  seriesData: ChartSourceItem[];
  total: number;
}
@Component

export default class PieChart extends Vue {
  @Prop({
    default: () => [
      { name: 'xxx', value: 310 },
      { name: 'xxx1', value: 320 },
      { name: 'xxx2', value: 400 },
      { name: 'xxx3', value: 1000 }
    ]
  }) private source!: ChartSource

  @Prop({ default: 'PieChart' }) private name!: string

  @Prop({
    default: () => ['#1B9AEE', '#FFE852', '#F5A623', '#F56C6C', '#8D71FB', '#AEBFCF']
  }) private colors!: string

  public emptyStatus = false
  private chart: any = null

  @Watch('source')
  private onSourceChange (newVal: ChartSource) {
    this.updateChart(newVal)
  }

  private mounted () {
    if (!this.chart) {
      this.initChart()
    }
    this.updateChart(this.source)
  }

  private initChart () {
    // min-height的高度无法继承，具体高度根据实际项目调整
    const pieChartDom = this.$refs.pieChart as HTMLCanvasElement
    if (!pieChartDom.clientHeight) {
      pieChartDom.style.height = `${(this.$refs.pieChartWrapper as HTMLCanvasElement).clientHeight}px`
    }
    this.chart = echarts.init(pieChartDom)
  }

  private updateChart (source: ChartSource) {
    const { seriesData, total } = this.formatSource(source)
    if (!seriesData || seriesData.length === 0) {
      return
    }
    const options = {
      title: {
        text: `{title|总数}\n{val|${new Intl.NumberFormat().format(total)}}`,
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            title: {
              fontSize: 14,
              color: '#666666',
              padding: [5, 0],
              fontWeight: 'normal'
            },
            val: {
              fontSize: 20,
              color: '#333',
              fontWeight: 'bold'
            }
          }
        }
      },
      tooltip: {
        trigger: 'item',
        confine: true,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
          fontSize: 12,
          color: '#595959'
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.2)'
      },
      series: [{
        name: this.name,
        type: 'pie',
        radius: ['50%', '70%'],
        label: {
          show: true
        },
        labelLine: {
          show: true
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        },
        data: seriesData,
        color: this.colors
      }]
    }
    this.chart.setOption(options)
  }

  private formatSource (source: ChartSource): FormatSource {
    let seriesData: ChartSourceItem[] = []
    let total = 0
    if (Array.isArray(source)) {
      seriesData = source.filter(item =>
        Object.prototype.hasOwnProperty.call(item, 'name') && Object.prototype.hasOwnProperty.call(item, 'value'))
    } else if (Object.prototype.toString.call(source) === '[object Object]') {
      for (const key in source) {
        seriesData.push({
          name: key,
          value: source[key]
        })
      }
    }
    total = seriesData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)
    return {
      seriesData,
      total
    }
  }

  private render () {
    return (
      <div class={ style['pie-chart-wrapper'] } ref='pieChartWrapper'>
        <div class={ style['pie-chart'] } ref='pieChart'></div>
      </div>
    )
  }
}
