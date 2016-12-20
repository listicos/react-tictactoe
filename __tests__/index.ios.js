import 'react-native'
import React from 'react'
import CatToeApp from 'CatToeApp'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <CatToeApp />
  )
})