const WESTERN_CATEGORIES = [
  {
    id: 'dresses',
    label: 'DRESSES',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tops',
    label: 'TOPS',
    image:
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'shorts-skirts',
    label: 'SHORTS\n& SKIRTS',
    image:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sets',
    label: 'SETS',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
  },
] as const

export function WesternCategories() {
  return (
    <section className="w-full bg-[#ebebeb] px-4 py-3 md:px-8 md:py-6">
      <div className="mx-auto grid w-full max-w-[1700px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {WESTERN_CATEGORIES.map((category) => (
          <article
            key={category.id}
            className="group relative aspect-[4/7] overflow-hidden rounded-sm bg-neutral-200"
          >
            <img
              src={category.image}
              alt={category.label.replace('\n', ' ')}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            <h3 className="absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 whitespace-pre-line text-center text-3xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)] md:bottom-7 md:text-6xl">
              {category.label}
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}
