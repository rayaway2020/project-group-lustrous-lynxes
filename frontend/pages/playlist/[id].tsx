import type { NextPage } from 'next'
import SongItem from '../../components/SongItem'
import PlaylistHeader from '../../components/PlaylistHeader'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { playbarContext } from '../../components/Layout'
import axios from 'axios'
import { UserAddIcon } from '@heroicons/react/outline'

const Playlist: NextPage = () => {
  const router = useRouter()
  const [info, setInfo] = useState<
    | {
        title: string
        cover: string
        owner: string
        like: boolean
        description: string
        id: string
      }
    | undefined
  >()
  const [songs, setSongs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentSong, setPlaying } = useContext(playbarContext)

  // API分辨是Id还是browserId
  useEffect(() => {
    axios.get("http://localhost:3001/api/playlists/network/", {
      params: {
        id: router.query.id,
        userId: "627b4044fbab35adfd534d77"
      }
    }).then((res) => {
      const data = res.data;
      setSongs(data.playlist.content)
      const tem: {
        title: string
        cover: string
        owner: string
        like: boolean
        description: string
        id: string
      } = data.isUser? {
        title: data.playlist.title,
        cover: data.playlist.thumbnail,
        owner: data.playlist.author,
        like: data.like,
        description: data.playlist.description,
        id: data.playlist._id
      }
      : {
        title: data.playlist.title,
        cover: data.playlist.thumbnails?.[0].url,
        owner: data.playlist.owner,
        like: data.like,
        description: data.playlist.dateYear,
        id: data.id
      }
      setInfo(tem)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
          {/* header section */}
          {info && <PlaylistHeader {...info} />}
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
                  setCurrentSong(item)
                  setPlaying(true)
                  axios.post('http://localhost:3001/api/songs/', {
                    id: item.videoId,
                    title: item.name,
                    cover: item.thumbnails.url || info?.cover,
                    duration:item.duration
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
export default Playlist
