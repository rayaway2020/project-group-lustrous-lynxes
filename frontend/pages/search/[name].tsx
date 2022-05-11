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
      Promise.all([
        fetch(
          `http://localhost:3001/api/search/playlists?search_query=${router.query.name}`
        ).then((res) => res.json()),
        fetch(
          `http://localhost:3001/api/search/songs?search_query=${router.query.name}`
        ).then((res) => res.json()),
      ]).then((value: any[]) => {
        console.log(value)
        // only show the first ten playlists or songs
        setPlaylists(value[0].slice(0, 10))
        setSongs(value[1].slice(0, 10))
        setIsLoading(false)
      })
    }
  }, [router.query.name])

  return (
    <>
      <div className="flex flex-col w-full h-screen max-w-screen-xl gap-8 px-6 py-24 mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
              alt="loading"
              className="w-12 h-12"
            />
          </div>
        ) : (
          <>
            {playlists && <PlaylistRow title={'Playlist:'} items={playlists} />}
            {songs && <SonglistRow title={'Song:'} items={songs} />}
          </>
        )}
      </div>
    </>
  )
}

export default SearchResult
