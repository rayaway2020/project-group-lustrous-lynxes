import { render, waitFor } from '@testing-library/react'
import Home from '../pages/index'

function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  )
}

it('Renders index page correctly', async () => {
  const playlist = [
    {
      title: 'Playlist',
      data: [
        {
          _id: '1',
          thumbnail: 'thumbnail1',
          title: 'title1',
          author: 'author1',
          browseId: 'browseId1',
        },
        {
          _id: '2',
          thumbnail: 'thumbnail2',
          title: 'title2',
          author: 'author2',
          browseId: 'browseId2',
        },
        {
          _id: '3',
          thumbnail: 'thumbnail3',
          title: 'title3',
          author: 'author3',
          browseId: 'browseId3',
        },
      ],
    },
  ]

  global.fetch = mockFetch(playlist)

  const { getByText, queryByText } = render(<Home />)

  await waitFor(() => getByText('title1'), { timeout: 5000 })

  for (let song of playlist[0].data) {
    expect(queryByText(song.title)).toBeDefined()
  }
})
