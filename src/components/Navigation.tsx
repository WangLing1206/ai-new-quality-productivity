import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '解读', href: '#concept' },
  { label: '数据', href: '#stats' },
  { label: '趋势', href: '#trend' },
  { label: '投资', href: '#investment' },
  { label: '赋能', href: '#industry' },
  { label: '路径', href: '#flow' },
  { label: '链路', href: '#sankey' },
  { label: '技术', href: '#tech' },
  { label: '政策', href: '#policy' },
  { label: '展望', href: '#future' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-surfaceBorder bg-deep-900/85 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleClick('#hero')
          }}
          className="text-xl font-black tracking-tight text-white"
        >
          智启<span className="text-tech">新质</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href)
              }}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-surface hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-surfaceBorder bg-deep-900/95 px-6 pb-4 pt-2 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href)
              }}
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-300 hover:bg-surface hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
