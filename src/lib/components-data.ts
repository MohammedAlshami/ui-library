export const IMAGE_BASE = 'https://cdn.skiper-ui.com'
export const SITE_BASE = 'https://skiper-ui.com'

export const COMPONENTS = [
  { name: 'Image reveal', id: 'skiper71', premium: true },
  { name: 'Hover members', id: 'skiper6', premium: true },
  { name: 'Things drag and scroll', id: 'skiper5', premium: true },
  { name: 'Devouring details sign in', id: 'skiper56', premium: true },
  { name: 'Dynamic island', id: 'skiper2', premium: false },
  { name: 'Vercel Tooltip', id: 'skiper43', premium: true },
  { name: 'Aave token swap', id: 'skiper22', premium: true },
  { name: 'Image cursor trail', id: 'skiper18', premium: true },
] as const

export function getComponentById(id: string) {
  return COMPONENTS.find((c) => c.id === id)
}

export function getPrevNext(id: string) {
  const i = COMPONENTS.findIndex((c) => c.id === id)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? COMPONENTS[i - 1]! : null,
    next: i < COMPONENTS.length - 1 ? COMPONENTS[i + 1]! : null,
  }
}
