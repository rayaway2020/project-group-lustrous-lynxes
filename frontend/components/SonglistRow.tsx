import SongItem from './SongItem'

interface SonglistRowProps {
  title: string
  items: any[]
}

const SonglistRow = ({ title, items }: SonglistRowProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex flex-col gap-4">
        {items?.map((item, i) => (
          <SongItem
            key={i}
            index={i + 1}
            cover={item.thumbnail}
            title={item.title}
            duration={item.duration}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

export default SonglistRow
