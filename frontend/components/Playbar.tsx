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
    <section className="fixed bottom-0 left-0 right-0 z-50 max-w-screen-xl px-6 m-auto bg-white ">
      <div className="flex flex-row items-center justify-between h-16">
        {/* cover section */}
        <div className="flex flex-row items-center flex-1 gap-4">
          <img
            src={currentSong.thumbnails.url}
            alt=""
            className="object-cover w-10 h-10 rounded-full"
          />
          <div className="flex flex-col justify-between">
            <div className="truncate">{currentSong.name}</div>
            <div className="text-sm">
              {currentSong.author.name || 'unknown'}
            </div>
          </div>
          <HeartIcon className="w-6 h-6" />
        </div>
        {/* control bar */}
        <div className="flex flex-row items-center justify-center flex-1 gap-8">
          <ChevronDoubleLeftIcon className="w-6 h-6 cursor-pointer" />
          {isPlaying ? (
            <StopIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setPlaying(!isPlaying)
              }}
            />
          ) : (
            <PlayIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setPlaying(!isPlaying)
              }}
            />
          )}
          <ChevronDoubleRightIcon className="w-6 h-6 cursor-pointer" />
        </div>
        {/* play setting */}
        <div className="flex flex-row items-center justify-end flex-1 gap-6">
          <CubeIcon className="w-6 h-6" />
          <VolumeUpIcon className="w-6 h-6" />
          <ChevronUpIcon className="w-6 h-6" />
        </div>
      </div>
    </section>
  ) : null
}

export default Playbar
