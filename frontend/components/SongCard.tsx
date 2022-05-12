import Cover from './Cover'
import axios from 'axios'


interface SongCardProps {
  id: string // video id
  cover: string
  title: string
  subtitle: string
  duration: number
}

const SongCard = ({ id, cover, title, subtitle, duration }: SongCardProps) => {
  return (
    <div
      className="flex flex-col"
      onClick={() => {
        axios.post('http://localhost:3001/api/songs/', {
          id: id,
          title: title,
          cover: cover,
          duration: duration,
        })
      }}
    >
      <Cover url={cover} alt={title} />
      <div className="mt-2 text-lg font-semibold line-clamp-2">{title}</div>
      <div className="truncate opacity-75">{subtitle}</div>
    </div>
  )
}

export default SongCard
