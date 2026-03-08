export function DressesToolbar() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-white p-6">
      <section className="flex w-full max-w-[1880px] items-center justify-between rounded-[36px] border border-[#e7e7e7] bg-[#f3f3f5] px-8 py-3 text-[#242427] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div className="flex items-center gap-8">
          <h1 className="text-[52px] leading-none font-normal tracking-[-0.02em]">Dresses</h1>
          <nav className="flex items-center gap-4 text-[40px] leading-none text-[#6f6f73]">
            <span>Home</span>
            <span>/</span>
            <span className="font-medium text-[#222226]">Dresses</span>
          </nav>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 text-[42px] text-[#6a6b70]">
            <span className="font-semibold text-[#27272c]">Show:</span>
            <button type="button" className="transition hover:text-[#26262a]">
              9
            </button>
            <span>/</span>
            <button type="button" className="font-semibold text-[#26262a]">
              12
            </button>
            <span>/</span>
            <button type="button" className="transition hover:text-[#26262a]">
              18
            </button>
            <span>/</span>
            <button type="button" className="transition hover:text-[#26262a]">
              24
            </button>
          </div>

          <div className="flex items-center gap-6 text-[#afafb4]">
            <ViewIcon columns={2} active />
            <ViewIcon columns={3} />
            <ViewIcon columns={4} />
          </div>

          <button
            type="button"
            className="flex min-w-[520px] items-center justify-between rounded-full border border-[#d9d9dc] bg-[#efeff0] px-11 py-5 text-[40px] text-[#6f6f73]"
          >
            <span>Default sorting</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
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
      className={`transition ${active ? 'text-[#23242a]' : 'text-[#b3b3b8] hover:text-[#8f9096]'}`}
      aria-label={`Switch to ${columns} column view`}
    >
      <div
        className="grid gap-[5px]"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <span
            key={index}
            className="h-[11px] w-[11px] rounded-[3px] bg-current"
          />
        ))}
      </div>
    </button>
  )
}
