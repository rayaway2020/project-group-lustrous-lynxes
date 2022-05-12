import Header from './Header'
import Playbar from './Playbar'
import ReactPlayer from 'react-player'
import { useEffect, useState } from 'react'
import React from 'react'
import Popup from './Popup'
import axios from 'axios'

export const playbarContext = React.createContext<any>(undefined)
export const userContext = React.createContext<any>(undefined)

const Layout = ({ children }: any) => {
  const [playlist, setPlaylist] = useState<any[] | undefined>(undefined)
  const [currentSong, setCurrentSong] = useState<number | undefined>(undefined)
  const [isPlaying, setPlaying] = useState(true)
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState<any>(undefined)

  useEffect(() => {
    if (currentSong) {
      axios
        .get('http://localhost:3001/api/songs/isliked', {
          params: {
            userId: '627cfa9dd845ea0253f2f223',
            songId: playlist?.[currentSong],
          },
        })
        .then((res) => {
          res.data.liked ? setIsLiked(true) : setIsLiked(false)
        })
    }
  }, [currentSong])

  const playNext = () => {
    if (!playlist || !currentSong) {
      return
    }
    if (currentSong === playlist.length - 1) {
      setCurrentSong(0)
    } else {
      setCurrentSong(currentSong + 1)
    }
    setPlaying(true)
  }

  const playPrev = () => {
    if (!playlist || !currentSong) {
      return
    }
    if (currentSong === 0) {
      setCurrentSong(playlist.length - 1)
    } else {
      setCurrentSong(currentSong - 1)
    }
    setPlaying(true)
  }

  return (
    <>
      {currentSong ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${playlist?.[currentSong].videoId}`}
          playing={isPlaying}
          className="fixed top-0 right-0 translate-x-full"
        />
      ) : null}
      <userContext.Provider
        value={{ username, setUsername, userId, setUserId, token, setToken }}
      >
        <playbarContext.Provider
          value={{
            playlist,
            currentSong,
            setCurrentSong,
            isPlaying,
            setPlaying,
            setPopupOpen,
            setPlaylist,
            playNext,
            playPrev,
          }}
        >
          <Header />
          {children}
          <Playbar like={isLiked} />
          {isPopupOpen && currentSong ? (
            <Popup id={playlist?.[currentSong].videoId} />
          ) : null}
        </playbarContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default Layout
