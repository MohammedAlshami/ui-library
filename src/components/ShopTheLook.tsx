'use client'

import { useState } from 'react'

const BG_IMAGE =
  'https://reformation-main.myshopify.com/cdn/shop/files/shop-the-look.jpg?v=1662464598&width=1920'
const PRODUCT_IMAGE =
  'https://reformation-main.myshopify.com/cdn/shop/products/p7.jpg?v=1661160345&width=375'

interface Product {
  id: string
  name: string
  price: string
  image: string
  colors?: string[]
  sizes?: string[]
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Here Comes the Sun T-Shirt - Black',
    price: '$42.00',
    image: PRODUCT_IMAGE,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Mustard High-Waist Sweatpants',
    price: '$78.00',
    image: PRODUCT_IMAGE,
    colors: ['Mustard'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    name: 'Teal Oversized Sweatshirt',
    price: '$88.00',
    image: PRODUCT_IMAGE,
    colors: ['Teal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Red Track Pants',
    price: '$72.00',
    image: PRODUCT_IMAGE,
    colors: ['Red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
]

interface Hotspot {
  left: number
  top: number
  product: Product
}

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
    <div className="w-full bg-[#f5f4f3]">
      <section
        id="preview"
        className="relative mx-auto flex h-[33rem] w-full max-w-[1200px] overflow-hidden bg-[#f5f4f3]"
      >
      {/* Left: background image with hotspots */}
      <div className="relative h-full flex-1 overflow-hidden">
        <img
          src={BG_IMAGE}
          alt="Shop the look"
          className="h-full w-full object-cover object-center"
        />
        {HOTSPOTS.map((hotspot, index) => (
          <div
            key={hotspot.product.id}
            className="absolute z-10"
            style={{
              left: `${hotspot.left}%`,
              top: `${hotspot.top}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              type="button"
              className="group relative flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 shop-the-look-pulse"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openPanel(hotspot.product)}
              aria-label={`View ${hotspot.product.name}`}
            >
              <span className="h-1 w-1 rounded-full bg-gray-800" />
            </button>
            {/* Hover popup */}
            {hoveredIndex === index && (
              <div
                className="absolute left-1/2 bottom-full z-20 mb-1.5 -translate-x-1/2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col items-center">
                  {/* Arrow pointing down to the hotspot */}
                  <div className="h-0 w-0 border-x-[6px] border-b-[6px] border-x-transparent border-b-white drop-shadow-sm" />
                  {/* White product card - compact, no border */}
                  <div className="flex gap-2.5 rounded-md bg-white p-2.5 shadow-lg">
                    <img
                      src={hotspot.product.image}
                      alt=""
                      className="h-16 w-16 shrink-0 object-cover"
                    />
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="text-[13px] font-medium leading-tight text-gray-900">
                        {hotspot.product.name}
                      </p>
                      <p className="mt-0.5 text-[13px] font-medium text-gray-900">
                        {hotspot.product.price}
                      </p>
                      <button
                        type="button"
                        className="mt-1 text-left text-[13px] font-medium text-gray-900 underline decoration-gray-900 underline-offset-1 hover:no-underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          openPanel(hotspot.product)
                        }}
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right: slide-in product panel */}
      <div
        className={`flex h-full shrink-0 flex-col border-l border-gray-200 bg-white shadow-xl transition-[width] duration-300 ease-out ${
          openProduct ? 'w-full md:w-[420px]' : 'w-0 overflow-hidden'
        }`}
      >
        {openProduct && (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Select options
              </h2>
              <button
                type="button"
                onClick={() => setOpenProduct(null)}
                className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="flex gap-4">
                <img
                  src={openProduct.image}
                  alt=""
                  className="h-32 w-28 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900">{openProduct.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {openProduct.price}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Shipping calculated at checkout.
                  </p>
                </div>
              </div>
              {openProduct.colors && openProduct.colors.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Color: {openProduct.colors[0]}
                  </p>
                </div>
              )}
              {openProduct.sizes && openProduct.sizes.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Size
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {openProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[2.5rem] rounded border px-3 py-2 text-sm font-medium transition ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Quantity
                </span>
                <div className="flex items-center rounded border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full rounded bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="w-full rounded border border-gray-900 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Buy it now
                </button>
              </div>
              <button
                type="button"
                className="mt-3 text-sm text-gray-600 underline hover:no-underline"
              >
                View product details
              </button>
            </div>
          </>
        )}
      </div>
    </section>
    </div>
  )
}
