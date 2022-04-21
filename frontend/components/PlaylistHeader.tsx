import { PlayIcon } from '@heroicons/react/outline'

type PlayListHeaderProps = {
  cover: string
  title: string
  owner: string
  description: string
}

const PlayListHeader = ({
  cover,
  title,
  owner,
  description,
}: PlayListHeaderProps) => {
  return (
    <div className="flex flex-row w-full gap-8 p-12 bg-gray-100 h-80 rounded-2xl">
      <img
        src={cover}
        alt={title}
        className="object-contain h-full aspect-square rounded-2xl"
      />
      <div className="flex flex-col justify-between gap-2">
        <div className="text-3xl font-semibold truncate">{title}</div>
        <div className="flex flex-col">
          {/* owner? */}
          <span>Album by {owner}</span>
        </div>
        <div className="text-gray-600 line-clamp-3">{description}</div>
        <div className="flex flex-row gap-2 px-4 py-1 bg-white rounded w-min">
          <PlayIcon className="w-6 h-6" />
          <span>Play</span>
        </div>
      </div>
    </div>
  )
}

export default PlayListHeader
