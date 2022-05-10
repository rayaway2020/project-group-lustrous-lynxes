import { PlayIcon, PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import LibrarySongItem from '../components/LibrarySongItem'
import PlaylistRow from '../components/PlaylistRow'

const me: NextPage = () => {
  const [favoritePlaylist, setFavoritePlaylist] = useState<any | undefined>()
  const [createdPlaylists, setCreatedPlaylists] = useState<any | undefined>()
  const [likedSongs, setLikedSongs] = useState<any | undefined>()

  const [newPlaylist, setNewPlaylist] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/api/playlists/user/info", { params: {
      userId: "627a76a742738d8f093d6fdc"
    }}).then(res => {
      setCreatedPlaylists(res.data.ownedPlaylist);
      setFavoritePlaylist(res.data.favoritePlaylist);
      setLikedSongs(res.data.likedSongs);
    });
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
            placeholder="Playlist name"
            className="w-full my-4 input input-bordered"
            value={newPlaylist}
            onChange={(e) => {
              setNewPlaylist(e.target.value)
            }}
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full mb-4 input input-bordered"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value)
            }}
          />

          <div className="flex flex-row items-center justify-center">
            <div
              className="px-4 py-2 rounded cursor-pointer bg-sky-100 hover:bg-slate-50"
              onClick={() => {
                axios.post("http://localhost:3001/api/playlists", {
                  userId: "627a76a742738d8f093d6fdc",
                  title: newPlaylist,
                  description: desc,
                  author: "default_username"
                }, {
                  headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc4ZWRiZDEzYjBiNTJmMTBkMzdmYzUiLCJpYXQiOjE2NTIwOTI0ODN9.ED_bdG5fEK36_VgzrIHkdgo80la3sRPyrG5Z0toA5mA"
                  }
                }).then(res => {
                  setCreatedPlaylists(res.data.ownedPlaylist);
                  setNewPlaylist("");
                  setDesc("");
                })
                
              }}
            >
              Save
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col w-full max-w-screen-xl gap-12 px-6 mx-auto my-24">
        <div className="flex flex-row items-center gap-2">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://api.lorem.space/image/face?hash=47449"
          />
          <h1 className="text-3xl font-bold">Username's Library</h1>
        </div>

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
            {likedSongs?.map((item: any, i: number) => (
              <LibrarySongItem
                title={item.title}
                cover={item.cover}
                duration={item.duration}
              />
            ))}
          </div>
        </div>

        {/* Created playlist */}
        <PlaylistRow
          title="Created"
          items={createdPlaylists}
        />

         {/* Favorite playlist */}
         <PlaylistRow
          title="Favorite"
          items={favoritePlaylist}
        />

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
