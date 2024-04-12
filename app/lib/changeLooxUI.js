export const changeLooxUI = () => {
  setTimeout(() => {
    const iframe = document.getElementById('looxReviewsFrame')
    const styleSheet = document.createElement('style')
    styleSheet.innerText = `.summary-text { color: black; }`

    const head = iframe.contentWindow.document.head
    head.appendChild(styleSheet)
  }, 2000)
}
