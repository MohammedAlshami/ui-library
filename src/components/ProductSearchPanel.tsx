const PRODUCTS = [
  {
    id: 'babyrib-mini-shorts',
    name: 'Babyrib Mini Shorts',
    price: '$26.25',
    image:
      'https://img.ltwebstatic.com/images3_pi/2024/05/30/0c/17170476976f62510f4d3fd1f13a83c247544fc8cc_thumbnail_720x.webp',
  },
  {
    id: 'backless-halter-romper',
    name: 'Backless Halter Neck Active Romper',
    price: '$27.28',
    image:
      'https://img.ltwebstatic.com/images3_pi/2024/09/11/43/1726043816cdf7fd8a877fdf5aaf64348756074c8d_thumbnail_720x.webp',
  },
  {
    id: 'backless-square-dress',
    name: 'Backless Square Neck Long Sleeve Dress',
    price: '$25.02',
    image:
      'https://img.ltwebstatic.com/images3_pi/2024/08/13/2b/17235229182b9b64fafe19155f4d58d8f70b5e9ef2_thumbnail_720x.webp',
  },
  {
    id: 'casual-striped-set',
    name: 'Casual Striped Sweatshirt and Pants...',
    price: '$61.40',
    image:
      'https://img.ltwebstatic.com/images3_pi/2024/10/15/67/172897223150e0f7147defc2fd12fa43813f861dbc_thumbnail_720x.webp',
  },
] as const

export function ProductSearchPanel() {
  return (
    <section className="mx-auto min-h-screen w-full max-w-[1024px] bg-[#f2f2f2] text-[#1a1a1a]">
      <div className="flex h-[72px] items-center gap-3 border-b border-black/15 px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className="text-black/65"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          defaultValue="Search"
          aria-label="Search products"
          className="flex-1 bg-transparent text-[40px] leading-none font-light tracking-tight outline-none placeholder:text-black/55"
        />
        <button
          type="button"
          aria-label="Close search"
          className="rounded p-2 text-black/85 transition hover:bg-black/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-[16px] leading-[1.25] font-normal tracking-tight">
                {product.name}
              </h3>
              <p className="text-[17px] leading-[1.2] font-normal">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
