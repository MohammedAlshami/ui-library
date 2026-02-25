import type { ReactNode } from 'react'
import { ShopTheLook } from '~/components/ShopTheLook'

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

/** Dummy component used for all entries until real components are added. Renders as the full preview area. */
function DummyPreview({ name }: { name: string }) {
  return (
    <div
      id="preview"
      className="flex min-h-screen w-full flex-1 items-center justify-center bg-[#f5f4f3] p-6"
    >
      <p className="text-center text-gray-500">
        Preview: <span className="font-medium text-gray-700">{name}</span>
      </p>
    </div>
  )
}

export interface ComponentRecord {
  uuid: string
  id: string
  name: string
  image: string
  component: () => ReactNode
  code: string
  premium?: boolean
}

const DUMMY_CODE = (id: string, name: string) => `// ${name} – placeholder
export function Example() {
  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <p>${name} component</p>
    </div>
  )
}
`

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
    uuid: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    id: 'skiper71',
    name: 'Image reveal',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper71.webp`,
    component: () => <DummyPreview name="Image reveal" />,
    code: DUMMY_CODE('skiper71', 'Image reveal'),
  },
  {
    uuid: 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e',
    id: 'skiper6',
    name: 'Hover members',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper6.webp`,
    component: () => <DummyPreview name="Hover members" />,
    code: DUMMY_CODE('skiper6', 'Hover members'),
  },
  {
    uuid: 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
    id: 'skiper5',
    name: 'Things drag and scroll',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper5.webp`,
    component: () => <DummyPreview name="Things drag and scroll" />,
    code: DUMMY_CODE('skiper5', 'Things drag and scroll'),
  },
  {
    uuid: 'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    id: 'skiper56',
    name: 'Devouring details sign in',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper56.webp`,
    component: () => <DummyPreview name="Devouring details sign in" />,
    code: DUMMY_CODE('skiper56', 'Devouring details sign in'),
  },
  {
    uuid: 'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b',
    id: 'skiper2',
    name: 'Dynamic island',
    premium: false,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper2.webp`,
    component: () => <DummyPreview name="Dynamic island" />,
    code: DUMMY_CODE('skiper2', 'Dynamic island'),
  },
  {
    uuid: 'f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c',
    id: 'skiper43',
    name: 'Vercel Tooltip',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper43.webp`,
    component: () => <DummyPreview name="Vercel Tooltip" />,
    code: DUMMY_CODE('skiper43', 'Vercel Tooltip'),
  },
  {
    uuid: 'a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d',
    id: 'skiper22',
    name: 'Aave token swap',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper22.webp`,
    component: () => <DummyPreview name="Aave token swap" />,
    code: DUMMY_CODE('skiper22', 'Aave token swap'),
  },
  {
    uuid: 'b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e',
    id: 'skiper18',
    name: 'Image cursor trail',
    premium: true,
    image: `${IMAGE_BASE}/video/v1/thumb/skiper18.webp`,
    component: () => <DummyPreview name="Image cursor trail" />,
    code: DUMMY_CODE('skiper18', 'Image cursor trail'),
  },
]

export function getComponentById(id: string): ComponentRecord | undefined {
  return COMPONENTS.find((c) => c.id === id)
}

export function getPrevNext(id: string) {
  const i = COMPONENTS.findIndex((c) => c.id === id)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? COMPONENTS[i - 1]! : null,
    next: i < COMPONENTS.length - 1 ? COMPONENTS[i + 1]! : null,
  }
}
