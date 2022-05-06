type SongItemProps = {
  id: string
  index: number
  title: string
  cover: string
  duration: string
}

const SongItem = ({ id, index, title, cover, duration }: SongItemProps) => {
  return (
    <div className="flex flex-row items-center gap-6">
      <div className="w-8 text-gray-600">
        {index > 10 ? index : `0${index}`}
      </div>
      <img
        src={cover}
        alt={title}
        className="object-contain w-8 h-8 rounded aspect-square"
      />
      <div className="flex-1 truncate">{title}</div>
      <div>{duration}</div>
    </div>
  )
}

export default SongItem
