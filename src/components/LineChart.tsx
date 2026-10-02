import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useInView } from '../hooks/useInView'
import { trendData } from '../data/content'

export function LineChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.EChartsType | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()

  useEffect(() => {
    if (!chartRef.current) return
    chartInstance.current = echarts.init(chartRef.current, 'dark', { renderer: 'svg' })

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(11, 31, 58, 0.92)',
        borderColor: 'rgba(0, 224, 255, 0.3)',
        textStyle: { color: '#fff' },
        axisPointer: { type: 'cross', crossStyle: { color: '#999' } },
      },
      legend: {
        data: ['全球 AI 市场规模', '中国 AI 市场规模'],
        textStyle: { color: '#cbd5e1' },
        bottom: 0,
      },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: trendData.years,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: '#94a3b8' },
      },
      yAxis: {
        type: 'value',
        name: '市场规模（亿美元）',
        nameTextStyle: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
        axisLabel: { color: '#94a3b8' },
      },
      series: [
        {
          name: '全球 AI 市场规模',
          type: 'line',
          smooth: true,
          data: trendData.global,
          symbolSize: 6,
          lineStyle: { width: 3, color: '#00E0FF' },
          itemStyle: { color: '#00E0FF' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 224, 255, 0.35)' },
              { offset: 1, color: 'rgba(0, 224, 255, 0.01)' },
            ]),
          },
        },
        {
          name: '中国 AI 市场规模',
          type: 'line',
          smooth: true,
          data: trendData.china,
          symbolSize: 6,
          lineStyle: { width: 3, color: '#F5C542' },
          itemStyle: { color: '#F5C542' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(245, 197, 66, 0.35)' },
              { offset: 1, color: 'rgba(245, 197, 66, 0.01)' },
            ]),
          },
        },
      ],
    }

    chartInstance.current.setOption(option)

    const handleResize = () => chartInstance.current?.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (inView) {
      chartInstance.current?.resize()
    }
  }, [inView])

  return (
    <div ref={ref} className="glass-card glow-border p-1">
      <div ref={chartRef} className="h-[380px] w-full rounded-xl md:h-[460px]" />
    </div>
  )
}
