type SongItemProps = {
  index: number
  title: string
  cover: string
  duration: number
  onClick: () => void
}

const SongItem = ({
  index,
  title,
  cover,
  duration,
  onClick,
}: SongItemProps) => {
  const mind = duration % (60 * 60)
  const minutes = Math.floor(mind / 60)
  const seconds = Math.ceil(mind % 60)
  return (
    <div className="flex flex-row items-center gap-6" onClick={() => onClick()}>
      <div className="w-8 text-gray-600">
        {index > 10 ? index : `0${index}`}
      </div>
      <img
        src={cover}
        alt={title}
        className="object-cover w-12 h-12 rounded aspect-square"
      />
      <div className="flex-1 truncate">{title}</div>
      <div>{`${minutes}:${seconds}`}</div>
    </div>
  )
}

export default SongItem
