import type { NextPage } from 'next'
import SongItem from '../../components/SongItem'
import PlaylistHeader from '../../components/PlaylistHeader'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userContext, playbarContext } from '../../components/Layout'
import axios from 'axios'
import { UserAddIcon } from '@heroicons/react/outline'


const Playlist: NextPage = () => {
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
  const { userInfo } = useContext(userContext)
  const [songs, setSongs] = useState<any>()
  const [options, setOptions] = useState([{title: "", id: ""}])
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentSong, setPlaying, setPlaylist } = useContext(playbarContext)

  // API分辨是Id还是browserId
  useEffect(() => {
    if (router.query.id) {
      axios
        .get('http://localhost:3001/api/playlists/network/', {
          params: {
            id: router.query.id,
            userId: userInfo.id,
          },
        })
        .then((res) => {
          const data = res.data
          const raw = data.playlist.content?.map(
            (item: { thumbnails: { url: string | undefined } }) => {
              if (!item.thumbnails.url) {
                item.thumbnails.url = info?.cover
              }
              return item
            }
          );
          setSongs(raw)
          const tem: {
            title: string
            cover: string
            owner: string
            description: string
            id: string
          } = data.isUser
            ? {
                title: data.playlist.title,
                cover: data.playlist.thumbnail,
                owner: data.playlist.author,
                description: data.playlist.description,
                id: data.playlist._id,
              }
            : {
                title: data.playlist.title,
                cover: data.playlist.thumbnails?.[0].url,
                owner: data.playlist.owner,
                description: data.playlist.dateYear,
                id: data.id,
              }
          setInfo(tem)
          axios.get("http://localhost:3001/api/playlists/user/created", { params: {
              userId: userInfo.id
            }}).then(res => {
              const data = res.data.map((item: any) => ({
                title: item.title,
                id: item._id
              }))
              setOptions(data);
            }
          ) 
          setIsLoading(false)
        })
    }
  }, [router.query.id])

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
          {/* header section */}
          {info && <PlaylistHeader {...info} />}
          {/* playlist section */}
          <div className="flex flex-col gap-4 px-12 py-8 rounded-2xl bg-slate-50">
            {songs?.map((item: any, i: number) => (
              <SongItem
                key={i}
                index={i + 1}
                title={item.name}
                cover={item.thumbnails.url || info?.cover}
                duration={item.duration}
                id={item.videoId}
                options={options}
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
