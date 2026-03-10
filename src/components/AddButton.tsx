import { useState } from 'react'

export function AddButton() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      {quantity === 0 ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          onClick={() => setQuantity(1)}
        >
          <span aria-hidden="true">+</span>
          Add
        </button>
      ) : (
        <div className="inline-flex items-center overflow-hidden rounded-full border border-emerald-200 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 py-2 text-lg font-medium text-emerald-700 transition hover:bg-emerald-50"
            onClick={() => setQuantity((value) => Math.max(0, value - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 px-2 text-center text-sm font-semibold text-slate-800">{quantity}</span>
          <button
            type="button"
            className="px-4 py-2 text-lg font-medium text-emerald-700 transition hover:bg-emerald-50"
            onClick={() => setQuantity((value) => value + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
