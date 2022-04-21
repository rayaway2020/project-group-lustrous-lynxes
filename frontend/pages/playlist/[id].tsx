import type { NextPage } from 'next'
import SongItem from '../../components/SongItem'
import PlaylistHeader from '../../components/PlaylistHeader'
import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'

type singleSong = {
  videaId: string
  title: string
  cover: string
  duration: number
}

type info = {
  title: string
  cover: string
  owner: string
  description: string
}

const Playlist: NextPage = () => {
  const [playlist, setPlaylist] = useState<singleSong[]>([])
  const [playlistInfo, setPlaylistInfo] = useState<info>()
  const [currentSong, setCurrentSong] = useState<string>()

  useEffect(() => {
    fetch('/api/playlist')
      .then((res) => res.json())
      .then((res: any) => {
        setPlaylistInfo({
          title: res.title,
          cover: res.thumbnails[1].url, // use the medium size cover
          owner: res.owner,
          description: res.dateYear, // todo need a actual description
        })
        const list = res.content.map((song: any) => {
          return {
            videaId: song.videoId,
            title: song.name,
            cover:
              song.thumbnails.url ||
              'https://www.mariposakids.co.nz/wp-content/uploads/2014/08/image-placeholder2.jpg', // image placeholder
            duration: song.duration,
          }
        })
        setPlaylist(list)
      })
  }, [])

  const opts = {
    height: '200',
    width: '400',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
        {/* header section */}
        {/* todo need to add loading animation */}
        {playlistInfo ? <PlaylistHeader {...playlistInfo} /> : null}
        {/* playlist section */}
        {/* todo this bg color need to be updated */}
        <div className="flex flex-col gap-4 px-12 py-8 rounded-2xl bg-slate-50">
          {playlist.map((item, i) => (
            <SongItem
              key={i}
              index={i + 1}
              title={item.title}
              cover={item.cover}
              duration={item.duration}
              onClick={() => {
                setCurrentSong(item.videaId)
                console.log(item.videaId)
              }}
            />
          ))}
        </div>
        {/* only used for testing */}
        {currentSong ? (
          <YouTube
            videoId={currentSong}
            opts={opts}
            className="fixed right-12 top-16"
          />
        ) : null}
      </div>
    </>
  )
}
export default Playlist
