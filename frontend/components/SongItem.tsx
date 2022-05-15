import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Divider, ListItem, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import { userContext, playbarContext } from './Layout'
import axios from 'axios'

type SongItemProps = {
  videoId: string
  index: number
  title: string
  cover: string
  duration: number
  onClick: () => void
}

const SongItem = ({
  videoId,
  index,
  title,
  cover,
  duration,
  onClick,
}: SongItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [dropdown, setDropdown] = useState([{ title: '', id: '' }])
  const { playlist, currentSong } = useContext(playbarContext)

  const { userInfo } = useContext(userContext)

  const open = Boolean(anchorEl)

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    number: number
  ) => {
    setSelectedIndex(number)
    setAnchorEl(null)
    axios
      .put('http://localhost:3001/api/playlists/addsong', {
        songId: videoId,
        playlistId: dropdown[number].id,
      })
      .then((res) => {
        res.status === 200 ? alert('Successfully added!') : null
        res.status === 201 ? alert('Existing song in the playlist') : null
      })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const mind = duration / 1000
  const minutes = Math.floor(mind / 60)
  const seconds = Math.ceil(mind % 60) - 1
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-6"
      onClick={() => onClick()}
    >
      <div className="w-8 text-gray-600">{index > 9 ? index : `0${index}`}</div>
      <img
        src={cover}
        alt={title}
        className="aspect-square h-8 w-8 rounded object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src =
            'https://pro2-bar-s3-cdn-cf4.myportfolio.com/dbea3cc43adf643e2aac2f1cbb9ed2f0/f14d6fc4-2cea-41a2-9724-a7e5dff027e8_rw_600.jpg?h=99cbed677113851ef5b0af352fa8a5b1'
        }}
      />
      <div className="flex-1 truncate">{title}</div>
      <div>{`${minutes}:${seconds}`}</div>
      <div>
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()
            setAnchorEl(event.currentTarget)
            userInfo.token
              ? //Get Dropdown Options
                axios
                  .get('http://localhost:3001/api/playlists/user/created', {
                    params: {
                      userId: userInfo.id,
                    },
                  })
                  .then((res) => {
                    const data = res.data.map((item: any) => ({
                      title: item.title,
                      id: item._id,
                    }))
                    setDropdown(data)
                  })
              : alert('Log in to see your playlists')
          }}
        >
          <DotsHorizontalIcon className="h-6 w-6" />
        </ListItem>

        {userInfo.token ? (
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
            sx={
              {
                // backgroundColor: 'rgba(255, 99, 71, 1.0)',
              }
            }
          >
            <MenuItem
              selected={selectedIndex === 0}
              onClick={(event: any) => handleMenuItemClick(event, 0)}
              disabled
              sx={{
                color: 'rgba(0,0,0, 1)',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'poppins',
                paddingLeft: '32px',
                paddingRight: '32px',
                paddingTop: '16px',
                paddingBottom: '16px',
              }}
            >
              {'Add this song to your playlist'}
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            {/* Dropdown options */}
            {dropdown?.map((option: any, index: number) => (
              <MenuItem
                key={index}
                onClick={(event: any) => handleMenuItemClick(event, index)}
                sx={{
                  paddingLeft: '32px',
                  color: 'rgba(0, 0, 0, 1)',
                  backgroundColor: 'rgba(255, 255, 255, 1.0)',
                  fontFamily: 'Poppins',
                }}
              >
                {option.title}
              </MenuItem>
            ))}
          </Menu>
        ) : null}
      </div>
    </div>
  )
}

export default SongItem
