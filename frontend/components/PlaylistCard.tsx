import router from 'next/router'
import Cover from './Cover'
import axios from 'axios'

interface PlaylistCardProps {
  id: string // playlist id
  cover: string
  title: string
  subtitle: string
}

const PlaylistCard = ({ id, cover, title, subtitle }: PlaylistCardProps) => {
  return (
    <div
      className="flex flex-col"
      onClick={() => {
        id != "" ?
        axios.post("http://localhost:3001/api/playlists/public", {
                title: title,
                thumbnail: cover,
                author: subtitle,
                browseId: id
        }) :
        null
        router.push(`/playlist/${id}`);
      }}
    >
      <Cover url={cover} alt={title} />
      <div className="mt-2 text-lg font-semibold line-clamp-2">{title}</div>
      <div className="truncate opacity-75">{subtitle}</div>
    </div>
  )
}

export default PlaylistCard


