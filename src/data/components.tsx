import type { ReactNode } from 'react'
import { AISearch } from '~/components/AISearch'
import { ShopTheLook } from '~/components/ShopTheLook'
import { CategorySlidesSection } from '~/components/CategorySlidesSection'
import { WhatsHappeningCarousel } from '~/components/WhatsHappeningCarousel'
import { WhatsAppReplica } from '~/components/WhatsAppReplica'
import { SimpleButton } from '~/components/SimpleButton'
import { DressesToolbar } from '~/components/DressesToolbar'
import { AddButton } from '~/components/AddButton'
import { ProductSearchPanel } from '~/components/ProductSearchPanel'
import { ViewAllButton } from '~/components/ViewAllButton'
import { BoohooHeader } from '~/components/BoohooHeader'
import { TrendingNowIcons } from '~/components/TrendingNowIcons'

export const IMAGE_BASE = 'https://cdn.skiper-ui.com'

const SHOP_THE_LOOK_CODE = `import { useState } from 'react'

const BG_IMAGE = 'https://reformation-main.myshopify.com/cdn/shop/files/shop-the-look.jpg?v=1662464598&width=1920'
const PRODUCT_IMAGE = 'https://reformation-main.myshopify.com/cdn/shop/products/p7.jpg?v=1661160345&width=375'

interface Product {
  id: string
  name: string
  price: string
  image: string
  colors?: string[]
  sizes?: string[]
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Here Comes the Sun T-Shirt - Black', price: '$42.00', image: PRODUCT_IMAGE, colors: ['Black'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: '2', name: 'Mustard High-Waist Sweatpants', price: '$78.00', image: PRODUCT_IMAGE, colors: ['Mustard'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: '3', name: 'Teal Oversized Sweatshirt', price: '$88.00', image: PRODUCT_IMAGE, colors: ['Teal'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: '4', name: 'Red Track Pants', price: '$72.00', image: PRODUCT_IMAGE, colors: ['Red'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
]

interface Hotspot { left: number; top: number; product: Product }

const HOTSPOTS: Hotspot[] = [
  { left: 25, top: 38, product: PRODUCTS[0]! },
  { left: 28, top: 58, product: PRODUCTS[1]! },
  { left: 62, top: 40, product: PRODUCTS[2]! },
  { left: 70, top: 58, product: PRODUCTS[3]! },
]

export function ShopTheLook() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openProduct, setOpenProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const openPanel = (product: Product) => {
    setOpenProduct(product)
    setSelectedSize(product.sizes?.[0] ?? '')
    setQuantity(1)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-1 overflow-hidden bg-[#f5f4f3]">
      <div className="relative min-h-full flex-1 overflow-hidden">
        <img src={BG_IMAGE} alt="Shop the look" className="h-full w-full object-cover object-center" />
        {HOTSPOTS.map((hotspot, index) => (
          <div
            key={hotspot.product.id}
            className="absolute z-10"
            style={{ left: \`\${hotspot.left}%\`, top: \`\${hotspot.top}%\`, transform: 'translate(-50%, -50%)' }}
          >
            <button
              type="button"
              className="shop-the-look-pulse flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/90 bg-white/30 shadow-md backdrop-blur-sm transition hover:bg-white/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black/20"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openPanel(hotspot.product)}
              aria-label={\`View \${hotspot.product.name}\`}
            >
              <span className="h-2 w-2 rounded-full bg-gray-700/80" />
            </button>
            {hoveredIndex === index && (
              <div className="absolute left-1/2 bottom-full z-20 mb-2 -translate-x-1/2" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                <div className="flex flex-col items-center">
                  <div className="h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-white shadow-sm" />
                  <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <img src={hotspot.product.image} alt="" className="h-20 w-20 shrink-0 object-cover" />
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{hotspot.product.name}</p>
                      <p className="mt-0.5 text-sm font-medium text-gray-700">{hotspot.product.price}</p>
                      <button type="button" className="mt-1 text-left text-sm font-medium text-gray-900 underline hover:no-underline" onClick={(e) => { e.stopPropagation(); openPanel(hotspot.product) }}>View Product</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={\`flex shrink-0 flex-col border-l border-gray-200 bg-white shadow-xl transition-[width] duration-300 ease-out \${openProduct ? 'w-full md:w-[420px]' : 'w-0 overflow-hidden'}\`}>
        {openProduct && (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Select options</h2>
              <button type="button" onClick={() => setOpenProduct(null)} className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex gap-4">
                <img src={openProduct.image} alt="" className="h-32 w-28 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900">{openProduct.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{openProduct.price}</p>
                  <p className="mt-1 text-sm text-gray-500">Shipping calculated at checkout.</p>
                </div>
              </div>
              {openProduct.colors?.length > 0 && <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Color: {openProduct.colors[0]}</p></div>}
              {openProduct.sizes?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Size</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {openProduct.sizes.map((size) => (
                      <button key={size} type="button" onClick={() => setSelectedSize(size)} className={\`min-w-[2.5rem] rounded border px-3 py-2 text-sm font-medium transition \${selectedSize === size ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}\`}>{size}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Quantity</span>
                <div className="flex items-center rounded border border-gray-300">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100">−</button>
                  <span className="min-w-[2rem] text-center text-sm">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100">+</button>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <button type="button" className="w-full rounded bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800">Add to cart</button>
                <button type="button" className="w-full rounded border border-gray-900 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50">Buy it now</button>
              </div>
              <button type="button" className="mt-3 text-sm text-gray-600 underline hover:no-underline">View product details</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
`

