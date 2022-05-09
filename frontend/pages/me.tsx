import { PlayIcon, PlusIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import PlaylistLikedSongItem from '../components/PlaylistLikedSongItem'
import PlaylistRow from '../components/PlaylistRow'

const me: NextPage = () => {
  const [playlist, setPlaylist] = useState<any | undefined>()
  const [newPlaylist, setNewPlaylist] = useState('')

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
    <>
      <input type="checkbox" id="playlist-create" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor="playlist-create"
            className="absolute btn btn-circle btn-sm right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Please input the name of your playlist
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="w-full my-4 input input-bordered"
            onChange={(e) => {
              setNewPlaylist(e.target.value)
            }}
          />
          <div className="flex flex-row items-center justify-center">
            <div
              className="px-4 py-2 rounded cursor-pointer bg-sky-100 hover:bg-slate-50"
              onClick={() => {
                console.log(newPlaylist)
              }}
            >
              Save
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-full max-w-screen-xl gap-12 px-6 mx-auto my-24">
        <div className="flex flex-row justify-between gap-6">
          {/* cover of favorite song */}
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
        {/* other favorite playlist */}
        {playlist && (
          <PlaylistRow
            title={playlist.title}
            items={playlist.data.slice(0, 5)}
          />
        )}

        {/* button for create new playlist */}
        <div className="flex flex-row items-center justify-center">
          <label htmlFor="playlist-create">
            <div className="flex flex-row items-center justify-around px-4 py-2 my-8 rounded cursor-pointer bg-sky-100 hover:bg-slate-50">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create
            </div>
          </label>
        </div>
      </section>
    </>
  )
}

export default me
