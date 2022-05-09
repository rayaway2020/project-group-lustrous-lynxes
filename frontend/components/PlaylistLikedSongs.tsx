import { PlayIcon } from '@heroicons/react/solid'
import PlaylistLikedSongItem from './PlaylistLikedSongItem'
import { useEffect, useState } from 'react'
import PlaylistRow from './PlaylistRow'

const PlaylistLikedSongs = () => {
  const [playlist, setPlaylist] = useState<any | undefined>()

  useEffect(() => {
    fetch('http://localhost:3001/api/recommend')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element: any) => {
          if (element.title === 'Trending') {
            element.title = 'Favorite'
            setPlaylist(element)
          }
        })
      })
  }, [])


  return (
    <section className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-8 px-6">
      <div className="flex flex-row justify-between gap-6">
        <div className="flex h-80 w-1/3 flex-col justify-between rounded-3xl bg-sky-50 p-8 transition duration-300 hover:drop-shadow-xl">
          <div>Description</div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <b>My Favorite Songs</b>
              <div>100 Songs</div>
            </div>
            <PlayIcon className="h-12 w-12" />
          </div>
        </div>

        {/* Songs */}
        <div className="flex h-80 w-2/3 flex-row flex-wrap p-2">
          <PlaylistLikedSongItem
            title={'Just the title'}
            cover={
              'https://p2.music.126.net/0jbv7CBVqdqHAb1guLX_pg==/109951167156624589.jpg?param=512y512'
            }
            duration={'00:00'}
          />
        </div>
      </div>
      {playlist && (
        <PlaylistRow title={playlist.title} items={playlist.data.slice(0, 5)} />
      )}
    </section>
  )
}

export default PlaylistLikedSongs
