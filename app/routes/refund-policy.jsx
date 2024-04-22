import React from 'react'

import RefundPolicy from '~/containers/RefundPolicy'

export const meta = () => {
  return [{ title: 'Refund & Cancellation Policy - Just Meats' }]
}

const RefundPolicyPage = () => {
  return (
    <>
      <RefundPolicy />
    </>
  )
}

export default RefundPolicyPage
