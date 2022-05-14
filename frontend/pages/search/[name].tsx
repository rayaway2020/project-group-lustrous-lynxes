import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PlaylistRow from '../../components/PlaylistRow'
import SonglistRow from '../../components/SonglistRow'

const SearchResult: NextPage = () => {
  const router = useRouter()
  const [playlists, setPlaylists] = useState<any[] | undefined>(undefined)
  const [songs, setSongs] = useState<any | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.query.name) {
      setIsLoading(true)
      axios
        .get('http://localhost:3001/api/search', {
          params: {
            search: router.query.name,
          },
        })
        .then((res) => {
          const data = res.data
          setSongs(data.songs)
          setPlaylists(data.playlists)
          setIsLoading(false)
        })
    }
  }, [router.query.name])

  return (
    <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <img
            src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
            alt="loading"
            className="w-12 h-12"
          />
        </div>
      ) : (
        <div className="py-24">
          {playlists && (
            <PlaylistRow title={'Playlist:'} items={playlists} knowId={false} />
          )}
          {songs && <SonglistRow title={'Song:'} items={songs} />}
        </div>
      )}
    </div>
  )
}

export default SearchResult
