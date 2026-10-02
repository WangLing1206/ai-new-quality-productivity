import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useInView } from '../hooks/useInView'
import { adoptionData } from '../data/content'

export function PieChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.EChartsType | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()

  useEffect(() => {
    if (!chartRef.current) return
    chartInstance.current = echarts.init(chartRef.current, 'dark', { renderer: 'svg' })

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(11, 31, 58, 0.92)',
        borderColor: 'rgba(0, 224, 255, 0.3)',
        textStyle: { color: '#fff' },
        formatter: '{b}: {c}%',
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        textStyle: { color: '#cbd5e1' },
      },
      series: [{
        name: '企业 AI 应用场景',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0B1F3A',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold', color: '#fff' },
        },
        data: adoptionData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: ['#00E0FF', '#F5C542', '#0EA5E9', '#8B5CF6', '#10B981', '#64748B'][index],
          },
        })),
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
