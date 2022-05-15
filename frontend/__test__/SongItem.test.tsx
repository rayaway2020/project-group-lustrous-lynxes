import { render } from '@testing-library/react'
import SongItem from '../components/SongItem'

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

it('Renders SongItem correctly', () => {
  //   const { queryAllByText } = render(
  //     <SongItem
  //       index={1}
  //       title="title"
  //       cover="cover"
  //       duration={1000}
  //       onClick={() => {}}
  //     />
  //   )
  //   expect(queryAllByText('title')).toBeDefined()
})
