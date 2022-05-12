import type { NextPage } from 'next'
import SongItem from '../components/SongItem'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { playbarContext } from '../components/Layout'
import axios from 'axios'
import FavouriteHeader from '../components/FavouritesHeader'

const Favourites: NextPage = () => {
  const router = useRouter()
  const [info, setInfo] = useState<
    | {
        title: string
        cover: string
        owner: string
        description: string
        id: string
      }
    | undefined
  >()
  const [songs, setSongs] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentSong, setPlaying, setPlaylist } = useContext(playbarContext)

  useEffect(() => {
    setInfo({   title: 'My favourite songs',
                cover: '',
                owner: 'My username',
                description: 'Mock description for my favourite list',
                id: 'clever thing'
            })
    }
  , [])

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
          {/* header section */}
          {info && <FavouriteHeader {...info} />}
          {/* playlist section */}
          {/* todo this bg color need to be updated */}
          <div className="flex flex-col gap-4 px-12 py-8 rounded-2xl bg-slate-50">
            {songs?.map((item: any, i: number) => (
              <SongItem
                key={i}
                index={i + 1}
                title={item.name}
                cover={item.thumbnails.url || info?.cover}
                duration={item.duration}
                id={item.videoId}
                onClick={() => {
                  if (!item.thumbnails.url) {
                    item.thumbnails.url = info?.cover
                  }
                  setPlaylist(songs)
                  setCurrentSong(i)
                  setPlaying(true)
                  axios.post('http://localhost:3001/api/songs/', {
                    id: item.videoId,
                    title: item.name,
                    cover: item.thumbnails.url || info?.cover,
                    duration: item.duration,
                  })
                  console.log(item.videoId)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default Favourites
