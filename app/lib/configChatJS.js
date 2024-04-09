export const configChatJS = () => {
  window._support = window._support || { ui: {}, user: {} }
  window._support['account'] = 'justmeats'
  window._support['ui']['contactMode'] = 'mixed'
  window._support['ui']['enableKb'] = 'true'
  window._support['ui']['styles'] = {
    widgetColor: 'rgb(66, 91, 52)',
    gradient: true,
  }
  window._support['ui']['shoutboxFacesMode'] = 'default'
  window._support['ui']['shoutboxHeaderLogo'] = true
  window._support['ui']['widget'] = {
    icon: 'chat',
    displayOn: 'all',
    fontSize: 'default',
    allowBotProcessing: true,
    label: {
      text: 'Let us know if you have any questions! &#128522;',
      mode: 'notification',
      delay: 3,
      duration: 30,
      primary: 'I have a question',
      secondary: 'No, thanks',
      sound: true,
    },
    position: 'bottom-right',
    mobilePosition: 'bottom-right',
  }
  window._support['apps'] = {
    recentConversations: {},
    faq: { enabled: true },
    orders: { enabled: true },
  }
}
