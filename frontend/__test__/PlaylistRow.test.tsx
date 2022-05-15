import { render } from '@testing-library/react'

import PlaylistRow from '../components/PlaylistRow'

it('Renders PlaylistRow correctly', () => {
  const { queryAllByText } = render(
    <PlaylistRow
      title="title"
      items={[
        {
          _id: 'id',
          title: 'title',
          author: 'author',
          browseId: 'browseId',
          thumbnail: 'thumbnail',
        },
      ]}
      knowId={true}
    />
  )

  expect(queryAllByText('title')).toBeDefined()
})
