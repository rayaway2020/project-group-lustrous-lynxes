import { render, cleanup, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

import Header from '../components/Header'

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

afterEach(() => {
  axiosMock.reset()
  cleanup()
})

it('Renders Header correctly', async () => {
  axiosMock.onPost('http://localhost:3001/api/auth/register').reply(200, {})
  axiosMock.onPost('http://localhost:3001/api/auth/login').reply(200, {
    username: 'username',
    id: 'userId',
    token: 'token',
    likedSongs: ['songId'],
    likedPlaylist: ['playlistId'],
    createdPlaylist: ['playlistId'],
  })

  // const { queryAllByText } = render(<Header />)

  // await waitFor(() => queryAllByText('username'), { timeout: 1000 })

  // expect(queryAllByText('Home')).toBeDefined()
})
