import { render } from '@testing-library/react'

import FavouriteHeader from '../components/FavouritesHeader'

// Test jest installion with testing a component
it('Renders FavouriteHeader correctly', () => {
  const { queryByText } = render(
    <FavouriteHeader cover="" title="" owner="" description="" id="" />
  )

  expect(queryByText('Album')).toBeDefined()
})
