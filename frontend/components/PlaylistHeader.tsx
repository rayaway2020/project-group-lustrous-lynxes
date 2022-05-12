import {
  PlayIcon,
  HeartIcon as HeartIconOutlined,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useContext, useState } from 'react'
import { userContext } from './Layout'


type PlayListHeaderProps = {
  cover: string
  title: string
  owner: string
  like: boolean
  description: string
  id: string
}

const PlayListHeader = ({
  cover,
  title,
  owner,
  like,
  description,
  id,
}: PlayListHeaderProps) => {

  const { username, setUsername, userId, setUserId, token, setToken } =
    useContext(userContext)
  
  const [liked, setLiked] = useState(like)

  return (
    <div className="flex flex-row w-full gap-8 p-12 bg-gray-100 h-80 rounded-2xl">
      <img
        src={cover}
        alt={title}
        className="object-contain h-full aspect-square rounded-2xl"
      />
      <div className="flex flex-col justify-between flex-1 w-0 gap-2">
        <div className="w-full text-3xl font-semibold truncate">{title}</div>
        <div className="flex flex-col w-full">
          {/* owner? */}
          <span>Album by {owner}</span>
        </div>
        <div className="w-full text-gray-600 line-clamp-3">{description}</div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex flex-row gap-2 px-4 py-1 bg-white rounded w-min">
            <PlayIcon className="w-6 h-6" />
            <span>Play</span>
          </div>
          <div className="flex flex-row gap-2 px-4 py-1 bg-white rounded w-min">
            {liked ? (
              <HeartIcon
                className="w-6 h-6"
                onClick={() => { 
                  axios
                    .put(
                      'http://localhost:3001/api/playlists/delete',
                      {
                        userId: userId,
                        playlistId: id,
                      },
                      {
                        headers: {
                          'auth-token': token,
                        },
                      }
                    )
                    .then((res) => {
                      setLiked(!liked)
                    })
                    .catch((err) => alert('Access Denied'))
                }}
              />
            ) : (
              <HeartIconOutlined
                className="w-6 h-6"
                onClick={() => { token ? 
                  axios
                    .put(
                      'http://localhost:3001/api/playlists/add',
                      {
                        userId: userId,
                        playlistId: id,
                      },
                      {
                        headers: {
                          'auth-token': token,
                        },
                      }
                    )
                    .then((res) => {
                      setLiked(!liked)
                    })
                    .catch((err) => alert('Access Denied'))
                    :
                    alert("Please log in");
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
