import React from 'react'

import Easydelicious from '~/containers/Recipes/Easydelicious'
import QuickSimpleRecipes from '~/containers/Recipes/QuickSimpleRecipes'

export const meta = () => {
  return [{ title: 'Recipes - Just Meats' }]
}

const Recipes = () => {
  return (
    <>
      <Easydelicious />
      <QuickSimpleRecipes />
    </>
  )
}

export default Recipes
