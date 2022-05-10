import PlaylistCard from './PlaylistCard'

interface PlaylistRowProps {
  title: string
  items: any[]
}

const PlaylistRow = ({ title, items }: PlaylistRowProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-5 gap-8">
        {items?.map((item, i) => (
          <PlaylistCard
            key={i}
            cover={item.thumbnail}
            title={item.title}
            subtitle={item.author}
            id={item.browseId}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistRow
