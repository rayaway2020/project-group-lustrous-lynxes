import { render, cleanup, waitFor } from '@testing-library/react'
import Favourites from '../pages/favourites'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

jest.setTimeout(60000)

// https://stackoverflow.com/questions/54691799/how-to-test-a-react-component-that-is-dependent-on-usecontext-hook
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

afterEach(() => {
  axiosMock.reset()
  cleanup()
})

it('Renders favourites page correctly', async () => {
  const songs: any[] | undefined = []

  const songList = [
    {
      title: 'song1',
      _id: '1',
    },
    {
      title: 'song2',
      _id: '2',
    },
    {
      title: 'song3',
      _id: '3',
    },
  ]

  axiosMock.onGet('http://localhost:3001/api/songs/favorite').reply(200, songs)
  axiosMock
    .onGet('http://localhost:3001/api/playlists/user/created')
    .reply(200, songList)
  axiosMock.onPut('http://localhost:3001/api/playlists/addsong').reply(200)

  const { queryAllByText, getAllByText } = render(<Favourites />)

  await waitFor(() => getAllByText('Album by username'), { timeout: 1000 })

  expect(queryAllByText('My favourite songs')).toBeDefined()

  expect(axiosMock.history.get[0].url).toEqual(
    'http://localhost:3001/api/songs/favorite'
  )
})
