import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { ThemeProvider } from '@material-tailwind/react'
import { RemixBrowser } from '@remix-run/react'

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider>
        <RemixBrowser />
      </ThemeProvider>
    </StrictMode>,
  )
})
