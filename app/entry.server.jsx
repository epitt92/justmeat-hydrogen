import { renderToReadableStream } from 'react-dom/server'

import { Buffer } from 'buffer-polyfill'
import isbot from 'isbot'

import { RemixServer } from '@remix-run/react'
import { createContentSecurityPolicy } from '@shopify/hydrogen'

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
    // For DEV phase
    baseUri: ['*'],
    defaultSrc: ['*', 'data:'],
    connectSrc: ['*', 'data:'],
    styleSrc: ['*', 'data:'],
    scriptSrc: ['*', "'sha256-SsImNIm56IVCqDixAHT0XOpBWZnoqAi3UiCYQ8QbXM8='"],
    fontSrc: ['*', 'data:'],
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
