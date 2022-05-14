import PlaylistCard from './PlaylistCard'

interface PlaylistRowProps {
  title: string
  items: any[]
  knowId: boolean
}

const PlaylistRow = ({ title, items, knowId }: PlaylistRowProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-5 gap-8">
        {items?.map((item, i) => (
          <PlaylistCard
            key={i}
            id={knowId ? item._id : ''}
            cover={item.thumbnail}
            title={item.title}
            subtitle={item.author}
            browseId={item.browseId}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistRow
