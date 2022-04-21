import PlaylistCard from './PlaylistCard'

const PlaylistRow = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="text-2xl font-semibold">For You</div>
      <div className="grid grid-cols-5 gap-8">
        {[...Array(5)].map((_, i) => (
          <PlaylistCard key={i} />
        ))}
      </div>
    </div>
  )
}

export default PlaylistRow
