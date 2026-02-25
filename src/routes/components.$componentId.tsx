import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { getComponentById } from '~/data/components'

export const Route = createFileRoute('/components/$componentId')({
  component: ComponentDetailPage,
  validateSearch: (search: Record<string, unknown>) => ({
    fullscreen: search?.fullscreen === true || search?.fullscreen === '1',
  }),
})

function ComponentDetailPage() {
  const { componentId } = Route.useParams()
  const { fullscreen } = Route.useSearch({ strict: false }) ?? {}
  const navigate = useNavigate()
  const record = getComponentById(componentId)
  const [codePanelOpen, setCodePanelOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (!record) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
        <h1 className="text-xl font-semibold">Component not found</h1>
        <Link to="/components" className="text-blue-600 underline">
          Back to components
        </Link>
      </div>
    )
  }

  const fileName = `${record.id}.tsx`
  const PreviewComponent = record.component

  const copyCode = () => {
    void navigator.clipboard.writeText(record.code)
  }

  const toggleFullScreen = () => {
    if (fullscreen) {
      navigate({ to: '/components/$componentId', params: { componentId }, search: {} })
    } else {
      navigate({ to: '/components/$componentId', params: { componentId }, search: { fullscreen: true } })
    }
  }

  return (
    <div className="relative flex w-full flex-row items-start">
      {/* Left code panel - when closed, absolute so it doesn't affect page height */}
      <div
        className={`flex shrink-0 overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-300 ease-out ${!codePanelOpen ? 'absolute left-0 top-0' : ''}`}
        style={{ width: codePanelOpen ? '50%' : '0', minWidth: codePanelOpen ? 320 : 0 }}
      >
        <div className="flex h-full w-full min-w-[320px] flex-col bg-gray-100 p-2">
          {/* Drag handle */}
          <div className="h-1.5 w-12 shrink-0 cursor-grab self-center rounded-2xl bg-gray-300/80 pt-2 active:cursor-grabbing" />
          {/* Header */}
          <div className="text-muted-foreground flex shrink-0 items-center justify-between p-4 pb-0 pt-3 text-sm tracking-tight text-gray-600">
            <button
              type="button"
              onClick={() => setCodePanelOpen(false)}
              className="flex cursor-pointer items-center gap-2 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <p>Source Code</p>
            </button>
            <span className="flex items-center gap-5">
              <span className="flex cursor-pointer items-center gap-2 transition hover:text-gray-900">
                <button
                  type="button"
                  className="group flex items-center gap-2"
                  title="Download source file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-4 group-active:scale-90"
                  >
                    <path d="M12 15V3" />
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                  <p>{fileName}</p>
                </button>
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="mr-1.5 flex size-8 cursor-pointer items-center justify-center hover:text-gray-900"
                title="Copy source code"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-3.5"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </span>
          </div>
          {/* Code content - scrollable */}
          <div className="min-h-0 flex-1 select-text overflow-y-auto p-4 pt-6">
            <pre className="text-sm text-gray-800">
              <code>{record.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Main content - gets pushed right when panel opens */}
      <div className="flex min-w-0 flex-1 flex-col min-h-0">
        {/* Back to list - hidden in fullscreen */}
        {!fullscreen && (
          <div className="fixed left-4 top-4 z-20 lg:hidden">
            <Link
              to="/components"
              className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm"
              aria-label="Back to components"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
          </div>
        )}

        {/* Floating toolbar: Full screen + Code */}
        <section className="fixed right-6 top-4 z-[99] flex flex-col gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={toggleFullScreen}
            className={`flex size-8 items-center justify-center rounded-xl transition hover:bg-gray-200 ${fullscreen ? 'bg-gray-200' : 'bg-gray-100'}`}
            title={fullscreen ? 'Exit full screen' : 'Full screen preview'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="flex size-8 items-center justify-center rounded-xl bg-gray-100 transition hover:bg-gray-200"
            title="Restart component"
          >
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
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M8 16H3v5" />
              <path d="M21 21v-5h-5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setCodePanelOpen(!codePanelOpen)}
            className={`flex size-8 items-center justify-center rounded-xl transition hover:bg-gray-200 ${
              codePanelOpen ? 'bg-gray-200' : 'bg-gray-100'
            }`}
            title="Source code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </button>
        </section>

        {/* Preview - the component itself (key forces remount on restart) */}
        <div>
          <PreviewComponent key={refreshKey} />
        </div>
      </div>
    </div>
  )
}
