/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

const IMAGE_BASE = 'https://cdn.skiper-ui.com'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Un-common Components for shadcn/ui | Skiper UI',
        description:
          'Brand new uncommon components for your Next.js project. Use with ease through shadcn CLI 3.0, featuring fast-growing components and collections that are easy to edit and use.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const search = useRouterState({ select: (s) => s.location.search })
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const fullscreen = Boolean(
    search &&
      typeof search === 'object' &&
      (search as { fullscreen?: unknown }).fullscreen,
  )
  const isComponentDetailPage = /^\/components\/[^/]+$/.test(pathname)
  const showHeader = !fullscreen && !isComponentDetailPage

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {showHeader && (
          <header className="fixed left-1/2 top-0 z-[90] flex w-screen -translate-x-1/2 justify-center overflow-hidden md:max-w-3xl">
            <nav className="mx-3 mt-2 flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white/80 px-5 py-2.5 shadow-glass backdrop-blur-md">
              <Link
                to="/"
                className="flex items-center gap-2 py-1 text-sm font-semibold"
              >
                <img
                  src={`${IMAGE_BASE}/logos/logo.svg`}
                  alt="Logo"
                  className="size-6"
                />
                <span>SKIPER-UI</span>
              </Link>
              <div className="flex items-center gap-4 text-[13px]">
                <Link to="/components" className="hidden items-center gap-1 rounded-md opacity-70 hover:opacity-100 md:flex">
                  Components
                </Link>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-xl bg-gray-100 transition active:scale-95"
                    aria-label="Command + K"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-xl bg-gray-100"
                    aria-label="Show menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
          </header>
        )}
        <main
          className={
            isComponentDetailPage
              ? 'h-screen overflow-hidden'
              : showHeader
                ? 'pt-[72px]'
                : ''
          }
        >
          {children}
        </main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
