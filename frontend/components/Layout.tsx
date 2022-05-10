import Header from './Header'
import Playbar from './Playbar'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import React from 'react'
import Popup from './Popup'

export const playbarContext = React.createContext<any>(undefined)
export const userContext = React.createContext<any>(undefined)

const Layout = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<any | undefined>(undefined)
  const [isPlaying, setPlaying] = useState(true)
  const [isPopupOpen, setPopupOpen] = useState(false)

  const [username, setUsername] = useState('')
  const [token, setToken] = useState<any>(undefined)

  return (
    <>
      {currentSong ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentSong.videoId}`}
          playing={isPlaying}
          className="fixed top-0 right-0 translate-x-full"
        />
      ) : null}
      <userContext.Provider value={{ username, setUsername, token, setToken }}>
        <playbarContext.Provider
          value={{
            currentSong,
            setCurrentSong,
            isPlaying,
            setPlaying,
            setPopupOpen,
          }}
        >
          <Header />
          {children}
          <Playbar like={true} />
          {isPopupOpen ? <Popup id={currentSong.videoId} /> : null}
        </playbarContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default Layout