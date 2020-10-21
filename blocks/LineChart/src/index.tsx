import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import style from './index.module.scss'

interface ChartSourceItem {
  name: string;
  value: number;
}
interface ChartSourceObj<T = ChartSourceItem[]> {
  [key: string]: T;
}

interface FormatSource {
  seriesData: any;
  xAxisData: any;
  legendData?: any;
}

// 定义图表主题色
const CHART_THEME = {
  legend: {
    ICON: 'roundRect'
  },
  line: {
    AXIS_LABEL_COLOR: '#8C8C8C',
    AXIS_LABEL_LINE_COLOR: '#8C8C8C',
    AXIS_LABEL_SPLIT_LINE_COLOR: '#f0f0f0',
    LINE_SMOOTH: false,
    createAreaColor (start: string, end: string) {
      return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: start // 0% 处的颜色
        }, {
          offset: 0.5, color: end // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    }
  }
}
@Component

export default class LineChart extends Vue {
  @Prop({
    default: () => ({
      type1: [
        { name: '2020-07-01', value: 310 },
        { name: '2020-07-02', value: 320 },
        { name: '2020-07-03', value: 400 },
        { name: '2020-07-05', value: 100 }
      ],
      type2: [
        { name: '2020-07-01', value: 110 },
        { name: '2020-07-02', value: 220 },
        { name: '2020-07-03', value: 300 },
        { name: '2020-07-04', value: 500 }
      ]
    })
  }) private source!: ChartSourceObj

  @Prop({ default: 'LineChart' }) private name!: string

  @Prop({
    default: () => ['#1B9AEE', '#FFE852', '#F5A623', '#F56C6C', '#8D71FB', '#AEBFCF']
  }) private colors!: string

  public emptyStatus = false
  private chart: any = null

  @Watch('source')
  private onSourceChange (newVal: ChartSourceObj) {
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
    const lineChartDom = this.$refs.lineChart as HTMLCanvasElement
    if (!lineChartDom.clientHeight) {
      lineChartDom.style.height = `${(this.$refs.lineChartWrapper as HTMLCanvasElement).clientHeight}px`
    }
    this.chart = echarts.init(lineChartDom)
  }

  private updateChart (source: ChartSourceObj) {
    const { seriesData, xAxisData, legendData } = this.formatSource(source)
    if (!seriesData || seriesData.length === 0) {
      return
    }
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
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
      legend: {
        show: legendData && legendData.length > 0,
        top: '5%',
        right: '5%',
        data: legendData || []
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLabel: {
          color: CHART_THEME.line.AXIS_LABEL_COLOR
        },
        axisLine: {
          lineStyle: { color: CHART_THEME.line.AXIS_LABEL_LINE_COLOR }
        },
        splitLine: {
          lineStyle: { color: CHART_THEME.line.AXIS_LABEL_SPLIT_LINE_COLOR }
        },
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLabel: {
          color: CHART_THEME.line.AXIS_LABEL_COLOR
        },
        axisLine: {
          lineStyle: { color: CHART_THEME.line.AXIS_LABEL_LINE_COLOR }
        },
        splitLine: {
          lineStyle: { color: CHART_THEME.line.AXIS_LABEL_SPLIT_LINE_COLOR }
        },
        splitNumber: 3
      },
      series: seriesData,
      color: this.colors
    }
    this.chart.setOption(options)
  }

  private formatSource (source: ChartSourceObj): FormatSource {
    let seriesData: any[] = []
    let xAxisData: string[] = []
    const legendData: any[] = []
    if (Object.prototype.toString.call(source) === '[object Object]') {
      const groups = Object.keys(source)
      let names: string[] = []
      const sourceObj: any = {}
      const sourceArr: any = {}
      // 取各项key值合并去重，防止存在缺省
      groups.forEach(group => {
        sourceObj[group] = {}
        sourceArr[group] = []
        source[group].forEach(item => {
          sourceObj[group][item.name] = item.value
        })
        legendData.push({
          name: group,
          icon: CHART_THEME.legend.ICON
        })
      })
      Object.values(source).forEach(arr => {
        names = [...names, ...arr.map(item => item.name)]
      })
      names = [...new Set(names)].sort()
      names.forEach(name => {
        groups.forEach(group => {
          sourceArr[group].push(Object.prototype.hasOwnProperty.call(sourceObj[group], name) ? sourceObj[group][name] : 0)
        })
      })
      xAxisData = names
      seriesData = groups.map(group => ({
        name: group,
        type: 'line',
        smooth: CHART_THEME.line.LINE_SMOOTH,
        data: sourceArr[group]
      }))
    }
    return {
      seriesData,
      xAxisData,
      legendData
    }
  }

  private render () {
    return (
      <div class={ style['line-chart-wrapper'] } ref='lineChartWrapper'>
        <div class={ style['line-chart'] } ref='lineChart'></div>
      </div>
    )
  }
}
