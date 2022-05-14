import {
  StopIcon,
  ChevronDoubleLeftIcon,
  PlayIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import { useContext } from 'react'
import { playbarContext } from './Layout'

const PopupCover = () => {
  const {
    playlist,
    currentSong,
    isPlaying,
    setPlaying,
    setPopupOpen,
    playNext,
    playPrev,
  } = useContext(playbarContext)
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="absolute left-24 top-10">
        <ChevronDownIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setPopupOpen(false)
            // recovery the body scroll
            document.body.classList.remove('overflow-hidden')
          }}
        />
      </div>
      <img
        src={playlist[currentSong].thumbnails.url}
        alt={playlist[currentSong].name}
        className="aspect-square h-64 w-64 rounded-xl bg-auto object-cover"
      />
      <div className="flex flex-col items-center justify-between">
        <div>{playlist[currentSong].name}</div>
        <div className="mt-2 text-sm">
          {playlist[currentSong].author.name || 'unknown'}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <ChevronDoubleLeftIcon className="h-6 w-6" onClick={playPrev} />
        {isPlaying ? (
          <StopIcon
            className="h-10 w-10 cursor-pointer"
            onClick={() => {
              setPlaying(!isPlaying)
            }}
          />
        ) : (
          <PlayIcon
            className="h-10 w-10 cursor-pointer"
            onClick={() => {
              setPlaying(!isPlaying)
            }}
          />
        )}
        <ChevronDoubleRightIcon className="h-6 w-6" onClick={playNext} />
      </div>
    </div>
  )
}

export default PopupCover
