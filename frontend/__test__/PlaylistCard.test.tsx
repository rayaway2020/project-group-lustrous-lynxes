import { render } from '@testing-library/react'

import PlaylistCard from '../components/PlaylistCard'

it('Renders PlaylistCard correctly', () => {
  const { queryAllByText } = render(
    <PlaylistCard
      id="id"
      browseId="browseId"
      cover="cover"
      title="title"
      subtitle="subtitle"
    />
  )

  expect(queryAllByText('title')).toBeDefined()
})
