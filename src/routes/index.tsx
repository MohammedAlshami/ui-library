import { createFileRoute, Link } from '@tanstack/react-router'
import { COMPONENTS, IMAGE_BASE } from '~/data/components'

export const Route = createFileRoute('/')({
  component: Home,
})

const HERO_LINE1 = 'UN-COMMON COMPONENTS'
const HERO_LINE2 = 'FOR SHADCN/UI'

function Home() {
  return (
    <div className="flex w-screen flex-col items-center overflow-hidden">
      {/* Top fade */}
      <div
        className="pointer-events-none fixed top-0 z-20 h-40 w-full"
        style={{
          background: 'linear-gradient(to bottom, var(--color-background, white) 0%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Hero */}
      <section className="relative z-10 mt-12 overflow-hidden px-5 text-foreground">
        <div className="relative z-10 flex flex-col items-center">
          <p className="my-4 text-sm tracking-widest text-gray-500">
            SKIPER UI'S
          </p>
          <div className="font-custom flex flex-wrap justify-center gap-0.5 text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {HERO_LINE1.split('').map((char, i) => (
              <span
                key={`1-${i}`}
                className="inline-block"
                style={{ height: '1.2em' }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="font-custom flex flex-wrap justify-center gap-0.5 text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {HERO_LINE2.split('').map((char, i) => (
              <span
                key={`2-${i}`}
                className="inline-block"
                style={{ height: '1.2em' }}
              >
                {char}
              </span>
            ))}
          </div>
          <p className="my-4 text-sm tracking-widest text-gray-500">
            FOR SHADCN/UI
          </p>
          <div className="mt-16 flex flex-col items-center gap-2 md:flex-row lg:mt-20">
            <div className="flex cursor-pointer items-center gap-2 rounded-2xl bg-gray-100 px-5 py-3 font-mono text-sm transition active:scale-[0.99]">
              npx shadcn add @skiper-ui/skiper40
            </div>
            <Link
              to="/quick-start"
              className="flex h-12 w-fit cursor-pointer items-center justify-center rounded-2xl bg-blue-600 px-5 text-[15px] font-medium text-white transition hover:bg-blue-700"
            >
              Quick Start
            </Link>
          </div>
        </div>
      </section>

      {/* Outstanding components */}
      <section className="flex w-full flex-col items-center overflow-hidden px-5 py-24 md:py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
            103+ AND COUNTING
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="max-w-lg px-5 text-2xl font-semibold leading-tight tracking-tighter md:text-4xl">
              <span className="mr-1">Outstanding</span>
              <span className="mr-1">components</span>
            </h2>
            <p className="text-sm tracking-tight text-gray-600 md:text-base">
              No extra packages — just one file for each component.
              <br />
              Use directly with your fav ShadCN CLI.
            </p>
          </div>
        </div>
        <div className="relative mt-8 grid w-full max-w-[1130px] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {COMPONENTS.map((c) => (
            <div
              key={c.uuid}
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-gray-50/80 p-3 shadow-glass transition hover:bg-gray-100/90"
            >
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
        <Link
          to="/components"
          className="group mt-5 flex cursor-pointer items-center gap-1 text-sm font-semibold transition hover:opacity-70"
        >
          Explore all components
          <span className="transition group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>

      {/* Get in contact / Newsletter - design from reference */}
      <section className="flex w-full flex-col items-center overflow-hidden border-t border-gray-100 bg-gray-50/50 px-5 py-16 md:py-24">
        <div className="flex w-full max-w-[900px] flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-custom text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
              Get in contact
            </h2>
            <p className="max-w-[22rem] text-sm text-gray-600 md:text-base">
              Latest news, musings, announcements and updates direct to your inbox.
            </p>
          </div>
          <form
            method="post"
            action="#"
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              required
              aria-label="Email"
              className="h-14 flex-1 rounded-xl border border-gray-200 bg-white px-5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 md:min-w-[280px]"
            />
            <button
              type="submit"
              className="flex h-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 px-8 text-[15px] font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Explore now
            </button>
          </form>
        </div>
      </section>

      {/* Join us / CTA */}
      <section className="flex flex-col items-center overflow-hidden px-5 pb-12 pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
            JOIN US
          </div>
          <h2 className="max-w-lg px-5 text-center text-2xl font-semibold leading-tight tracking-tighter md:text-4xl">
            Get your Skiper UI's Pro badge now
          </h2>
        </div>
        <div className="relative -mt-6 flex h-[280px] w-full scale-90 flex-col items-center justify-center gap-4 sm:mt-6 sm:scale-100">
          <Link to="/pricing" className="relative z-10 flex cursor-pointer items-center justify-center">
            <img
              src={`${IMAGE_BASE}/logos/logo.svg`}
              alt="Skiper UI"
              className="mb-1 size-14 opacity-80"
            />
          </Link>
          <div
            className="absolute top-16 h-[400px] w-full max-w-[1200px] overflow-hidden opacity-50"
            style={{ transform: 'translateX(12px) scale(0.85) rotate(8deg)' }}
          >
            <img
              width="703"
              height="364"
              src={`${IMAGE_BASE}/images/footer/RightHand.png`}
              alt=""
              className="pointer-events-none absolute right-0 w-1/2 invert"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
          </div>
          <div
            className="absolute top-16 h-[400px] w-full max-w-[1200px] overflow-hidden opacity-50"
            style={{ transform: 'translateX(-12px) scale(0.85) rotate(-8deg)' }}
          >
            <img
              width="703"
              height="364"
              src={`${IMAGE_BASE}/images/footer/LeftHand.png`}
              alt=""
              className="pointer-events-none absolute left-0 w-1/2 invert"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
          </div>
        </div>
        <p className="mb-4 flex flex-col items-center gap-1 text-center text-sm text-gray-500 sm:mt-20">
          Design and Developed by{' '}
          <a
            href="https://x.com/Gur__vi"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-gray-400 underline-offset-2 transition hover:decoration-gray-600"
          >
            ©Gxuri
          </a>
        </p>
      </section>
    </div>
  )
}
