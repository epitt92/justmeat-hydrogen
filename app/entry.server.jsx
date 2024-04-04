import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { renderToReadableStream } from 'react-dom/server'
import { createContentSecurityPolicy } from '@shopify/hydrogen'
import { Buffer } from 'buffer-polyfill'

globalThis.Buffer = Buffer

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      "'nonce-1af9efdf3d84886f2c7fa778895e153e'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'http://localhost:*',
      'https://loox.io', // Add 'https://loox.io' to allow scripts from this domain
    ],
    styleSrc: [
      "'self'",
      'http://localhost:*',
      'https://shopify.com',
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://monorail-edge.shopifysvc.com',
      'https://loox.io',
    ]
  })

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error)
        responseStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set('Content-Security-Policy', header)

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
