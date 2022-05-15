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
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-6">
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <img
            src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
            alt="loading"
            className="h-12 w-12"
          />
        </div>
      ) : (
        <div className="py-24">
          {playlists && (
            <PlaylistRow title={'Playlist:'} items={playlists} knowId={true} />
          )}
          {songs && <SonglistRow title={'Song:'} items={songs} />}
        </div>
      )}
    </div>
  )
}

export default SearchResult
