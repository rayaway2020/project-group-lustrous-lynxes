import Header from './Header'
import Playbar from './Playbar'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import React from 'react'

export const playbarContext = React.createContext<any>(undefined)

const Layout = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<any | undefined>(undefined)
  const [isPlaying, setPlaying] = useState(true)

  return (
    <>
      {currentSong ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentSong.videoId}`}
          playing={isPlaying}
          className="fixed top-0 right-0 translate-x-full"
        />
      ) : null}
      <playbarContext.Provider
        value={{ currentSong, setCurrentSong, isPlaying, setPlaying }}
      >
        <Header />
        {children}
        <Playbar />
      </playbarContext.Provider>
    </>
  )
}

export default Layout
