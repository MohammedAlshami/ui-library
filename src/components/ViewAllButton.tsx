export function ViewAllButton() {
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
