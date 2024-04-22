import React from 'react'

import PrivacyPolicy from '~/containers/PrivacyPolicy'

export const meta = () => {
  return [{ title: 'Privacy Policy - Just Meats' }]
}

const PrivacyPolicyPage = () => {
  return (
    <>
      <PrivacyPolicy />
    </>
  )
}

export default PrivacyPolicyPage
