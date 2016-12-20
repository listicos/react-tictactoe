import 'react-native'
import React from 'react'
import CatToeApp from 'CatToeApp'
import renderer from 'react-test-renderer'

it('Renders correctly', () => {
  const tree = renderer.create(
    <CatToeApp />
  )
})