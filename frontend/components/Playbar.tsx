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
import { useContext } from 'react'
import { userContext, playbarContext } from './Layout'
import axios from 'axios'

const Playbar = () => {
  const {
    playlist,
    currentSong,
    isPlaying,
    setPlaying,
    setPopupOpen,
    playNext,
    playPrev,
  } = useContext(playbarContext)

  const { userInfo, setUserInfo } = useContext(userContext)

  return currentSong || playlist ? (
    <section className="fixed bottom-0 left-0 right-0 z-50 m-auto max-w-screen-xl bg-white px-6 ">
      <div className="flex h-16 flex-row items-center justify-between">
        {/* cover section */}
        <div className="flex flex-1 flex-row items-center gap-4">
          <img
            src={playlist[currentSong].thumbnails.url}
            alt={playlist[currentSong].name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col justify-between">
            <div className="truncate">{playlist[currentSong].name}</div>
            <div className="text-sm">
              {playlist[currentSong].author.name || 'unknown'}
            </div>
          </div>
        </div>
        {/* control bar */}
        <div className="flex flex-1 flex-row items-center justify-center gap-8">
          <ChevronDoubleLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => playPrev()}
          />
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
          <ChevronDoubleRightIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => playNext()}
          />
        </div>

        {/* play setting */}
        <div className="flex flex-1 flex-row items-center justify-end gap-6">
          {userInfo.likedSongs.includes(playlist[currentSong].videoId) ? (
            <HeartIcon
              className="h-6 w-6"
              onClick={() => {
                axios
                  .put(
                    'http://localhost:3001/api/songs/delete',
                    {
                      userId: userInfo.id,
                      songId: playlist[currentSong].videoId,
                    },
                    {
                      headers: {
                        'auth-token': userInfo.token,
                      },
                    }
                  )
                  .then((res) => {
                    const temp = userInfo.likedSongs.filter(
                      (x: any) => x != playlist[currentSong].videoId
                    )
                    setUserInfo({ ...userInfo, likedSongs: temp })
                  })
              }}
            />
          ) : (
            <HeartIconOutlined
              className="h-6 w-6"
              onClick={() => {
                userInfo.token
                  ? axios
                      .put(
                        'http://localhost:3001/api/songs/add',
                        {
                          userId: userInfo.id,
                          songId: playlist[currentSong].videoId,
                        },
                        {
                          headers: {
                            'auth-token': userInfo.token,
                          },
                        }
                      )
                      .then((res: any) => {
                        const temp = [
                          ...userInfo.likedSongs,
                          playlist[currentSong].videoId,
                        ]
                        setUserInfo({ ...userInfo, likedSongs: temp })
                      })
                  : alert('Please log in')
              }}
            />
          )}
          <ChevronUpIcon
            className="h-6 w-6 cursor-pointer"
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
