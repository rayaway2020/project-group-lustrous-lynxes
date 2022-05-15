import { render } from '@testing-library/react'
import Search from '../pages/search'

it('Renders index page correctly', () => {
  const { queryByText } = render(<Search />)

  expect(queryByText('30000 playlists')).toBeDefined()
})
