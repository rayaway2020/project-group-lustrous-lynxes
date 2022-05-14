import type { NextPage } from 'next'
import SongItem from '../components/SongItem'
import { useContext, useEffect, useState } from 'react'
import { userContext, playbarContext } from '../components/Layout'
import axios from 'axios'
import FavouriteHeader from '../components/FavouritesHeader'

const Favourites: NextPage = () => {
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
  const { userInfo } = useContext(userContext)
  const [songs, setSongs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentSong, setPlaying, setPlaylist } = useContext(playbarContext)

  useEffect(() => {
    setInfo({   title: 'My favourite songs',
                cover: 'https://i.pinimg.com/736x/8d/64/e9/8d64e974c73f8cb168958407dc79eb17.jpg',
                owner: userInfo.username,
                description: 'This is all your favorite songs!',
                id: 'id'
            })
    axios.get("http://localhost:3001/api/songs/favorite", { params: {
      userId: userInfo.userId
    }}).then(res => {
      setSongs(res.data)
      setIsLoading(false)
    })
  }, [])

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
                title={item.title}
                cover={item.cover}
                duration={item.duration}
                onClick={() => {
                  setPlaylist(songs)
                  setCurrentSong(i)
                  setPlaying(true)
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
