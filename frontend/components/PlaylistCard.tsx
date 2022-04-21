import Cover from './Cover'

const PlaylistCard = () => {
  return (
    <div className="flex flex-col">
      <Cover />
      <div className="mt-2 text-lg font-semibold">Heartbreak Pop</div>
      <div className="opacity-75 ">by Apple Music</div>
    </div>
  )
}

export default PlaylistCard
