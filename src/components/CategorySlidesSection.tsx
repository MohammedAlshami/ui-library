'use client'

import { useMemo, useRef, useState } from 'react'

type Audience = 'boys' | 'girls'

interface CategoryItem {
  id: string
  name: string
  count: number
  image: string
}

const BOYS_CATEGORIES: CategoryItem[] = [
  {
    id: 'sweaters',
    name: 'Sweaters',
    count: 25,
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sets',
    name: 'Sets',
    count: 30,
    image:
      'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    count: 21,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'shirts',
    name: 'Shirts',
    count: 35,
    image:
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    count: 15,
    image:
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 24,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pants',
    name: 'Pants',
    count: 28,
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'coats-jackets',
    name: 'Coats & Jackets',
    count: 20,
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80',
  },
]

const GIRLS_CATEGORIES: CategoryItem[] = [
  {
    id: 'sweaters',
    name: 'Sweaters',
    count: 20,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'dresses',
    name: 'Dresses',
    count: 16,
    image:
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 24,
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    count: 18,
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bags',
    name: 'Bags',
    count: 21,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'skirts',
    name: 'Skirts',
    count: 22,
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    count: 23,
    image:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
  },
]

export function CategorySlidesSection() {
  const [audience, setAudience] = useState<Audience>('boys')
  const [progress, setProgress] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(
    () => (audience === 'boys' ? BOYS_CATEGORIES : GIRLS_CATEGORIES),
    [audience],
  )

  const updateProgress = () => {
    const node = listRef.current
    if (!node) return

    const maxScrollable = node.scrollWidth - node.clientWidth
    if (maxScrollable <= 0) {
      setProgress(0)
      return
    }

    setProgress(node.scrollLeft / maxScrollable)
  }

  const scrollByCards = (direction: 'left' | 'right') => {
    const node = listRef.current
    if (!node) return

    const amount = 296
    node.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const switchAudience = (value: Audience) => {
    setAudience(value)
    setProgress(0)
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
    })
  }

  return (
    <section className="h-full w-full bg-[#efefef] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1720px] px-4 md:px-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight text-black md:text-5xl">
            Explore Categories
          </h2>

          <div className="flex items-center gap-1 rounded-full">
            <button
              type="button"
              onClick={() => switchAudience('boys')}
              className={`rounded-full px-4 py-2 text-lg font-medium transition ${
                audience === 'boys'
                  ? 'bg-[#dddddd] text-black'
                  : 'text-black hover:bg-[#e5e5e5]'
              }`}
            >
              Boy&apos;s
            </button>
            <button
              type="button"
              onClick={() => switchAudience('girls')}
              className={`rounded-full px-4 py-2 text-lg font-medium transition ${
                audience === 'girls'
                  ? 'bg-[#dddddd] text-black'
                  : 'text-black hover:bg-[#e5e5e5]'
              }`}
            >
              Girl&apos;s
            </button>
          </div>
        </div>

        <div
          ref={listRef}
          onScroll={updateProgress}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3"
        >
          {categories.map((category) => (
            <article key={category.id} className="w-[280px] shrink-0 snap-start">
              <div className="overflow-hidden rounded-3xl bg-[#d7d9dd]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-[390px] w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-baseline gap-2 px-0.5">
                <p className="text-[33px] font-semibold leading-none text-[#171717]">
                  {category.name}
                </p>
                <span className="text-[30px] leading-none text-[#2c2c2c]">
                  {category.count}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-[2px] w-[250px] bg-[#cfcfcf]">
            <div
              className="h-[2px] bg-black transition-all duration-300"
              style={{ width: `${Math.max(20, progress * 100)}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards('left')}
              className="flex size-11 items-center justify-center rounded-full border border-[#c5c5c5] text-black transition hover:bg-white"
              aria-label="Previous categories"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards('right')}
              className="flex size-11 items-center justify-center rounded-full border border-[#c5c5c5] text-black transition hover:bg-white"
              aria-label="Next categories"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
