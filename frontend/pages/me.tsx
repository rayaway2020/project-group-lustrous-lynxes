import { PlayIcon, PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import type { NextPage } from 'next'
import router from 'next/router'
import { useState, useEffect } from 'react'
import LibrarySongItem from '../components/LibrarySongItem'
import PlaylistRow from '../components/PlaylistRow'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const me: NextPage = () => {
  const [favoritePlaylist, setFavoritePlaylist] = useState<any | undefined>()
  const [createdPlaylists, setCreatedPlaylists] = useState<any | undefined>()
  const [likedSongs, setLikedSongs] = useState<any | undefined>()

  const [newPlaylist, setNewPlaylist] = useState('')
  const [desc, setDesc] = useState('')
  const [isListNameError, setIsListNameError] = useState(false)
  const [listNameError, setListNameError] = useState('')

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsListNameError(false)
    setListNameError('')
    setNewPlaylist('')
    setDesc('')
    setOpen(false);
  };
  const handleSave = () => {
    if(newPlaylist == ''){
      setIsListNameError(true)
      setListNameError('Playlist name is required')
    }else{
      createPlaylist()
      handleClose()
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/playlists/user/info", { params: {
      userId: "627ce8e7a27332aa9d3e8d77"
    }}).then(res => {
      console.log(res.data)
      setCreatedPlaylists(res.data.ownedPlaylist);
      setFavoritePlaylist(res.data.favoriteList);
      setLikedSongs(res.data.likedSongs);
    });
  }, [])

  const createPlaylist = () => {
    axios
      .post(
        'http://localhost:3001/api/playlists',
        {
          userId: '627a76a742738d8f093d6fdc',
          title: newPlaylist,
          description: desc,
          author: 'default_username',
        },
        {
          headers: {
            'auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc4ZWRiZDEzYjBiNTJmMTBkMzdmYzUiLCJpYXQiOjE2NTIwOTI0ODN9.ED_bdG5fEK36_VgzrIHkdgo80la3sRPyrG5Z0toA5mA',
          },
        }
      )
      .then((res) => {
        setCreatedPlaylists(res.data.ownedPlaylist)
        setNewPlaylist('')
        setDesc('')
      })
  }

  return (
    <>
      {/* <input type="checkbox" id="playlist-create" className="modal-toggle" />
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
                  userId: "627ce8e7a27332aa9d3e8d77",
                  title: newPlaylist,
                  description: desc,
                  author: "default_username"
                }, {
                  headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiNDA0NGZiYWIzNWFkZmQ1MzRkNzciLCJpYXQiOjE2NTIyNDUyMTN9.08SvFVUJsx_-HEJtmVfRHBBt2c68frJEWFAxDQDHu3o"
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
      </div> */}

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
                <div>{likedSongs?.length} Songs</div>
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
          title="Created Playlists"
          items={createdPlaylists}
          knowId={true}
        />

         {/* Favorite playlist */}
         <PlaylistRow
          title="Favorite Playlists"
          items={favoritePlaylist}
          knowId={true}
        />

        {/* button for create new playlist */}
        <div className="flex flex-row items-center justify-center">
          {/* <label htmlFor="playlist-create">
            <div className="flex flex-row items-center justify-around px-4 py-2 my-8 rounded cursor-pointer bg-sky-100 hover:bg-slate-50">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create
            </div>
          </label> */}
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Create
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create my own list</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To cutomized your own list, please enter the name and description for this list.
                </DialogContentText>
                <TextField
                  autoFocus
                  error={isListNameError}
                  margin="dense"
                  id="name"
                  label="Playlist name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setNewPlaylist(e.target.value)}
                  helperText={listNameError}
                  value={newPlaylist}
                  
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  onChange={(e) => setDesc(e.target.value)}
                  variant="standard"
                  value={desc}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </section>
    </>
  )
}

export default me