const AI_SEARCH_CODE = `import { useState, useRef, useEffect } from 'react'

export function AISearch() {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMainMenuOpen(false)
        setSubMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="mb-10 text-3xl font-normal tracking-tight text-gray-800 md:text-4xl">
        Ready when you are.
      </h1>
      <div className="relative w-full max-w-2xl" ref={containerRef}>
        {/* Tooltip, pill search bar (plus, input, mic, audio), main dropdown, sub dropdown, voice state */}
        <div className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
          {!voiceMode ? (
            <>
              <button type="button" onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)} onClick={() => { setMainMenuOpen((o) => !o); setSubMenuOpen(false); }}>+</button>
              <input type="text" placeholder="Ask anything" className="flex-grow bg-transparent px-2 text-lg outline-none" />
              <button type="button" onClick={() => setVoiceMode(true)}>Mic</button>
            </>
          ) : (
            <div className="flex w-full items-center gap-2">
              <div className="flex-grow border-t border-dotted border-gray-300" />
              <div className="flex gap-1"><div className="aisearch-wave-bar w-0.5 rounded-full bg-black" />...</div>
              <button type="button" onClick={() => setVoiceMode(false)}>Cancel</button>
              <button type="button" onClick={() => setVoiceMode(false)}>Submit</button>
            </div>
          )}
        </div>
        {mainMenuOpen && <div className="absolute left-0 mt-2 w-64 rounded-2xl border bg-white py-2 shadow-lg">Add photos & files, Create image, Thinking, Deep research, Shopping research, More (submenu)</div>}
        {subMenuOpen && <div className="absolute left-64 mt-2 ml-2 w-56 rounded-2xl border bg-white py-2 shadow-lg">Web search, Study and learn, Canvas, Quizzes, Explore apps</div>}
      </div>
    </div>
  )
}
`


