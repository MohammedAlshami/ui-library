import { useState } from 'react'

export function SimpleButton() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      <button
        type="button"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setCount((value) => value + 1)}
      >
        Click me{count > 0 ? ` (${count})` : ''}
      </button>
    </div>
  )
}
