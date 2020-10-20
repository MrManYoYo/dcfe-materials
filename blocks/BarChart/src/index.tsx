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
  xAxisData: string[];
}

// 定义图表主题色
const CHART_THEME = {
  bar: {
    AXIS_LABEL_COLOR: '#8C8C8C',
    AXIS_LABEL_LINE_COLOR: '#8C8C8C',
    AXIS_LABEL_SPLIT_LINE_COLOR: '#f0f0f0'
  }
}
@Component

export default class BarChart extends Vue {
  @Prop({
    default: () => [
      { name: 'xxx', value: 310 },
      { name: 'xxx1', value: 320 },
      { name: 'xxx2', value: 400 },
      { name: 'xxx3', value: 1000 }
    ]
  }) private source!: ChartSource

  @Prop({ default: 'BarChart' }) private name!: string

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
    const barChartDom = this.$refs.barChart as HTMLCanvasElement
    if (!barChartDom.clientHeight) {
      barChartDom.style.height = `${(this.$refs.barChartWrapper as HTMLCanvasElement).clientHeight}px`
    }
    this.chart = echarts.init(barChartDom)
  }

  private updateChart (source: ChartSource) {
    const { seriesData, xAxisData } = this.formatSource(source)
    if (!seriesData || seriesData.length === 0) {
      return
    }
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(150,150,150,0.2)'
          }
        },
        confine: true,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
          fontSize: 12,
          color: '#595959'
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.2)'
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLabel: {
          color: CHART_THEME.bar.AXIS_LABEL_COLOR
        },
        axisLine: {
          lineStyle: { color: CHART_THEME.bar.AXIS_LABEL_LINE_COLOR }
        },
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLabel: {
          color: CHART_THEME.bar.AXIS_LABEL_COLOR
        },
        axisLine: {
          lineStyle: { color: CHART_THEME.bar.AXIS_LABEL_LINE_COLOR }
        },
        splitNumber: 3
      },
      series: [{
        name: this.name,
        type: 'bar',
        barMaxWidth: 30,
        data: seriesData,
        color: this.colors
      }]
    }
    this.chart.setOption(options)
  }

  private formatSource (source: ChartSource): FormatSource {
    let seriesData: ChartSourceItem[] = []
    let xAxisData: string[] = []
    if (Array.isArray(source)) {
      seriesData = source.filter(item =>
        Object.prototype.hasOwnProperty.call(item, 'name') && Object.prototype.hasOwnProperty.call(item, 'value'))
      xAxisData = seriesData.map(item => item.name)
    } else if (Object.prototype.toString.call(source) === '[object Object]') {
      for (const key in source) {
        seriesData.push({
          name: key,
          value: source[key]
        })
        xAxisData.push(key)
      }
    }
    return {
      seriesData,
      xAxisData
    }
  }

  private render () {
    return (
      <div class={ style['bar-chart-wrapper'] } ref='barChartWrapper'>
        <div class={ style['bar-chart'] } ref='barChart'></div>
      </div>
    )
  }
}
