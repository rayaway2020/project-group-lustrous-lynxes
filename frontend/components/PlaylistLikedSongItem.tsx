type SongItemProps = {
  title: string
  cover: string
  duration: string
}

const PlaylistLikedSongItem = ({ title, cover, duration }: SongItemProps) => {
  return (
    <div className="flex h-20 w-72 flex-row items-start gap-3 rounded-xl p-4 transition duration-300 hover:bg-sky-50 hover:drop-shadow-md">
      <img
        src={cover}
        alt={title}
        className="aspect-square h-12 w-12 rounded object-contain"
      />
      <div className="flex flex-col">
        <b>{title}</b>
        <div>{duration}</div>
      </div>
    </div>
  )
}

export default PlaylistLikedSongItem
