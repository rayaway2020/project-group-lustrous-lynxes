import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import PlaylistRow from '../components/PlaylistRow'

const Home: NextPage = () => {
  const [playlists, setPlaylists] = useState<any[] | undefined>()
  useEffect(() => {
    //从数据库拉取，直接使用Id
    fetch('http://localhost:3001/api/recommend')
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data)
        console.log(data)
      })
  }, [])
  return (
    <>
      <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
        {playlists?.map((playlist, i) => (
          <PlaylistRow
            key={i}
            title={playlist.title}
            items={playlist.data.slice(0, 5)}
          />
        ))}
      </div>
    </>
  )
}
export default Home