const CATEGORY_SLIDES_SECTION_CODE = `import { useMemo, useRef, useState } from 'react'

type Audience = 'boys' | 'girls'

interface CategoryItem { id: string; name: string; count: number; image: string }

const BOYS_CATEGORIES: CategoryItem[] = [
  { id: 'sweaters', name: 'Sweaters', count: 25, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sets', name: 'Sets', count: 30, image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tshirts', name: 'T-Shirts', count: 21, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80' },
  { id: 'shirts', name: 'Shirts', count: 35, image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80' },
]

const GIRLS_CATEGORIES: CategoryItem[] = [
  { id: 'dresses', name: 'Dresses', count: 16, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bags', name: 'Bags', count: 21, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80' },
]

export function CategorySlidesSection() {
  const [audience, setAudience] = useState<Audience>('boys')
  const [progress, setProgress] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const categories = useMemo(() => (audience === 'boys' ? BOYS_CATEGORIES : GIRLS_CATEGORIES), [audience])

  const updateProgress = () => {
    const node = listRef.current
    if (!node) return
    const maxScrollable = node.scrollWidth - node.clientWidth
    setProgress(maxScrollable <= 0 ? 0 : node.scrollLeft / maxScrollable)
  }

  return <section>...</section>
}
`

const WHATS_HAPPENING_CAROUSEL_CODE = `import { useRef, useState } from 'react'

interface NewsCard {
  id: string
  title: string
  description: string
  cta: string
  image: string
  logoText?: string
}

const NEWS_CARDS: NewsCard[] = [
  // ... cards omitted for brevity
]

export function WhatsHappeningCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const mobileTrackRef = useRef<HTMLDivElement>(null)

  const onMobileScroll = () => {
    const track = mobileTrackRef.current
    if (!track) return
    // determine nearest card index
  }

  return (
    <section className="min-h-full w-full bg-[#eef1f6] py-10 md:py-16">
      {/* Responsive desktop + mobile carousel layout */}
    </section>
  )
}
`

const TRENDING_NOW_ICONS_CODE = `interface TrendItem {
  id: string
  title: string
  icon: string
  bgClass: string
}

const TREND_ITEMS: TrendItem[] = [
  { id: 'lace-satin', title: 'Lace & Satin Outfits', icon: '✦', bgClass: 'bg-[#efe7e4]' },
  { id: 'funnel-neck', title: 'Funnel Neck Outfits', icon: '◔', bgClass: 'bg-[#e4ddd8]' },
  { id: 'polka-dot', title: 'Polka Dot Outfits', icon: '◉', bgClass: 'bg-[#ece8e6]' },
  { id: 'butter-yellow', title: 'Butter Yellow Outfits', icon: '◌', bgClass: 'bg-[#ecefef]' },
  { id: 'chocolate', title: 'Chocolate Outfits', icon: '⬣', bgClass: 'bg-[#e7dfda]' },
  { id: 'suede', title: 'Suede Outfits', icon: '◐', bgClass: 'bg-[#e6ddd5]' },
  { id: 'striped', title: 'Striped Outfits', icon: '≋', bgClass: 'bg-[#ebeef0]' },
  { id: 'pastels', title: 'Pastels', icon: '✿', bgClass: 'bg-[#ece8e8]' },
]

export function TrendingNowIcons() {
  return (
    <section className="w-full bg-[#f5f5f5] py-12">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <div className="mb-7 flex flex-col items-center">
          <h2 className="text-center text-5xl font-semibold tracking-tight text-[#121212]">Trending Now</h2>
          <span className="mt-4 h-4 w-40 rounded-md bg-[#e8eaee]" />
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
          {TREND_ITEMS.map((item) => (
            <article key={item.id} className="flex flex-col items-center">
              <div className={\`flex h-[150px] w-[150px] items-center justify-center rounded-full text-5xl text-[#222] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] \${item.bgClass}\`} aria-hidden="true">
                <span className="select-none">{item.icon}</span>
              </div>
              <p className="mt-4 text-center text-[20px] leading-tight text-[#171717]">{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
`

const WHATSAPP_REPLICA_CODE = `import { useState } from 'react'

export function WhatsAppReplica() {
  const [view, setView] = useState<'chats' | 'conversation' | 'groupInfo'>('chats')

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-8">
      <div className="relative h-[860px] w-[420px] overflow-hidden rounded-[48px] border-[12px] border-black bg-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        {/* WhatsApp-inspired UI inside a phone mockup */}
      </div>
    </div>
  )
}
`

