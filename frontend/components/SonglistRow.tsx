import PlaylistCard from './PlaylistCard'

interface PlaylistRowProps {
  title: string
  items: any[]
}

const PlaylistRow = ({ title, items }: PlaylistRowProps) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-5 gap-8">
        {items?.map((item, i) => (
          <PlaylistCard
            key={i}
            cover={item.thumbnails[0].url}
            title={item.name}
            subtitle={item.author?.name || 'unknown'}
            id={item.videoId}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistRow
