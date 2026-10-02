const {
  Document, Packer, Paragraph, TextRun, Header, Footer, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, PageNumber, BorderStyle, WidthType, TableLayoutType,
  ShadingType, PageBreak,
} = require('docx')
const fs = require('fs')
const path = require('path')

// --- Helpers from DOCX skill design system ---
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const noBorders = { top: NB, bottom: NB, left: NB, right: NB }
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB }

function splitTitleLines(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title]
  const breakAfter = new Set([
    ...'，。、；：！？',
    ...'的与和及之在于为',
    ...'-_—–·/',
    ...' \t',
  ])
  const lines = []
  let remaining = title
  while (remaining.length > charsPerLine) {
    let breakAt = -1
    for (let i = charsPerLine; i >= Math.floor(charsPerLine * 0.6); i--) {
      if (i < remaining.length && breakAfter.has(remaining[i - 1])) {
        breakAt = i
        break
      }
    }
    if (breakAt === -1) {
      const limit = Math.min(remaining.length, Math.ceil(charsPerLine * 1.3))
      for (let i = charsPerLine + 1; i < limit; i++) {
        if (breakAfter.has(remaining[i - 1])) {
          breakAt = i
          break
        }
      }
    }
    if (breakAt === -1) {
      breakAt = charsPerLine
      const prevChar = remaining[breakAt - 1]
      const nextChar = remaining[breakAt]
      if (prevChar && nextChar &&
          !breakAfter.has(prevChar) && !breakAfter.has(nextChar) &&
          /[\u4e00-\u9fff]/.test(prevChar) && /[\u4e00-\u9fff]/.test(nextChar)) {
        breakAt = breakAt - 1
      }
    }
    lines.push(remaining.slice(0, breakAt).trim())
    remaining = remaining.slice(breakAt).trim()
  }
  if (remaining) lines.push(remaining)
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop()
    lines[lines.length - 1] += last
  }
  return lines
}

function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charWidth = (pt) => pt * 20
  const charsPerLine = (pt) => Math.floor(maxWidthTwips / charWidth(pt))
  let titlePt = preferredPt
  let lines
  while (titlePt >= minPt) {
    const cpl = charsPerLine(titlePt)
    if (cpl < 2) { titlePt -= 2; continue }
    lines = splitTitleLines(title, cpl)
    if (lines.length <= 3) break
    titlePt -= 2
  }
  if (!lines || lines.length > 3) {
    const cpl = charsPerLine(minPt)
    lines = splitTitleLines(title, cpl)
    titlePt = minPt
  }
  return { titlePt, titleLines: lines }
}

function calcCoverSpacing(params) {
  const {
    titleLineCount = 1, titlePt = 36, hasSubtitle = false,
    hasEnglishLabel = false, metaLineCount = 0,
    fixedHeight = 800, pageHeight = 16838,
    marginTop = 0, marginBottom = 0,
  } = params
  const SAFETY = 1200
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY
  const titleHeight = titleLineCount * (titlePt * 23 + 200)
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0
  const metaHeight = metaLineCount * (10 * 23 + 100)
  const implicitParaHeight = 3 * 300
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight +
                        metaHeight + fixedHeight + implicitParaHeight
  const remainingSpace = usableHeight - contentHeight
  const safeRemaining = Math.max(remainingSpace, 400)
  const FOOTER_MIN = 800
  const rawTop = Math.floor(safeRemaining * 0.45)
  const rawBottom = Math.floor(safeRemaining * 0.45)
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN)
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400)
  return { topSpacing, midSpacing: Math.max(safeRemaining - topSpacing - bottomSpacing, 0), bottomSpacing }
}

// --- Cover builder R1 ---
function buildCoverR1(config) {
  const P = config.palette
  const padL = 1200, padR = 800
  const availableWidth = 11906 - padL - padR - 300
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24)
  const titleSize = titlePt * 2
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length,
    fixedHeight: 400,
  })
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 }
  const children = []

  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }))

  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({
        text: config.englishLabel.split('').join('  '),
        size: 18, color: P.accent, font: { ascii: 'Calibri', eastAsia: 'SimHei' }, characterSpacing: 40,
      })],
    }))
  }

  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: 'atLeast' },
      children: [new TextRun({
        text: titleLines[i], size: titleSize, bold: true,
        color: P.titleColor, font: { eastAsia: 'SimHei', ascii: 'Arial' },
      })],
    }))
  }

  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL }, spacing: { after: 800 },
      children: [new TextRun({
        text: config.subtitle, size: 24, color: P.subtitleColor,
        font: { eastAsia: 'Microsoft YaHei', ascii: 'Arial' },
      })],
    }))
  }

  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({
        text: line, size: 24, color: P.metaColor,
        font: { eastAsia: 'Microsoft YaHei', ascii: 'Arial' },
      })],
    }))
  }

  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }))

  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || '', size: 16, color: P.footerColor, font: { ascii: 'Arial' } }),
      new TextRun({ text: '                                        ' }),
      new TextRun({ text: config.footerRight || '', size: 16, color: P.footerColor, font: { ascii: 'Arial' } }),
    ],
  }))

  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: 'exact' },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders,
        children,
      })],
    })],
  })]
}

