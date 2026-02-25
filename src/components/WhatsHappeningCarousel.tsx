import { useRef, useState } from 'react'

interface NewsCard {
  id: string
  title: string
  description: string
  cta: string
  image: string
  logoText?: string
}

const NEWS_CARDS: NewsCard[] = [
  {
    id: 'annual-letter',
    title: 'Businesses on Stripe generated US$1.9tn in 2025.',
    description:
      'Our annual letter explores the trends defining the internet economy—including steeper growth for newer businesses, faster international expansion, stablecoin progress, agentic commerce, and more.',
    cta: 'Read the letter',
    image:
      'https://images.unsplash.com/photo-1641468175759-57f8edec5f76?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'best-day-ever',
    title: '150K+ users have their best day ever on Stripe.',
    description:
      'From Black Friday through Cyber Monday 2025, Stripe processed more than US$40bn for businesses while maintaining a 99.9999% uptime.',
    cta: 'See the numbers',
    image:
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'tidemark-report',
    title: "Tidemark's vertical and SMB SaaS benchmark report.",
    description:
      'Learn what\'s driving growth in vertical SaaS in 2025 – going multiproduct, embedding fintech and integrating AI into the core of their products.',
    cta: 'Get the data',
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80',
    logoText: 'tidemark',
  },
  {
    id: 'crypto-partnership',
    title: 'Crypto.com partners with Stripe to enable better crypto payments.',
    description:
      'Learn how the partnership can help you tap into a new global customer base by letting customers pay in stablecoins.',
    cta: 'Read more',
    image:
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=1400&q=80',
    logoText: 'crypto.com',
  },
]

export function WhatsHappeningCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const mobileTrackRef = useRef<HTMLDivElement>(null)

  const activeCard = NEWS_CARDS[activeIndex]!

  const changeSlide = (direction: 'prev' | 'next') => {
    setActiveIndex((index) => {
      if (direction === 'prev') {
        return (index - 1 + NEWS_CARDS.length) % NEWS_CARDS.length
      }
      return (index + 1) % NEWS_CARDS.length
    })
  }

  const onMobileScroll = () => {
    const track = mobileTrackRef.current
    if (!track) return

    const firstCard = track.children[0] as HTMLElement | undefined
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth + 16
    const nextIndex = Math.round(track.scrollLeft / cardWidth)
    if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < NEWS_CARDS.length) {
      setActiveIndex(nextIndex)
    }
  }

  const sideCards = NEWS_CARDS.filter((_, index) => index !== activeIndex)

  return (
    <section className="min-h-full w-full bg-[#eef1f6] py-10 md:py-16">
      <div className="mx-auto w-full max-w-[1760px] px-4 md:px-10">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[#0e2340] md:text-[64px] md:leading-[0.95]">
              What&apos;s happening
            </h2>
            <p className="mt-1 text-2xl leading-none text-[#6a7f9f] md:mt-2 md:text-[64px] md:leading-[0.95]">
              See the latest from Stripe.
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => changeSlide('prev')}
              className="flex size-20 items-center justify-center rounded-xl bg-[#dde2ff] text-[#5d4bff] transition hover:brightness-95"
              aria-label="Previous story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => changeSlide('next')}
              className="flex size-20 items-center justify-center rounded-xl bg-[#dde2ff] text-[#5d4bff] transition hover:brightness-95"
              aria-label="Next story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden gap-4 md:flex">
          <article className="relative h-[620px] flex-1 overflow-hidden rounded-2xl">
            <img src={activeCard.image} alt="" className="h-full w-full object-cover" />
            {activeCard.logoText && (
              <p className="absolute bottom-10 left-10 text-5xl font-semibold lowercase tracking-tight text-white drop-shadow-lg">
                {activeCard.logoText}
              </p>
            )}
          </article>

          <div className="flex gap-3 overflow-hidden">
            {sideCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveIndex(NEWS_CARDS.findIndex((item) => item.id === card.id))}
                className="h-[620px] w-[52px] overflow-hidden rounded-2xl transition hover:w-[62px]"
                aria-label={`Open ${card.cta}`}
              >
                <img src={card.image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div
            ref={mobileTrackRef}
            onScroll={onMobileScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
          >
            {NEWS_CARDS.map((card) => (
              <article key={card.id} className="w-[calc(100vw-2.5rem)] shrink-0 snap-center overflow-hidden rounded-2xl">
                <img src={card.image} alt="" className="h-[500px] w-full object-cover" />
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-[1180px]">
          <p className="text-[22px] font-medium leading-[1.2] tracking-tight text-[#0e2340] md:text-[58px] md:leading-[1.05]">
            {activeCard.title}{' '}
            <span className="font-normal text-[#6a7f9f]">{activeCard.description}</span>
          </p>

          <button
            type="button"
            className="mt-8 rounded-xl border border-[#b8bcff] px-6 py-3 text-[22px] font-semibold tracking-tight text-[#5748ff] transition hover:bg-[#eceeff] md:px-8 md:py-4 md:text-[40px]"
          >
            {activeCard.cta}
            <span className="ml-3">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
