'use client'

import { useState, useRef, useEffect } from 'react'

const dropdownShadow = '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)'
const TEXTAREA_MAX_HEIGHT = 200 // px; after this, textarea scrolls
const SINGLE_LINE_HEIGHT = 48 // px; 2+ lines = stacked layout (one line ~24–28px)

const SAMPLE_TRANSCRIPT =
  "This far, I should say that there's a whole lot more I'm going to be posting, but I do want to mention that right now, Chalk is giving away three bags of the organic heirloom cacao from Bolivia. This is the chocolate powder, super detoxing, freaking delicious. And if you combine that with the alkaline purified shilajit or the..."

export function AISearch() {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [voiceLoading, setVoiceLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [textareaHeight, setTextareaHeight] = useState(24)
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    const h = Math.min(ta.scrollHeight, TEXTAREA_MAX_HEIGHT)
    ta.style.height = `${h}px`
    ta.style.overflowY = ta.scrollHeight > TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden'
    setTextareaHeight(h)
  }

  const hasText = inputValue.trim().length > 0
  const isMultiline = hasText && textareaHeight > SINGLE_LINE_HEIGHT

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputValue])

  const cancelVoice = () => {
    setVoiceMode(false)
    setVoiceLoading(false)
  }

  const submitVoice = () => {
    setVoiceLoading(true)
    setTimeout(() => {
      setVoiceLoading(false)
      setVoiceMode(false)
      setInputValue(SAMPLE_TRANSCRIPT)
    }, 1800)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMainMenuOpen(false)
        setSubMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-white p-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <h1 className="mb-10 text-3xl font-normal tracking-tight text-gray-800 md:text-4xl">
        Ready when you are.
      </h1>

      <div className="relative w-full max-w-2xl" ref={containerRef}>
        {/* Tooltip */}
        <div
          className="pointer-events-none absolute -bottom-10 left-0 z-50 flex items-center space-x-2 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-sm text-white"
          style={{
            opacity: tooltipVisible ? 1 : 0,
            transform: tooltipVisible ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
            boxShadow: dropdownShadow,
          }}
        >
          <span>Add files and more</span>
          <span className="rounded border border-gray-600 bg-gray-700 px-1 text-[10px] text-gray-400">
            /
          </span>
        </div>

        {/* Search bar – single textarea, layout switches without remounting */}
        <div
          className={`border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus-within:ring-1 focus-within:ring-gray-300 ${isMultiline ? 'flex flex-col rounded-3xl' : 'flex items-end rounded-full'}`}
        >
          {!voiceMode ? (
            <>
              {!isMultiline && (
                <button
                  type="button"
                  className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setTooltipVisible(false)
                    setMainMenuOpen((o) => !o)
                    setSubMenuOpen(false)
                  }}
                  aria-label="Add files and more"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </button>
              )}
              <textarea
                ref={textareaRef}
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onInput={adjustTextareaHeight}
                rows={1}
                className={`min-h-[24px] max-h-[200px] resize-none border-none bg-transparent text-lg text-gray-700 outline-none placeholder:text-gray-400 focus:ring-0 ${isMultiline ? 'w-full px-0 py-2' : 'flex-1 px-2 py-1.5'}`}
              />
              <div className={`flex shrink-0 items-center gap-1 ${isMultiline ? 'justify-between pt-1' : 'pb-1'}`}>
                {isMultiline && (
                  <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setTooltipVisible(false)
                      setMainMenuOpen((o) => !o)
                      setSubMenuOpen(false)
                    }}
                    aria-label="Add files and more"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                )}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="group rounded-full p-2 transition-colors hover:bg-gray-100"
                    aria-label="Voice input"
                    onClick={(e) => {
                      e.stopPropagation()
                      setVoiceMode(true)
                      setMainMenuOpen(false)
                      setSubMenuOpen(false)
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 group-hover:text-gray-700">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <path d="M12 19v4" />
                      <path d="M8 23h8" />
                    </svg>
                  </button>
                  {hasText && (
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform active:scale-95 hover:bg-gray-800"
                      aria-label="Send"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5" />
                        <path d="m5 12 7-7 7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full items-center gap-2 py-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              {/* Full-width waveform */}
              <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 px-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="aisearch-wave-bar w-1 rounded-full bg-black"
                    style={{ animationDelay: `${(i % 5) * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
                  onClick={cancelVoice}
                  aria-label="Cancel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-500"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                {voiceLoading ? (
                  <span className="flex h-8 w-8 items-center justify-center" aria-label="Loading">
                    <svg
                      className="h-5 w-5 aisearch-spin text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
                    onClick={submitVoice}
                    aria-label="Submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-800"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main dropdown */}
        {mainMenuOpen && (
          <div
            className="absolute left-0 z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white py-2"
            style={{ boxShadow: dropdownShadow }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <PaperclipIcon className="mr-3 h-4 w-4 text-gray-500" />
              Add photos & files
            </button>
            <div className="my-1 h-px bg-gray-100 mx-2" />
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ImageIcon className="mr-3 h-4 w-4 text-gray-500" />
              Create image
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <LightbulbIcon className="mr-3 h-4 w-4 text-gray-500" />
              Thinking
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <MicroscopeIcon className="mr-3 h-4 w-4 text-gray-500" />
              Deep research
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ShoppingBagIcon className="mr-3 h-4 w-4 text-gray-500" />
              Shopping research
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation()
                setSubMenuOpen((o) => !o)
              }}
            >
              <span className="flex items-center">
                <MoreHorizontalIcon className="mr-3 h-4 w-4 text-gray-500" />
                More
              </span>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        )}

        {/* Sub dropdown */}
        {subMenuOpen && mainMenuOpen && (
          <div
            className="absolute left-64 z-50 ml-2 mt-[-48px] w-56 rounded-2xl border border-gray-100 bg-white py-2"
            style={{ boxShadow: dropdownShadow }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <GlobeIcon className="mr-3 h-4 w-4 text-gray-500" />
              Web search
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <BookOpenIcon className="mr-3 h-4 w-4 text-gray-500" />
              Study and learn
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <PenToolIcon className="mr-3 h-4 w-4 text-gray-500" />
              Canvas
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <LayoutTemplateIcon className="mr-3 h-4 w-4 text-gray-500" />
              Quizzes
            </button>
            <button
              type="button"
              className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <LayoutGridIcon className="mr-3 h-4 w-4 text-gray-500" />
              Explore apps
            </button>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
        @keyframes aisearch-wave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .aisearch-wave-bar {
          animation: aisearch-wave 1.2s ease-in-out infinite;
          height: 4px;
        }
        .aisearch-spin {
          animation: aisearch-spin 0.8s linear infinite;
        }
        @keyframes aisearch-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}
function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
function MicroscopeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}
function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}
function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
function PenToolIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}
function LayoutTemplateIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="9" height="7" x="3" y="14" rx="1" />
      <rect width="9" height="7" x="14" y="14" rx="1" />
    </svg>
  )
}
function LayoutGridIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}
