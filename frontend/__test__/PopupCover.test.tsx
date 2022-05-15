import { render } from '@testing-library/react'

import PopupCover from '../components/PopupCover'

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: (any: any) => ({
      playlist: [
        {
          thumbnails: { url: 'url' },
          name: 'name',
          author: { name: 'author' },
        },
      ],
      currentSong: 0,
      isPlaying: false,
      setPlaying: jest.fn(),
      setPopupOpen: jest.fn(),
      playNext: jest.fn(),
      playPrev: jest.fn(),
    }),
  }
})

it('Renders PopupCover correctly', () => {
  const { queryAllByText } = render(<PopupCover />)

  expect(queryAllByText('author')).toBeDefined()
})
