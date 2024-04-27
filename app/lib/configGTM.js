export const configGTM = () => {
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'GTM-53HM3TQ7')

  window.dataLayer = window.dataLayer || []

  if (!window.localStorage.getItem('_already_visited')) {
    window.dataLayer.push({ event: 'first_visit' })
    window.localStorage.setItem('_already_visited', JSON.stringify(true))
  }

  window.document.addEventListener('click', ({ target }) => {
    window.dataLayer.push({ event: 'click' })

    if (target.matches('.btn-add-to-cart, .btn-add-to-cart *')) {
      window.dataLayer.push({ event: 'add_to_cart' })
    }

    if (target.matches('.btn-checkout, .btn-checkout *')) {
      window.dataLayer.push({ event: 'begin_checkout' })
    }

    if (
      target.matches('.product-grid .img-wrapper, .product-grid .img-wrapper *')
    ) {
      window.dataLayer.push({ event: 'view_item' })
    }

    // if (target.matches('')) {
    //   console.debug('clicked')
    //   window.dataLayer.push({ event: '' })
    // }
  })

  window.document.addEventListener('submit', () => {
    window.dataLayer.push({ event: 'form_submit' })
  })

  window.document.addEventListener('input', ({ target }) => {
    if (target.matches('input')) {
      if (!window.isFormStarted) {
        window.dataLayer.push({ event: 'form_start' })
        window.isFormStarted = true
      }
    }
  })

  window.document.addEventListener('scroll', () => {
    window.dataLayer.push({ event: 'scroll' })
  })
}
