import { render } from '@testing-library/react'

import Comment from '../components/Comment'

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: (any: any) => ({
      username: 'username',
      setUsername: jest.fn(),
      userId: 'userId',
      setUserId: jest.fn(),
      token: 'token',
      setToken: jest.fn(),
      setCurrentSong: jest.fn(),
      setPlaying: jest.fn(),
      setPlaylist: jest.fn(),
      playlist: '',
      currentSong: '',
      userInfo: {
        username: 'username',
        id: 'userId',
        token: 'token',
        likedSongs: ['songId'],
        likedPlaylist: ['playlistId'],
        createdPlaylist: ['playlistId'],
      },
    }),
  }
})

it('Renders Comment correctly', () => {
  const { queryAllByText } = render(
    <Comment
      id="1"
      author="test"
      date="today"
      content="none"
      like={false}
      likecount={0}
    />
  )

  expect(queryAllByText('test')).toBeDefined()
})
