import {
  PlayIcon,
  HeartIcon as HeartIconOutlined,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useState } from 'react'

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
  const userId = '627ce8e7a27332aa9d3e8d77'

  return (
    <div className="flex flex-row w-full gap-8 p-12 bg-gray-100 h-80 rounded-2xl">
      <img
        src={cover}
        alt={title}
        className="object-contain h-full aspect-square rounded-2xl"
      />
      <div className="flex flex-col justify-between flex-1 w-0 gap-2">
        <div className="w-full text-3xl font-semibold truncate">{title}</div>
        <div className="flex flex-col w-full">
          <span>Album by {owner}</span>
        </div>
        <div className="w-full text-gray-600 line-clamp-3">{description}</div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex flex-row gap-2 px-4 py-1 bg-white rounded w-min">
            <PlayIcon className="w-6 h-6" />
            <span>Play</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavouriteHeader
