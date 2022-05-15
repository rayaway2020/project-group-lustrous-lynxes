import { render } from '@testing-library/react'

import SongCard from '../components/SongCard'

it('Renders SongCard correctly', () => {
  const { queryAllByText } = render(
    <SongCard
      id="id"
      cover="cover"
      title="title"
      subtitle="subtitle"
      duration={0}
    />
  )

  expect(queryAllByText('subtitle')).toBeDefined()
})
