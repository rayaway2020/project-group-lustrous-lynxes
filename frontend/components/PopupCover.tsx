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
  const { currentSong, isPlaying, setPlaying, setPopupOpen } =
    useContext(playbarContext)
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="absolute left-24 top-10">
        <ChevronDownIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            setPopupOpen(false)
            // recovery the body scroll
            document.body.classList.remove('overflow-hidden')
          }}
        />
      </div>
      <img
        src={currentSong.thumbnails.url}
        alt={currentSong.name}
        className="object-cover w-64 h-64 bg-auto aspect-square rounded-xl"
      />
      <div className="flex flex-col items-center justify-between">
        <div>{currentSong.name}</div>
        <div className="mt-2 text-sm">
          {currentSong.author.name || 'unknown'}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <ChevronDoubleLeftIcon className="w-6 h-6" />
        {isPlaying ? (
          <StopIcon
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              setPlaying(!isPlaying)
            }}
          />
        ) : (
          <PlayIcon
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              setPlaying(!isPlaying)
            }}
          />
        )}
        <ChevronDoubleRightIcon className="w-6 h-6" />
      </div>
    </div>
  )
}

export default PopupCover
