type SongItemProps = {
  id: string
  index: number
  title: string
  cover: string
  duration: string
  onClick: () => void
}

const SongItem = ({
  id,
  index,
  title,
  cover,
  duration,
  onClick,
}: SongItemProps) => {
  return (
    <div
      className="flex flex-row items-center gap-6"
      onClick={() => {
        onClick()
      }}
    >
      <div className="w-8 text-gray-600">
        {index > 10 ? index : `0${index}`}
      </div>
      <img
        src={cover}
        alt={title}
        className="aspect-square h-8 w-8 rounded object-cover"
      />
      <div className="flex-1 truncate">{title}</div>
      <div>{duration}</div>
    </div>
  )
}

export default SongItem
