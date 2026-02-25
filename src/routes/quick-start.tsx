import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/quick-start')({
  component: QuickStartPage,
})

function QuickStartPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
      <h1 className="text-2xl font-semibold">Quick Start</h1>
      <p className="text-center text-gray-500">
        Run: <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">npx shadcn add @skiper-ui/skiper40</code>
      </p>
      <Link to="/" className="text-blue-600 underline">
        Back to home
      </Link>
    </div>
  )
}
