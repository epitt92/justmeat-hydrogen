var _support = _support || { ui: {}, user: {} }
_support['account'] = 'justmeats'
_support['ui']['contactMode'] = 'mixed'
_support['ui']['enableKb'] = 'true'
_support['ui']['styles'] = {
  widgetColor: 'rgb(66, 91, 52)',
  gradient: true,
}
_support['ui']['shoutboxFacesMode'] = 'default'
_support['ui']['shoutboxHeaderLogo'] = true
_support['ui']['widget'] = {
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
_support['apps'] = {
  recentConversations: {},
  faq: { enabled: true },
  orders: { enabled: true },
}
