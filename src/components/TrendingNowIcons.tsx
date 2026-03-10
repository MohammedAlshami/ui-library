'use client'

interface TrendItem {
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
          <h2 className="text-center text-5xl font-semibold tracking-tight text-[#121212]">
            Trending Now
          </h2>
          <span className="mt-4 h-4 w-40 rounded-md bg-[#e8eaee]" />
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
          {TREND_ITEMS.map((item) => (
            <article key={item.id} className="flex flex-col items-center">
              <div
                className={`flex h-[150px] w-[150px] items-center justify-center rounded-full text-5xl text-[#222] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] ${item.bgClass}`}
                aria-hidden="true"
              >
                <span className="select-none">{item.icon}</span>
              </div>
              <p className="mt-4 text-center text-[20px] leading-tight text-[#171717]">
                {item.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
