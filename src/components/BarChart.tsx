import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useInView } from '../hooks/useInView'
import { investmentData } from '../data/content'

export function BarChart() {
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
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(11, 31, 58, 0.92)',
        borderColor: 'rgba(0, 224, 255, 0.3)',
        textStyle: { color: '#fff' },
      },
      grid: { left: '3%', right: '4%', bottom: '8%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: investmentData.sectors,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: '#94a3b8', interval: 0, rotate: 20 },
      },
      yAxis: {
        type: 'value',
        name: '投资额（亿元）',
        nameTextStyle: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
        axisLabel: { color: '#94a3b8' },
      },
      series: [{
        type: 'bar',
        data: investmentData.values,
        barWidth: '45%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00E0FF' },
            { offset: 1, color: 'rgba(0, 224, 255, 0.15)' },
          ]),
        },
        label: { show: true, position: 'top', color: '#fff' },
      }],
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
    if (inView) chartInstance.current?.resize()
  }, [inView])

  return (
    <div ref={ref} className="glass-card glow-border p-1">
      <div ref={chartRef} className="h-[360px] w-full rounded-xl md:h-[420px]" />
    </div>
  )
}
