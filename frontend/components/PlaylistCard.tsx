import router from 'next/router'
import Cover from './Cover'

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
        router.push(`/playlist/${id}`)
      }}
    >
      <Cover url={cover} alt={title} />
      <div className="mt-2 text-lg font-semibold line-clamp-2">{title}</div>
      <div className="truncate opacity-75">{subtitle}</div>
    </div>
  )
}

export default PlaylistCard
