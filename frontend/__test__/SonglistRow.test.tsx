import { render } from '@testing-library/react'
import SonglistRow from '../components/SonglistRow'

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
        token: '',
        likedSongs: ['songId'],
        likedPlaylist: ['playlistId'],
        createdPlaylist: ['playlistId'],
      },
    }),
  }
})

it('Renders SonglistRow correctly', () => {
  const { queryAllByText } = render(<SonglistRow title="title" items={[]} />)

  expect(queryAllByText('title')).toBeDefined()
})
