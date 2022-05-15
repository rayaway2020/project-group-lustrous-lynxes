import { render } from '@testing-library/react'

import LibrarySongItem from '../components/LibrarySongItem'

it('Renders LibrarySongItem correctly', () => {
  const { queryAllByText } = render(
    <LibrarySongItem title="title" cover="cover" duration={60 * 60} />
  )

  expect(queryAllByText('title')).toBeDefined()
})
