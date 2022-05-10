import { PlayIcon, HeartIcon as HeartIconOutlined } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useState } from 'react'


type PlayListHeaderProps = {
  cover: string
  title: string
  owner: string
  description: string
  like: boolean
  browseId: string
}

const PlayListHeader = ({
  cover,
  title,
  owner,
  description,
  like,
  browseId
}: PlayListHeaderProps) => {
  const [liked, setLiked] = useState(like);

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
        <div className="flex w-min flex-row gap-2 rounded bg-white px-4 py-1">
          <PlayIcon className="h-6 w-6" />
          <span>Play</span>
        </div>
        <div className="flex w-min flex-row gap-2 rounded bg-white px-4 py-1" >
          {liked? <HeartIcon className="h-6 w-6" onClick={() => {
            axios.put("http://localhost:3001/api/playlists/add", {
              userId: "627a76a742738d8f093d6fdc",
              browseId: browseId
            }, {
              headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc4ZWRiZDEzYjBiNTJmMTBkMzdmYzUiLCJpYXQiOjE2NTIwOTI0ODN9.ED_bdG5fEK36_VgzrIHkdgo80la3sRPyrG5Z0toA5mA"
              }
            }).then(res => {
              setLiked(!liked)
            }).catch(err => alert("Access Denied"))
          }} />
          : 
          <HeartIconOutlined className="h-6 w-6" onClick={() => {
            axios.put("http://localhost:3001/api/playlists/delete", {
              userId: "627a76a742738d8f093d6fdc",
              browseId: browseId
            }, {
              headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc4ZWRiZDEzYjBiNTJmMTBkMzdmYzUiLCJpYXQiOjE2NTIwOTI0ODN9.ED_bdG5fEK36_VgzrIHkdgo80la3sRPyrG5Z0toA5mA"
              }
            }).then(res => {
              setLiked(!liked)
            }).catch(err => alert("Access Denied"))
          }} /> }
          <span>Like</span>
        </div>
      </div>
    </div>
  )
}

export default PlayListHeader
