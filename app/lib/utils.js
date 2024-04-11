import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  if (Number.isInteger(price)) {
    return price.toString()
  } else {
    return price.toFixed(2).replace(/(\.0+|0+)$/, '')
  }
}

export function addScriptToHead(src) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

export function getPureId(fullId, type) {
  const keyword = `gid://shopify/${type}/`
  return fullId.split(keyword)[1]
}

export function getFullId(id, type) {
  return `gid://shopify/${type}/${id}`
}
