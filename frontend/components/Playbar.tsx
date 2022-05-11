import { HeartIcon } from '@heroicons/react/solid'
import {
  HeartIcon as HeartIconOutlined,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpIcon,
  PlayIcon,
  CubeIcon,
  VolumeUpIcon,
  StopIcon,
} from '@heroicons/react/outline'
import { useState, useContext } from 'react'
import { playbarContext } from './Layout'
import axios from 'axios'

interface PlaybarProps {
  like: boolean
}

const Playbar = ({ like }: PlaybarProps) => {
  const {
    playlist,
    currentSong,
    isPlaying,
    setPlaying,
    setPopupOpen,
    playNext,
    playPrev,
  } = useContext(playbarContext)

  const [liked, setLiked] = useState(like)

  return currentSong ? (
    <section className="fixed bottom-0 left-0 right-0 z-50 max-w-screen-xl px-6 m-auto bg-white ">
      <div className="flex flex-row items-center justify-between h-16">
        {/* cover section */}
        <div className="flex flex-row items-center flex-1 gap-4">
          <img
            src={playlist[currentSong].thumbnails.url}
            alt={playlist[currentSong].name}
            className="object-cover w-10 h-10 rounded-full"
          />
          <div className="flex flex-col justify-between">
            <div className="truncate">{playlist[currentSong].name}</div>
            <div className="text-sm">
              {playlist[currentSong].author.name || 'unknown'}
            </div>
          </div>
          {liked ? (
            <HeartIcon
              className="w-6 h-6"
              onClick={() => {
                axios
                  .put(
                    'http://localhost:3001/api/songs/delete',
                    {
                      userId: '627b4044fbab35adfd534d77',
                      songId: playlist[currentSong].videoId,
                    },
                    {
                      headers: {
                        'auth-token':
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiNDA0NGZiYWIzNWFkZmQ1MzRkNzciLCJpYXQiOjE2NTIyNDUyMTN9.08SvFVUJsx_-HEJtmVfRHBBt2c68frJEWFAxDQDHu3o',
                      },
                    }
                  )
                  .then((res) => {
                    setLiked(!liked)
                  })
              }}
            />
          ) : (
            <HeartIconOutlined
              className="w-6 h-6"
              onClick={() => {
                axios
                  .put(
                    'http://localhost:3001/api/songs/add',
                    {
                      userId: '627b4044fbab35adfd534d77',
                      songId: playlist[currentSong].videoId,
                    },
                    {
                      headers: {
                        'auth-token':
                          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiNDA0NGZiYWIzNWFkZmQ1MzRkNzciLCJpYXQiOjE2NTIyNDUyMTN9.08SvFVUJsx_-HEJtmVfRHBBt2c68frJEWFAxDQDHu3o',
                      },
                    }
                  )
                  .then((res) => {
                    setLiked(!liked)
                  })
                  .catch((err) => alert('Access Denied'))
              }}
            />
          )}
        </div>
        {/* control bar */}
        <div className="flex flex-row items-center justify-center flex-1 gap-8">
          <ChevronDoubleLeftIcon
            className="w-6 h-6 cursor-pointer"
            onClick={playPrev}
          />
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
          <ChevronDoubleRightIcon
            className="w-6 h-6 cursor-pointer"
            onClick={playNext}
          />
        </div>
        {/* play setting */}
        <div className="flex flex-row items-center justify-end flex-1 gap-6">
          <CubeIcon className="w-6 h-6" />
          <VolumeUpIcon className="w-6 h-6" />
          <ChevronUpIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              // prevent the body scroll
              document.body.classList.add('overflow-hidden')
              setPopupOpen(true)
            }}
          />
        </div>
      </div>
    </section>
  ) : null
}

export default Playbar
