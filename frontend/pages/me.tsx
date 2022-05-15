import { PlayIcon, PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { userContext } from '../components/Layout'
import { useContext, useState, useEffect } from 'react'
import LibrarySongItem from '../components/LibrarySongItem'
import PlaylistRow from '../components/PlaylistRow'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const me: NextPage = () => {
  const router = useRouter()
  const { userInfo, setUserInfo } = useContext(userContext)

  const [favoritePlaylist, setFavoritePlaylist] = useState<any | undefined>()
  const [createdPlaylist, setCreatedPlaylist] = useState<any | undefined>()
  const [likedSongs, setLikedSongs] = useState<any | undefined>()

  const [newPlaylist, setNewPlaylist] = useState('')
  const [desc, setDesc] = useState('')
  const [isListNameError, setIsListNameError] = useState(false)
  const [listNameError, setListNameError] = useState('')

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setIsListNameError(false)
    setListNameError('')
    setNewPlaylist('')
    setDesc('')
    setOpen(false)
  }
  const handleSave = () => {
    if (newPlaylist == '') {
      setIsListNameError(true)
      setListNameError('Playlist name is required')
    } else {
      createPlaylist()
      handleClose()
    }
  }

  useEffect(() => {
    userInfo.token
      ? axios
          .get('http://localhost:3001/api/playlists/user/info', {
            params: {
              userId: userInfo.id,
            },
          })
          .then((res) => {
            setCreatedPlaylist(res.data.ownedPlaylist)
            setFavoritePlaylist(res.data.favoriteList)
            setLikedSongs(res.data.likedSongs)
          })
      : router.push('/')
  }, [])

  const createPlaylist = () => {
    axios
      .post(
        'http://localhost:3001/api/playlists',
        {
          userId: userInfo.id,
          title: newPlaylist,
          description: desc,
          author: userInfo.username,
        },
        {
          headers: {
            'auth-token': userInfo.token,
          },
        }
      )
      .then((res) => {
        setUserInfo({
          ...userInfo,
          createdPlaylist: userInfo.createdPlaylist.push(res.data._id),
        })
        setCreatedPlaylist([...createdPlaylist, res.data])
        setNewPlaylist('')
        setDesc('')
      })
  }

  return (
    <>
      {userInfo.token && (
        <section className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-12 px-6">
          <div className="flex flex-row items-center gap-2">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={
                userInfo.username
                  ? `https://stamp.fyi/avatar/${userInfo.username}`
                  : 'https://stamp.fyi/avatar/hello'
              }
            />
            <h1 className="text-3xl font-bold">
              {userInfo.username}'s Library
            </h1>
          </div>

          <div className="flex flex-row justify-between gap-6">
            {/* cover of favorite song */}
            <div
              className="flex h-80 w-1/3 cursor-pointer flex-col justify-between rounded-3xl bg-sky-50 p-8 transition duration-300 hover:drop-shadow-xl"
              onClick={() => {
                router.push('/favourites')
              }}
            >
              <div>Description</div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <b>My Favorite Songs</b>
                  <div>{likedSongs?.length} Songs</div>
                </div>
                <PlayIcon className="h-12 w-12" />
              </div>
            </div>

            {/* Songs */}
            <div className="flex h-80 w-2/3 flex-row flex-wrap p-2">
              {likedSongs?.map((item: any, i: number) => (
                <LibrarySongItem
                  key={i}
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
            items={createdPlaylist}
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
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Create
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    paddingTop: '32px',
                    paddingBottom: '16px',
                    textAlign: 'center',
                  }}
                >
                  Create your own lists
                </DialogTitle>
                <DialogContent sx={{ width: '70%', margin: 'auto' }}>
                  <DialogContentText>
                    To cutomized your own list, please enter a name and
                    description for this list.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    error={isListNameError}
                    margin="dense"
                    id="name"
                    label="Playlist name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(e: any) => setNewPlaylist(e.target.value)}
                    helperText={listNameError}
                    value={newPlaylist}
                    required
                  />
                  <TextField
                    margin="normal"
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    onChange={(e: any) => setDesc(e.target.value)}
                    variant="outlined"
                    value={desc}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSave}>Create</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default me
