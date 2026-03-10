export function BoohooHeader() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-white px-4 py-3">
      <header className="flex w-full max-w-[1920px] items-center justify-between rounded-[28px] bg-[#ececec] px-6 py-4 text-[#121212] md:px-8 lg:px-10">
        <h1 className="text-3xl leading-none font-black tracking-[-0.04em] lowercase md:text-5xl">
          boohoo
        </h1>

        <div className="mx-4 flex h-16 max-w-[1220px] flex-1 items-center rounded-full bg-[#e2e2e2] px-6 md:mx-10 md:px-8">
          <input
            type="text"
            placeholder="Search Products and Brands"
            aria-label="Search products and brands"
            className="w-full bg-transparent text-lg text-[#787878] outline-none placeholder:text-[#8f8f8f] md:text-[44px] md:leading-none"
          />

          <div className="ml-4 flex items-center gap-5 text-[#1f1f1f] md:gap-7">
            <button type="button" aria-label="Image search" className="transition hover:opacity-70">
              <CameraIcon />
            </button>
            <button type="button" aria-label="Search" className="transition hover:opacity-70">
              <SearchIcon />
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-5 text-[#171717] md:gap-7" aria-label="Account actions">
          <button type="button" aria-label="Profile" className="transition hover:opacity-70">
            <UserIcon />
          </button>
          <button type="button" aria-label="Wishlist" className="transition hover:opacity-70">
            <HeartIcon />
          </button>
          <button type="button" aria-label="Bag" className="transition hover:opacity-70">
            <BagIcon />
          </button>
        </nav>
      </header>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 md:size-12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h2l1.2-1.8A1.6 1.6 0 0 1 11 2.5h2a1.6 1.6 0 0 1 1.3.7L15.5 5h2A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 md:size-12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 md:size-12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="7" r="3.6" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 md:size-12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20.3 4.5 12.9a4.6 4.6 0 0 1 0-6.5 4.5 4.5 0 0 1 6.5 0L12 7.4l1-1a4.5 4.5 0 1 1 6.5 6.2z" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 md:size-12" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 8.5h14l-1.1 10A2 2 0 0 1 15.9 20H8.1a2 2 0 0 1-2-1.5z" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
    </svg>
  )
}
