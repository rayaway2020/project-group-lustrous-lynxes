import type { NextPage } from 'next'
import SongItem from '../../components/SongItem'
import PlaylistHeader from '../../components/PlaylistHeader'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { playbarContext } from '../../components/Layout'
import axios from 'axios'

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
  const [songs, setSongs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentSong, setPlaying, setPlaylist } = useContext(playbarContext)

  useEffect(() => {
    if (router.query.id) {
      axios
        .get('http://localhost:3001/api/playlists/network/', {
          params: {
            id: router.query.id,
          },
        })
        .then((res) => {
          const data = res.data
          //Get playlist header info
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
                owner: data.playlist.owner,
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
          
          console.log(data.playlist.content);
          //Set songs
          const playlistSongs: any = !data.isUser
            ? data.playlist.content?.map((item: any) => ({
              videoId: item.videoId,
              title: item.name,
              thumbnails: Array.isArray(item.thumbnails)
              ? item.thumbnails[item.thumbnails.length - 1].url
              : item.thumbnails
              ? item.thumbnails.url
              : 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif',
              duration: item.duration
            }))
            : data.playlist.content
          setSongs(playlistSongs)

          setIsLoading(false)
        })
    }
  }, [router.query.id])

  return (
    <>
      {!isLoading && (
        <div className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-8 px-6">
          {/* header section */}
          {info && (
            <PlaylistHeader
              {...info}
              play={() => {
                setPlaylist(songs)
                setCurrentSong(0)
                setPlaying(true)
              }}
            />
          )}
          {/* playlist section */}
          <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 px-12 py-8">
            {songs?.map((item: any, i: number) => (
              <SongItem
                key={i}
                index={i + 1}
                videoId={item.videoId}
                title={item.title}
                cover={item.thumbnails}
                duration={item.duration}
                onClick={() => {
                  setPlaylist(songs)
                  setCurrentSong(i)
                  setPlaying(true)

                  if (item.videoId) {
                    axios.post('http://localhost:3001/api/songs/', {
                      id: item.videoId,
                      title: item.title,
                      cover: item.thumbnails,
                      duration: item.duration,
                    })
                  }
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
