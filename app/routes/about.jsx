import React from 'react'

import { Passion } from '~/containers/About/Passion'
import { Video } from '~/containers/About/Video'

export const meta = () => {
  return [{ title: 'About Us – Just Meats' }]
}

const About = () => {
  return (
    <>
      <Video />
      <Passion />
    </>
  )
}

export default About
