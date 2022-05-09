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
    <section className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
      <div className="flex flex-row justify-between gap-6">
        <div className="flex flex-col justify-between w-1/3 p-8 transition duration-300 h-80 rounded-3xl bg-sky-50 hover:drop-shadow-xl">
          <div>Description</div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <b>My Favorite Songs</b>
              <div>100 Songs</div>
            </div>
            <PlayIcon className="w-12 h-12" />
          </div>
        </div>

        {/* Songs */}
        <div className="flex flex-row flex-wrap w-2/3 p-2 h-80">
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
