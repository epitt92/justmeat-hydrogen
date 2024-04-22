import React from 'react'

import TermServices from '~/containers/TermServices'

export const meta = () => {
  return [{ title: 'Terms of Service - Just Meats' }]
}

const TermServicesPage = () => {
  return (
    <>
      <TermServices />
    </>
  )
}

export default TermServicesPage