const SIMPLE_BUTTON_CODE = `import { useState } from 'react'

export function SimpleButton() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      <button
        type="button"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setCount((value) => value + 1)}
      >
        Click me{count > 0 ? \` (\${count})\` : ''}
      </button>
    </div>
  )
}
`

const DRESSES_TOOLBAR_CODE = `export function DressesToolbar() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-white p-6">
      <section className="flex w-full max-w-[1880px] items-center justify-between rounded-[36px] border border-[#e7e7e7] bg-[#f3f3f5] px-8 py-3 text-[#242427]">
        <div className="flex items-center gap-8">
          <h1 className="text-[52px] leading-none font-normal">Dresses</h1>
          <nav className="flex items-center gap-4 text-[40px] text-[#6f6f73]">
            <span>Home</span>
            <span>/</span>
            <span className="font-medium text-[#222226]">Dresses</span>
          </nav>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 text-[42px] text-[#6a6b70]">
            <span className="font-semibold text-[#27272c]">Show:</span>
            <button type="button">9</button>
            <span>/</span>
            <button type="button" className="font-semibold text-[#26262a]">12</button>
            <span>/</span>
            <button type="button">18</button>
            <span>/</span>
            <button type="button">24</button>
          </div>

          <div className="flex items-center gap-6 text-[#afafb4]">
            <ViewIcon columns={2} active />
            <ViewIcon columns={3} />
            <ViewIcon columns={4} />
          </div>

          <button type="button" className="flex min-w-[520px] items-center justify-between rounded-full border border-[#d9d9dc] bg-[#efeff0] px-11 py-5 text-[40px] text-[#6f6f73]">
            <span>Default sorting</span>
            <span>⌄</span>
          </button>
        </div>
      </section>
    </div>
  )
}

function ViewIcon({ columns, active = false }: { columns: 2 | 3 | 4; active?: boolean }) {
  return (
    <button
      type="button"
      className={active ? 'text-[#23242a]' : 'text-[#b3b3b8]'}
      aria-label={\`Switch to \${columns} column view\`}
    >
      <div className="grid gap-[5px]" style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}>
        {Array.from({ length: columns * 2 }).map((_, index) => <span key={index} className="h-[11px] w-[11px] rounded-[3px] bg-current" />)}
      </div>
    </button>
  )
}
`

const ADD_BUTTON_CODE = `import { useState } from 'react'

export function AddButton() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      {quantity === 0 ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          onClick={() => setQuantity(1)}
        >
          <span aria-hidden="true">+</span>
          Add
        </button>
      ) : (
        <div className="inline-flex items-center overflow-hidden rounded-full border border-emerald-200 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 py-2 text-lg font-medium text-emerald-700 transition hover:bg-emerald-50"
            onClick={() => setQuantity((value) => Math.max(0, value - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 px-2 text-center text-sm font-semibold text-slate-800">{quantity}</span>
          <button
            type="button"
            className="px-4 py-2 text-lg font-medium text-emerald-700 transition hover:bg-emerald-50"
            onClick={() => setQuantity((value) => value + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
`

const BOOHOO_HEADER_CODE = `export function BoohooHeader() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-white px-4 py-3">
      <header className="flex w-full max-w-[1920px] items-center justify-between rounded-[28px] bg-[#ececec] px-6 py-4 text-[#121212] md:px-8 lg:px-10">
        <h1 className="text-3xl leading-none font-black tracking-[-0.04em] lowercase md:text-5xl">
          boohoo
        </h1>
        <div className="mx-4 flex h-16 max-w-[1220px] flex-1 items-center rounded-full bg-[#e2e2e2] px-6 md:mx-10 md:px-8">
          <input type="text" placeholder="Search Products and Brands" aria-label="Search products and brands" className="w-full bg-transparent text-lg text-[#787878] outline-none placeholder:text-[#8f8f8f] md:text-[44px] md:leading-none" />
          <div className="ml-4 flex items-center gap-5 text-[#1f1f1f] md:gap-7">
            <button type="button" aria-label="Image search">📷</button>
            <button type="button" aria-label="Search">🔍</button>
          </div>
        </div>
        <nav className="flex items-center gap-5 text-[#171717] md:gap-7" aria-label="Account actions">
          <button type="button" aria-label="Profile">👤</button>
          <button type="button" aria-label="Wishlist">♡</button>
          <button type="button" aria-label="Bag">👜</button>
        </nav>
      </header>
    </div>
  )
}
`

