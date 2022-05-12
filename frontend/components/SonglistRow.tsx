import SongCard from './SongCard'

interface SonglistRowProps {
  title: string
  items: any[]
}

const SonglistRow = ({ title, items }: SonglistRowProps) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-5 gap-8">
        {items?.map((item, i) => (
          <SongCard
            key={i}
            cover={item.thumbnail}
            title={item.title}
            subtitle={item.artist || 'unknown'}
            duration={item.duration}
            id={item.videoId}
          />
        ))}
      </div>
    </div>
  )
}

export default SonglistRow
