import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useInView } from '../hooks/useInView'
import { radarData } from '../data/content'

export function RadarChart() {
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
      },
      radar: {
        indicator: radarData.indicators,
        shape: 'polygon',
        radius: '65%',
        axisName: { color: '#cbd5e1', fontSize: 13 },
        splitArea: {
          areaStyle: {
            color: ['rgba(0,224,255,0.03)', 'rgba(0,224,255,0.06)', 'rgba(0,224,255,0.09)', 'rgba(0,224,255,0.12)'],
          },
        },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
      },
      series: [
        {
          name: 'AI 创新驱动指数',
          type: 'radar',
          data: [
            {
              value: radarData.values,
              name: '综合指数',
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: 'rgba(0, 224, 255, 0.25)' },
                  { offset: 1, color: 'rgba(0, 224, 255, 0.05)' },
                ]),
              },
              lineStyle: { color: '#00E0FF', width: 2 },
              itemStyle: { color: '#F5C542' },
            },
          ],
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
    if (inView) chartInstance.current?.resize()
  }, [inView])

  return (
    <div ref={ref} className="glass-card glow-border p-1">
      <div ref={chartRef} className="h-[380px] w-full rounded-xl md:h-[460px]" />
    </div>
  )
}
