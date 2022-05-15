import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import Me from '../pages/me'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

jest.setTimeout(60000)

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

// https://github.com/vercel/next.js/issues/7479#issuecomment-626297880
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

afterEach(() => {
  axiosMock.reset()
})

it('Renders Me page correctly', () => {
  axiosMock.onGet('http://localhost:3001/api/playlists/user/info').reply(200, {
    ownedPlaylist: [],
    favoriteList: [],
    likedSongs: [],
  })
  axiosMock.onPost('http://localhost:3001/api/playlists').reply(200, {
    id: 'playlistId',
    title: 'playlistTitle',
    description: 'playlistDescription',
  })

  const route = {
    push: jest.fn(), // the component uses `router.push` only
  }

  ;(useRouter as jest.Mock).mockReturnValue(route)

  render(<Me />)

  expect(route.push).toHaveBeenCalledWith('/')
})
