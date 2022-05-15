import {
  PlayIcon,
  HeartIcon as HeartIconOutlined,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from './Layout'

type PlayListHeaderProps = {
  cover: string
  title: string
  owner: string
  description: string
  id: string
  play: () => void
}

const PlayListHeader = ({
  cover,
  title,
  owner,
  description,
  id,
  play,
}: PlayListHeaderProps) => {
  const { userInfo, setUserInfo } = useContext(userContext)

  return (
    <div className="flex h-80 w-full flex-row gap-8 rounded-2xl bg-gray-100 p-12">
      <img
        src={cover}
        alt={title}
        className="aspect-square h-full rounded-2xl object-contain"
      />
      <div className="flex w-0 flex-1 flex-col justify-between gap-2">
        <div className="w-full truncate text-3xl font-semibold">{title}</div>
        <div className="flex w-full flex-col">
          {/* owner? */}
          <span>Album by {owner}</span>
        </div>
        <div className="w-full text-gray-600 line-clamp-3">{description}</div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div
            className="flex w-min cursor-pointer flex-row gap-2 rounded bg-white px-4 py-1"
            onClick={() => {
              play()
            }}
          >
            <PlayIcon className="h-6 w-6" />
            <span>Play</span>
          </div>
          <div className="flex w-min flex-row gap-2 rounded bg-white px-4 py-1">
            {userInfo.likedPlaylist.includes(id) ? (
              <HeartIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  axios
                    .put(
                      'http://localhost:3001/api/playlists/delete',
                      {
                        userId: userInfo.id,
                        playlistId: id,
                      },
                      {
                        headers: {
                          'auth-token': userInfo.token,
                        },
                      }
                    )
                    .then((res) => {
                      const temp = userInfo.likedPlaylist.filter(
                        (x: any) => x != id
                      )
                      setUserInfo({ ...userInfo, likedPlaylist: temp })
                    })
                }}
              />
            ) : (
              <HeartIconOutlined
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  userInfo.token
                    ? axios
                        .put(
                          'http://localhost:3001/api/playlists/add',
                          {
                            userId: userInfo.id,
                            playlistId: id,
                          },
                          {
                            headers: {
                              'auth-token': userInfo.token,
                            },
                          }
                        )
                        .then((res) => {
                          const temp = [...userInfo.likedPlaylist, id]
                          setUserInfo({ ...userInfo, likedPlaylist: temp })
                        })
                    : alert('Please log in')
                }}
              />
            )}
            <span>Like</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListHeader
