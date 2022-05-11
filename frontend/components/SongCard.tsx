import Cover from './Cover'

interface SongCardProps {
  id: string // playlist id
  cover: string
  title: string
  subtitle: string
}

const SongCard = ({ id, cover, title, subtitle }: SongCardProps) => {
  return (
    <div
      className="flex flex-col"
      onClick={() => {
        // display songs now
      }}
    >
      <Cover url={cover} alt={title} />
      <div className="mt-2 text-lg font-semibold line-clamp-2">{title}</div>
      <div className="truncate opacity-75">{subtitle}</div>
    </div>
  )
}

export default SongCard
