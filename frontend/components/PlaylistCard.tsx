import router from 'next/router'
import Cover from './Cover'
import axios from 'axios'
import { useState } from 'react'

interface PlaylistCardProps {
  id?: string
  browseId?: string // playlist id
  cover: string
  title: string
  subtitle: string
}

//需要进一步考虑edge cases
// update: type of id and browseId
const PlaylistCard = ({
  id,
  browseId,
  cover,
  title,
  subtitle,
}: PlaylistCardProps) => {
  const [playlistId, setPlaylistId] = useState(id)
  
  return (
    <div
      className="flex flex-col"
      onClick={() => {
        browseId
          ? axios
              .post('http://localhost:3001/api/playlists/public', {
                title: title,
                thumbnail: cover,
                author: subtitle,
                browseId: browseId,
              })
              .then((res) => {
                setPlaylistId(res.data._id)
                //如果点击外部来源的歌单
                router.push(`/playlist/${browseId}/`)
              })
          : //如果点击用户创造的歌单
            router.push(`/playlist/${playlistId}/`)
      }}
    >
      <Cover url={cover} alt={title} />
      <div className="mt-2 text-lg font-semibold line-clamp-2">{title}</div>
      <div className="truncate opacity-75">{subtitle}</div>
    </div>
  )
}

export default PlaylistCard
