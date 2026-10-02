export interface StatItem {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  description: string
}

export interface IndustryCase {
  id: string
  title: string
  icon: string
  stat: string
  statLabel: string
  description: string
  highlight: string
}

export interface Milestone {
  year: string
  title: string
  description: string
}

export interface Citation {
  id: string
  text: string
  url?: string
}

export const siteMeta = {
  title: '智启新质',
  subtitle: '人工智能赋能新质生产力数字展厅',
  slogan: '以智能之变，催生新质生产力；以数据之能，塑造高质量发展新动能。',
}

export const heroContent = {
  title: '智启新质',
  subtitle: '人工智能赋能新质生产力',
  description:
    '人工智能是新一轮科技革命和产业变革的核心驱动力。它正在重塑生产方式、优化资源配置、提升全要素生产率，成为培育新质生产力、推动高质量发展的关键引擎。',
  ctaPrimary: '探索数据洞察',
  ctaSecondary: '查看创新路径',
}

export const conceptCards = [
  {
    title: '新质生产力',
    body: '以科技创新为主导，摆脱传统经济增长方式，具有高科技、高效能、高质量特征的先进生产力质态。',
    icon: 'Rocket',
  },
  {
    title: '人工智能',
    body: '通过数据、算法与算力的深度融合，使机器具备感知、认知、学习和决策能力，成为通用目的技术（GPT）。',
    icon: 'BrainCircuit',
  },
  {
    title: '深度融合',
    body: 'AI 与实体经济、社会治理、科学研究的全面结合，催生新产业、新模式、新动能，推动生产力系统性跃升。',
    icon: 'Network',
  },
]

export const stats: StatItem[] = [
  {
    label: '中国 AI 核心产业规模',
    value: 578.7,
    suffix: '亿元',
    decimals: 1,
    description: '2024 年规模，预计 2030 年突破万亿元',
  },
  {
    label: '带动相关产业规模',
    value: 1.8,
    suffix: '万亿元',
    decimals: 1,
    description: 'AI 对上下游产业链的辐射带动效应',
  },
  {
    label: '企业 AI 应用渗透率',
    value: 48,
    suffix: '%',
    decimals: 0,
    description: '大中型企业中已开展 AI 应用的比例',
  },
  {
    label: '预计 2030 年 GDP 贡献增量',
    value: 7,
    prefix: '$',
    suffix: '万亿',
    decimals: 0,
    description: 'PwC 预测中国将占全球 AI 经济影响的 26%',
  },
]

export const trendData = {
  years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025E', '2026E', '2027E', '2028E', '2029E', '2030E'],
  global: [28, 39, 51, 87, 142, 207, 298, 392, 507, 640, 712, 768, 826],
  china: [3, 5, 8, 14, 24, 38, 58, 79, 105, 136, 158, 172, 186],
}

export const radarData = {
  indicators: [
    { name: '技术创新', max: 100 },
    { name: '效率提升', max: 100 },
    { name: '成本降低', max: 100 },
    { name: '绿色低碳', max: 100 },
    { name: '就业升级', max: 100 },
    { name: '产业融合', max: 100 },
  ],
  values: [92, 88, 82, 76, 74, 90],
}

export const industryCases: IndustryCase[] = [
  {
    id: 'manufacturing',
    title: '智能制造',
    icon: 'Factory',
    stat: '30%',
    statLabel: '缺陷检出率提升',
    description:
      '基于机器视觉的质量检测、预测性维护与智能排产，让生产线从“经验驱动”转向“数据驱动”。',
    highlight: '实现柔性制造与大规模个性化定制',
  },
  {
    id: 'agriculture',
    title: '智慧农业',
    icon: 'Wheat',
    stat: '15%',
    statLabel: '作物产量提升',
    description:
      '无人机巡田、土壤墒情监测与病虫害 AI 识别，推动精准施肥、节水灌溉，助力乡村振兴。',
    highlight: '降本增效与绿色生产并举',
  },
  {
    id: 'healthcare',
    title: '智慧医疗',
    icon: 'Stethoscope',
    stat: '40%',
    statLabel: '影像诊断效率提升',
    description:
      'AI 辅助影像判读、药物研发与慢病管理，缓解医疗资源不均，提升基层诊疗能力。',
    highlight: '让优质医疗资源更可及',
  },
  {
    id: 'education',
    title: '智慧教育',
    icon: 'GraduationCap',
    stat: '25%',
    statLabel: '学习完成率提升',
    description:
      '个性化学习路径推荐、智能答疑与学情分析，推动因材施教，释放人的创造力。',
    highlight: '从“标准化教学”到“个性化成长”',
  },
  {
    id: 'transport',
    title: '智慧交通',
    icon: 'Bus',
    stat: '20%',
    statLabel: '交通事故降低',
    description:
      '车路协同、智能调度与自动驾驶技术，提升通行效率，降低物流成本与碳排放。',
    highlight: '构建安全、高效、低碳的出行体系',
  },
  {
    id: 'finance',
    title: '智慧金融',
    icon: 'Landmark',
    stat: '90%',
    statLabel: '反欺诈识别准确率',
    description:
      '智能风控、量化投研与客户服务机器人，提升金融普惠性与风险防控能力。',
    highlight: '数据要素驱动金融服务升级',
  },
]

export const flowSteps = [
  { title: '数据要素', description: '海量高质量数据是 AI 的“燃料”。' },
  { title: '算力基础设施', description: '智算中心、云计算、边缘计算提供澎湃动力。' },
  { title: '算法与大模型', description: '深度学习、大模型实现知识涌现与通用能力。' },
  { title: '产业深度融合', description: 'AI 渗透千行百业，重塑生产与服务流程。' },
  { title: '新质生产力', description: '全要素生产率跃升，经济社会高质量发展。' },
]

export const milestones: Milestone[] = [
  {
    year: '2025',
    title: '大模型规模化应用',
    description: '行业大模型与智能体广泛落地，企业 AI 应用进入“深水区”。',
  },
  {
    year: '2027',
    title: 'AI 与实体经济深度融合',
    description: '智能制造、智慧农业、智慧医疗等重点领域形成可复制样板。',
  },
  {
    year: '2030',
    title: '全球人工智能创新中心',
    description: '中国 AI 理论、技术与应用整体达到世界领先水平。',
  },
  {
    year: '2035',
    title: '新质生产力全面形成',
    description: 'AI 驱动的现代化产业体系基本建成，高质量发展格局巩固。',
  },
]

export const citations: Citation[] = [
  {
    id: 'c1',
    text: '中国信息通信研究院《人工智能发展白皮书（2024 年）》',
    url: 'http://www.caict.ac.cn/',
  },
  {
    id: 'c2',
    text: '国务院《新一代人工智能发展规划》',
    url: 'http://www.gov.cn/zhengce/content/2017-07/20/content_5211996.htm',
  },
  {
    id: 'c3',
    text: 'PwC《Sizing the prize: AI’s potential contribution to the global economy》',
    url: 'https://www.pwc.com/gx/en/issues/artificial-intelligence/',
  },
  {
    id: 'c4',
    text: 'Statista《Artificial Intelligence Market Size Worldwide 2024-2030》',
    url: 'https://www.statista.com/',
  },
  {
    id: 'c5',
    text: '工业和信息化部、国家统计局公开数据',
  },
]
