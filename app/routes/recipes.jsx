import React from 'react'

import Easydelicious from '~/containers/Recipes/Easydelicious'
import QuickSimpleRecipes from '~/containers/Recipes/QuickSimpleRecipes'

const Recipes = () => {
  return (
    <>
      <Easydelicious />
      <QuickSimpleRecipes />
    </>
  )
}

export default Recipes
