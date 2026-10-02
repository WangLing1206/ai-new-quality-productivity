import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useInView } from '../hooks/useInView'
import { sankeyData } from '../data/content'

export function SankeyDiagram() {
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
        triggerOn: 'mousemove',
        backgroundColor: 'rgba(11, 31, 58, 0.92)',
        borderColor: 'rgba(0, 224, 255, 0.3)',
        textStyle: { color: '#fff' },
      },
      series: [{
        type: 'sankey',
        data: sankeyData.nodes,
        links: sankeyData.links,
        emphasis: { focus: 'adjacency' },
        nodeAlign: 'left',
        lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.4 },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#0B1F3A',
        },
        label: {
          color: '#cbd5e1',
          fontSize: 13,
          fontFamily: 'Noto Sans SC',
        },
        color: ['#00E0FF', '#0EA5E9', '#F5C542', '#8B5CF6', '#10B981', '#EC4899', '#06B6D4', '#6366F1', '#D946EF'],
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
      <div ref={chartRef} className="h-[420px] w-full rounded-xl md:h-[520px]" />
    </div>
  )
}
