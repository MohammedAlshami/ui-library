import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function PricingPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <p className="text-gray-500">One-time payment, no subscription.</p>
      <Link to="/" className="text-blue-600 underline">
        Back to home
      </Link>
    </div>
  )
}
