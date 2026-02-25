import { createFileRoute, Link } from '@tanstack/react-router'
import { COMPONENTS } from '~/data/components'

export const Route = createFileRoute('/components/')({
  component: ComponentsPage,
})

function ComponentsPage() {
  return (
    <div className="flex w-full flex-col items-center px-5 py-12 md:py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
          Components
        </h1>
        <p className="text-gray-500 md:text-base">
          Explore all 103+ components.
        </p>
        <Link to="/" className="text-sm font-medium text-blue-600 underline hover:opacity-80">
          Back to home
        </Link>
      </div>

      <div className="relative mt-8 grid w-full max-w-[1130px] grid-cols-1 gap-4 sm:grid-cols-2">
        {COMPONENTS.map((c) => (
          <div
            key={c.uuid}
            className="group relative flex flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-gray-50/80 p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:bg-gray-100/90"
          >
            {c.premium != null && (
              <div className="absolute right-5 top-5 z-10 flex size-8 items-center justify-end">
                <span
                  className={`flex size-6 items-center justify-center rounded-full ${c.premium ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                  title={c.premium ? 'Premium' : 'Free'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {c.premium ? (
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    ) : (
                      <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
                    )}
                  </svg>
                </span>
              </div>
            )}
            <Link
              to="/components/$componentId"
              params={{ componentId: c.uuid }}
              className="relative block w-full flex-1 overflow-hidden"
              aria-label={c.name}
            >
              <img
                className="h-full w-full rounded-2xl border border-gray-200 object-cover"
                src={c.image}
                alt=""
                loading="lazy"
              />
            </Link>
            <p className="pl-2 pt-2 font-medium">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
