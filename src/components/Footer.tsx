import { citations } from '../data/content'

export function Footer() {
  return (
    <footer id="citations" className="relative border-t border-surfaceBorder bg-deep-900/80 backdrop-blur-md">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-white">数据来源与致谢</h3>
            <p className="mt-3 max-w-xl text-slate-400">
              本站数据主要整理自公开研究报告、政府规划文件及权威机构统计，仅供课程展示与学术交流使用。
            </p>
          </div>
          <div>
            <ul className="space-y-3">
              {citations.map((c) => (
                <li key={c.id} className="text-sm text-slate-400">
                  <span className="mr-2 inline-block h-5 w-5 rounded-full bg-tech/10 text-center text-xs leading-5 text-tech">
                    {c.id}
                  </span>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-tech"
                    >
                      {c.text}
                    </a>
                  ) : (
                    c.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surfaceBorder pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 智启新质 — 人工智能赋能新质生产力数字展厅</p>
          <p>课程作业 · 数据可视化设计</p>
        </div>
      </div>
    </footer>
  )
}
