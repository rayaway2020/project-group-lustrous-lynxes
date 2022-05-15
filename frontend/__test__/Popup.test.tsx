import { render } from '@testing-library/react'

import Popup from '../components/Popup'

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
      setUserInfo: jest.fn(),
    }),
  }
})

it('Renders Popup correctly', () => {
  //   const { queryAllByText } = render(
  //     <Popup
  //         id="id"
  //     />
  //   )
  //   expect(queryAllByText('username')).toBeDefined()
})