const VIEW_ALL_BUTTON_CODE = `export function ViewAllButton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#d9d9db] p-6">
      <button
        type="button"
        className="bg-gradient-to-r from-[#212123] to-[#141416] px-16 py-7 text-[38px] font-light uppercase tracking-[0.11em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.015]"
      >
        <span className="inline-flex items-center gap-5 leading-none">
          View all
          <span aria-hidden="true" className="text-[44px] leading-none">
            →
          </span>
        </span>
      </button>
    </div>
  )
}
`

const PRODUCT_SEARCH_PANEL_CODE = `const PRODUCTS = [
  {
    id: 'babyrib-mini-shorts',
    name: 'Babyrib Mini Shorts',
    price: '$26.25',
    image: 'https://img.ltwebstatic.com/images3_pi/2024/05/30/0c/17170476976f62510f4d3fd1f13a83c247544fc8cc_thumbnail_720x.webp',
  },
  {
    id: 'backless-halter-romper',
    name: 'Backless Halter Neck Active Romper',
    price: '$27.28',
    image: 'https://img.ltwebstatic.com/images3_pi/2024/09/11/43/1726043816cdf7fd8a877fdf5aaf64348756074c8d_thumbnail_720x.webp',
  },
  {
    id: 'backless-square-dress',
    name: 'Backless Square Neck Long Sleeve Dress',
    price: '$25.02',
    image: 'https://img.ltwebstatic.com/images3_pi/2024/08/13/2b/17235229182b9b64fafe19155f4d58d8f70b5e9ef2_thumbnail_720x.webp',
  },
  {
    id: 'casual-striped-set',
    name: 'Casual Striped Sweatshirt and Pants...',
    price: '$61.40',
    image: 'https://img.ltwebstatic.com/images3_pi/2024/10/15/67/172897223150e0f7147defc2fd12fa43813f861dbc_thumbnail_720x.webp',
  },
] as const

export function ProductSearchPanel() {
  return (
    <section className="mx-auto min-h-screen w-full max-w-[1024px] bg-[#f2f2f2] text-[#1a1a1a]">
      <div className="flex h-[72px] items-center gap-3 border-b border-black/15 px-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="text-black/65">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input type="text" defaultValue="Search" aria-label="Search products" className="flex-1 bg-transparent text-[40px] leading-none font-light tracking-tight outline-none placeholder:text-black/55" />
        <button type="button" aria-label="Close search" className="rounded p-2 text-black/85 transition hover:bg-black/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-10 pt-4">
        <h2 className="text-[36px] font-normal">Products</h2>

        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="min-w-0">
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#e8e8e8]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover object-top" loading="lazy" />
              </div>
              <h3 className="mt-3 text-[16px] leading-[1.25] font-normal tracking-tight">{product.name}</h3>
              <p className="text-[17px] leading-[1.2] font-normal">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
`

export interface ComponentRecord {
  uuid: string
  id: string
  name: string
  image: string
  component: () => ReactNode
  code: string
  premium?: boolean
}

