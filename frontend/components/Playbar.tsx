import {
  HeartIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpIcon,
  PlayIcon,
  CubeIcon,
  VolumeUpIcon,
  StopIcon,
} from '@heroicons/react/outline'
import { useContext } from 'react'
import { playbarContext } from './Layout'

const Playbar = () => {
  const { currentSong, setCurrentSong, isPlaying, setPlaying } =
    useContext(playbarContext)

  return currentSong ? (
    <section className="fixed bottom-0 left-0 right-0 z-50 m-auto max-w-screen-xl bg-white px-6 ">
      <div className="flex h-16 flex-row items-center justify-between">
        {/* cover section */}
        <div className="flex flex-1 flex-row items-center gap-4">
          <img
            src={currentSong.thumbnails.url}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col justify-between">
            <div className="truncate">{currentSong.name}</div>
            <div className="text-sm">
              {currentSong.author.name || 'unknown'}
            </div>
          </div>
          <HeartIcon className="h-6 w-6" />
        </div>
        {/* control bar */}
        <div className="flex flex-1 flex-row items-center justify-center gap-8">
          <ChevronDoubleLeftIcon className="h-6 w-6 cursor-pointer" />
          {isPlaying ? (
            <StopIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                setPlaying(!isPlaying)
              }}
            />
          ) : (
            <PlayIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                setPlaying(!isPlaying)
              }}
            />
          )}
          <ChevronDoubleRightIcon className="h-6 w-6 cursor-pointer" />
        </div>
        {/* play setting */}
        <div className="flex flex-1 flex-row items-center justify-end gap-6">
          <CubeIcon className="h-6 w-6" />
          <VolumeUpIcon className="h-6 w-6" />
          <ChevronUpIcon className="h-6 w-6" />
        </div>
      </div>
    </section>
  ) : null
}

export default Playbar
