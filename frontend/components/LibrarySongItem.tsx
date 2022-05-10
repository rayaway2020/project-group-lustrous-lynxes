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
    <div className="flex flex-row items-start h-20 gap-3 p-4 transition duration-300 w-72 rounded-xl hover:bg-sky-50">
      <img
        src={cover}
        alt={title}
        className="object-contain w-12 h-12 rounded aspect-square"
      />
      <div className="flex flex-col">
        <b>{title}</b>
        <div>{`0:${minutes}:${seconds}`}</div>
      </div>
    </div>
  )
}

export default LibrarySongItem