// --- Body helpers ---
const palette = {
  primary: '#0A1628', body: '#1A2B40', secondary: '#6878A0', accent: '#5B8DB8', surface: '#F4F8FC',
}
const c = (hex) => hex.replace('#', '')

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, color: c(palette.primary), font: { eastAsia: 'SimHei', ascii: 'Arial' }, size: 32 })],
  })
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, color: c(palette.primary), font: { eastAsia: 'SimHei', ascii: 'Arial' }, size: 28 })],
  })
}

function body(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 480 },
    spacing: { line: 312, after: 120 },
    children: [new TextRun({ text, size: 24, color: c(palette.body), font: { eastAsia: 'Microsoft YaHei', ascii: 'Calibri' } })],
  })
}

function bullet(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: 480, hanging: 240 },
    spacing: { line: 312, after: 80 },
    children: [new TextRun({ text: '• ' + text, size: 24, color: c(palette.body), font: { eastAsia: 'Microsoft YaHei', ascii: 'Calibri' } })],
  })
}

function link(text, url) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text: text + ': ', size: 24, color: c(palette.body) }),
      new TextRun({ text: url, size: 24, color: c(palette.accent), underline: { type: 'single' } })],
  })
}

// --- Document assembly ---
const coverPalette = {
  bg: c(palette.primary),
  titleColor: 'FFFFFF',
  subtitleColor: 'AACCFF',
  metaColor: 'DDEEFF',
  accent: c(palette.accent),
  footerColor: 'AABBCC',
}

