import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import PlaylistRow from '../components/PlaylistRow'

const Home: NextPage = () => {
  const [playlists, setPlaylists] = useState<any[] | undefined>()
  useEffect(() => {
    // using id to get from the backend database
    fetch('http://localhost:3001/api/recommend')
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data)
        console.log(data)
      })
  }, [])
  return (
    <>
      <div className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-8 px-6">
        {playlists?.map((playlist, i) => (
          <PlaylistRow
            key={i}
            title={playlist.title}
            items={playlist.data.slice(0, 5)}
            knowId={true}
          />
        ))}
      </div>
    </>
  )
}
export default Home
