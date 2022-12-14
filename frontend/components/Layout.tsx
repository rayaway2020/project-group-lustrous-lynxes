import Header from './Header'
import Playbar from './Playbar'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import React from 'react'
import Popup from './Popup'

export const playbarContext = React.createContext<any>(undefined)
export const userContext = React.createContext<any>(undefined)

const Layout = ({ children }: any) => {
  const [playlist, setPlaylist] = useState<any[] | undefined>(undefined)
  const [currentSong, setCurrentSong] = useState<number | undefined>(undefined)
  const [isPlaying, setPlaying] = useState(true)
  const [isPopupOpen, setPopupOpen] = useState(false)
  // const [isLiked, setIsLiked] = useState(false)

  const [userInfo, setUserInfo] = useState({
    username: '',
    id: '',
    token: '',
    likedSongs: [''],
    likedPlaylist: [''],
    createdPlaylist: [''],
  })

  const playNext = () => {
    if (!playlist || currentSong === undefined) {
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
    if (!playlist || currentSong === undefined) {
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
      {playlist ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${
            playlist?.[currentSong || 0].videoId
          }`}
          playing={isPlaying}
          className="fixed top-0 right-0 translate-x-full"
          onEnded={() => {
            playNext()
          }}
        />
      ) : null}
      <userContext.Provider value={{ userInfo, setUserInfo }}>
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
          <Playbar />
          {isPopupOpen && playlist ? (
            <Popup id={playlist?.[currentSong || 0].videoId} />
          ) : null}
        </playbarContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default Layout