const coverConfig = {
  title: '智启新质——人工智能赋能新质生产力数字展厅',
  subtitle: '项目亮点说明文档',
  englishLabel: 'PROJECT HIGHLIGHTS',
  metaLines: [
    '主题：人工智能作为新质生产力的作用和意义',
    '形式：数据可视化主题网站',
    '日期：2026年10月',
    '在线访问：https://wangling1206.github.io/ai-new-quality-productivity/',
  ],
  footerLeft: '课程作业 · 视觉设计',
  footerRight: 'WangLing1206',
  palette: coverPalette,
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: { ascii: 'Calibri', eastAsia: 'Microsoft YaHei' }, size: 24, color: c(palette.body) },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: { ascii: 'Arial', eastAsia: 'SimHei' }, size: 32, bold: true, color: c(palette.primary) },
        paragraph: { spacing: { before: 360, after: 160 } },
      },
      heading2: {
        run: { font: { ascii: 'Arial', eastAsia: 'SimHei' }, size: 28, bold: true, color: c(palette.primary) },
        paragraph: { spacing: { before: 280, after: 120 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 0, bottom: 0, left: 0, right: 0 } },
      },
      children: buildCoverR1(coverConfig),
    },
    {
      properties: {
        page: { margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 } },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: '智启新质 · 项目亮点说明', size: 18, color: c(palette.secondary) })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: c(palette.secondary) })],
          })],
        }),
      },
      children: [
        h1('一、项目概述'),
        body('本网站以“人工智能作为新质生产力的作用和意义”为核心主题，采用官方正式、科技感的视觉风格，通过数据可视化、动态交互与信息图表，系统呈现人工智能在产业变革、经济增长和社会进步中的关键角色。'),
        body('项目定位为“数字展厅/政策解读页”，兼顾学术严谨性与视觉冲击力，力求在有限篇幅内传递高密度、高可信度的信息，同时保持浏览体验的流畅与美观。'),

        h1('二、设计亮点'),
        h2('1. 视觉系统'),
        bullet('主色调采用深靛蓝（#0B1F3A）为底，搭配科技青（#00E0FF）与政务金（#F5C542），营造沉稳、前沿且富有权威的视觉氛围。'),
        bullet('标题使用 Noto Serif SC 衬线字体，增强官方正式感；正文使用 Noto Sans SC，保证跨平台显示效果。'),
        bullet('玻璃拟态卡片、微渐变背景、细腻网格、粒子网络与 Hero 区发光核心 SVG 动画相结合，提升页面层次与科技质感。'),

        h2('2. 动效与交互'),
        bullet('滚动触发的淡入、上浮、缩放动画（Framer Motion）让内容自然呈现，避免信息堆叠带来的压迫感。'),
        bullet('核心数据使用数字滚动计数器，进入视口时动态递增，强化数据冲击力。'),
        bullet('导航栏随滚动自动切换背景透明度，锚点导航支持一键跳转；行业卡片支持悬浮高亮。'),
        bullet('新增顶部滚动进度条与右下角“回到顶部”按钮，提升长页面浏览体验。'),

        h1('三、技术架构'),
        body('网站基于现代前端技术栈构建，确保开发效率、可维护性与部署便捷性：'),
        bullet('框架：React 19 + TypeScript + Vite 8，提供类型安全与极速构建体验。'),
        bullet('样式：Tailwind CSS 3，配合自定义设计令牌（design tokens）实现一致的间距、颜色与排版。'),
        bullet('可视化：ECharts 6，支持折线图、柱状图、环形饼图、雷达图、桑基图等多种交互图表，自动适配深色主题。'),
        bullet('动画：Framer Motion + Canvas 粒子网络，打造流畅的滚动与背景动效。'),
        bullet('图标：Lucide React，统一线性图标风格。'),

        new Paragraph({ children: [new PageBreak()] }),

        h1('四、核心可视化内容'),
        h2('1. 概念阐释'),
        body('通过“新质生产力—人工智能—深度融合”三张概念卡片，帮助访问者快速建立主题认知。'),

        h2('2. 核心数据概览'),
        body('展示中国 AI 核心产业规模、带动相关产业规模、企业 AI 应用渗透率及预计 GDP 贡献增量四项关键指标，数据均来自公开研究报告与权威机构。数字采用滚动计数器动画，增强数据冲击力。'),

        h2('3. 全球与中国 AI 市场规模趋势'),
        body('使用 ECharts 面积折线图对比 2018–2030 年全球与中国 AI 市场规模，清晰呈现高速增长态势与中国占比提升。'),

        h2('4. AI 投资结构与场景渗透'),
        body('新增柱状图展示各重点行业 AI 投资额，以及环形饼图展示企业 AI 应用场景分布，从资本与落地两个维度刻画产业热度。'),

        h2('5. AI 赋能百业'),
        body('以六张行业卡片覆盖智能制造、智慧农业、智慧医疗、智慧教育、智慧交通、智慧金融，每张卡片包含核心数据、应用场景与价值亮点。'),

        h2('6. 生产力跃迁路径'),
        body('通过时间轴式流程图，展示“数据要素→算力基础设施→算法与大模型→产业深度融合→新质生产力”的跃迁逻辑。'),

        h2('7. AI 生产力转化桑基图'),
        body('使用桑基图可视化数据、算力、算法如何流向智能制造、智慧医疗等关键行业，最终汇聚为新质生产力，直观呈现价值转化链路。'),

        h2('8. 创新驱动指数'),
        body('使用雷达图从技术创新、效率提升、成本降低、绿色低碳、就业升级、产业融合六个维度，量化 AI 的综合创新价值。'),

        h2('9. 人工智能核心技术栈'),
        body('以大模型、计算机视觉、自然语言处理、智能决策、机器人技术、知识图谱六个模块，呈现 AI 赋能产业的技术底座。'),

        h2('10. 国家战略与政策时间线'),
        body('梳理 2017 年以来国家层面推动人工智能发展的关键政策与规划，凸显新质生产力上升为国家战略的制度背景。'),

        h2('11. 未来展望'),
        body('以 2025、2027、2030、2035 四个里程碑，呈现人工智能从规模化应用到新质生产力全面形成的发展蓝图。'),

        h1('五、数据与来源'),
        body('本网站引用的数据主要来源于：'),
        bullet('中国信息通信研究院《人工智能发展白皮书（2024 年）》'),
        bullet('国务院《新一代人工智能发展规划》'),
        bullet('PwC《Sizing the prize: AI’s potential contribution to the global economy》'),
        bullet('Statista、工信部、国家统计局公开数据'),
        body('所有数据在页面底部均给出引用说明，部分预测值为基于公开报告的测算结果，已在页面中标注。'),

        h1('六、部署与访问'),
        body('项目源代码托管于 GitHub 公开仓库，使用 gh-pages 工具将构建产物部署至 GitHub Pages，访问地址如下：'),
        link('在线访问', 'https://wangling1206.github.io/ai-new-quality-productivity/'),
        body('本地开发可通过 npm install 与 npm run dev 启动；构建命令为 npm run build，部署命令为 npm run deploy。'),

        h1('七、交付物清单'),
        body('本项目最终提交以下四项内容：'),
        bullet('已部署的网站链接： https://wangling1206.github.io/ai-new-quality-productivity/'),
        bullet('网站源代码 ZIP 压缩包，包含完整 React + TypeScript 项目源码。'),
        bullet('无配音的网站亮点展示视频（MP4），时长约 1 分钟，附配音脚本。'),
        bullet('本项目亮点说明 Word 文档。'),

        h1('八、结语'),
        body('人工智能正在深刻改变人类的生产方式与生活方式。本网站试图以可视化的语言，呈现这一变革的广度与深度，传递“智启新质”的核心理念：以智能之变，催生新质生产力；以数据之能，塑造高质量发展新动能。'),
      ],
    },
  ],
})

const outDir = path.join(__dirname, '..', 'docs')
fs.mkdirSync(outDir, { recursive: true })
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(path.join(outDir, '项目亮点说明.docx'), buf)
  console.log('Document saved to docs/项目亮点说明.docx')
})