export const COMPONENTS: ComponentRecord[] = [
  {
    uuid: 'f7a8b9c0-d1e2-0f1a-2b3c-4d5e6f7a8b9c',
    id: 'shop-the-look',
    name: 'Shop the Look',
    premium: false,
    image: 'https://reformation-main.myshopify.com/cdn/shop/files/shop-the-look.jpg?v=1662464598&width=600',
    component: () => <ShopTheLook />,
    code: SHOP_THE_LOOK_CODE,
  },
  {
    uuid: 'f4e2c1b0-a9d8-47c6-9e5f-1234567890ab',
    id: 'category-slides-section',
    name: 'Category Slides Section',
    premium: false,
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80',
    component: () => <CategorySlidesSection />,
    code: CATEGORY_SLIDES_SECTION_CODE,
  },
  {
    uuid: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    id: 'ai-search',
    name: 'AI Search',
    premium: false,
    image: '/ai-search-preview.png',
    component: () => <AISearch />,
    code: AI_SEARCH_CODE,
  },
  {
    uuid: 'd97ca7db-9f99-45a0-a6fe-2f8f5cc57fca',
    id: 'whatsapp-replica',
    name: 'WhatsApp Replica',
    premium: false,
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=900&q=80',
    component: () => <WhatsAppReplica />,
    code: WHATSAPP_REPLICA_CODE,
  },
  {
    uuid: '0f7c4b1e-a961-4fc3-a2d5-47bd18c9e123',
    id: 'simple-button',
    name: 'Simple Button',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?auto=format&fit=crop&w=900&q=80',
    component: () => <SimpleButton />,
    code: SIMPLE_BUTTON_CODE,
  },
  {
    uuid: '3f2a54f4-0baf-45de-8f9b-2c6e943bcf21',
    id: 'dresses-toolbar',
    name: 'Dresses Toolbar',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    component: () => <DressesToolbar />,
    code: DRESSES_TOOLBAR_CODE,
  },
  {
    uuid: '6ccff20f-3dcb-4f4e-8aeb-18f705f5e001',
    id: 'add-button',
    name: 'Add Button',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
    component: () => <AddButton />,
    code: ADD_BUTTON_CODE,
  },
  {
    uuid: 'f76dbf6f-627f-44d9-a523-bf4af8f99920',
    id: 'view-all-button',
    name: 'View All Button',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    component: () => <ViewAllButton />,
    code: VIEW_ALL_BUTTON_CODE,
  },
  {
    uuid: 'b7a4f0a1-c6f3-4f47-a67f-2f7d43f95e43',
    id: 'whats-happening-carousel',
    name: "What's Happening Carousel",
    premium: false,
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80',
    component: () => <WhatsHappeningCarousel />,
    code: WHATS_HAPPENING_CAROUSEL_CODE,
  },
  {
    uuid: '90fb0ccb-f34f-487d-b0e8-8adf050d8f0c',
    id: 'product-search-panel',
    name: 'Product Search Panel',
    premium: false,
    image: 'https://img.ltwebstatic.com/images3_pi/2024/08/13/2b/17235229182b9b64fafe19155f4d58d8f70b5e9ef2_thumbnail_720x.webp',
    component: () => <ProductSearchPanel />,
    code: PRODUCT_SEARCH_PANEL_CODE,
  },
  {
    uuid: '53ec2a67-b8de-47f8-a1af-84aa8ff44a49',
    id: 'boohoo-header',
    name: 'Boohoo Header',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    component: () => <BoohooHeader />,
    code: BOOHOO_HEADER_CODE,
  },
  {
    uuid: '9e98bb51-6fe1-43e8-ad4f-2a9b22f0ef5a',
    id: 'trending-now-icons',
    name: 'Trending Now Icons',
    premium: false,
    image:
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=900&q=80',
    component: () => <TrendingNowIcons />,
    code: TRENDING_NOW_ICONS_CODE,
  },
]

export function getComponentById(id: string): ComponentRecord | undefined {
  return COMPONENTS.find((c) => c.id === id)
}

export function getComponentByUuid(uuid: string): ComponentRecord | undefined {
  return COMPONENTS.find((c) => c.uuid === uuid)
}

/** Resolve component by route param: supports both uuid (preferred) and legacy id slug */
export function getComponentByParam(param: string): ComponentRecord | undefined {
  return getComponentByUuid(param) ?? getComponentById(param)
}

export function getPrevNext(id: string) {
  const i = COMPONENTS.findIndex((c) => c.uuid === id || c.id === id)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? COMPONENTS[i - 1]! : null,
    next: i < COMPONENTS.length - 1 ? COMPONENTS[i + 1]! : null,
  }
}
