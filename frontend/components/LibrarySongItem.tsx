type SongItemProps = {
  title: string
  cover: string
  duration: number
}

const LibrarySongItem = ({ title, cover, duration }: SongItemProps) => {
  const mind = duration % (60 * 60)
  const minutes = Math.floor(mind / 60)
  const seconds = Math.ceil(mind % 60)

  return (
    <div className="flex h-20 w-72 flex-row items-start gap-3 rounded-xl p-4 transition duration-300 hover:bg-sky-50">
      <img
        src={cover}
        alt={title}
        className="aspect-square h-12 w-12 rounded object-contain"
      />
      <div className="flex flex-col">
        <b>{title}</b>
        <div>{`0:${minutes}:${seconds}`}</div>
      </div>
    </div>
  )
}

export default LibrarySongItem
