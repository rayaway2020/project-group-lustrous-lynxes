import { PlayIcon } from '@heroicons/react/outline'

type FavouriteHeaderProps = {
  cover: string
  title: string
  owner: string
  description: string
  id: string
}

const FavouriteHeader = ({
  cover,
  title,
  owner,
  description,
  id,
}: FavouriteHeaderProps) => {
  return (
    <div className="flex h-80 w-full flex-row gap-8 rounded-2xl bg-gray-100 p-12">
      <img
        src={cover}
        alt={title}
        className="aspect-square h-full rounded-2xl object-contain"
      />
      <div className="flex w-0 flex-1 flex-col justify-between gap-2">
        <div className="w-full truncate text-3xl font-semibold">{title}</div>
        <div className="flex w-full flex-col">
          <span>Album by {owner}</span>
        </div>
        <div className="w-full text-gray-600 line-clamp-3">{description}</div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex w-min flex-row gap-2 rounded bg-white px-4 py-1">
            <PlayIcon className="h-6 w-6" />
            <span>Play</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavouriteHeader
