import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Divider, ListItem, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import { userContext, playbarContext } from './Layout'
import axios from 'axios'

type SongItemProps = {
  id: string
  index: number
  title: string
  cover: string
  duration: number
  onClick: () => void
}

const SongItem = ({
  id,
  index,
  title,
  cover,
  duration,
  onClick,
}: SongItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [dropdown, setDropdown] = useState([{title: "", id: ""}])
  const { playlist, currentSong } = useContext(playbarContext)

  const { userInfo } = useContext(userContext)


  const open = Boolean(anchorEl)
  
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => { 
    setSelectedIndex(index)
    setAnchorEl(null)
    axios.put("http://localhost:3001/api/playlists/addsong", {
      songId: playlist?.[currentSong].videoId,
      playlistId: dropdown[index].id
    }).then((res) => {
      res.status === 200 ? alert("Successfully added!") : null;
      res.status === 201 ? alert("Existing song in the playlist"): null;
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
      className="flex flex-row items-center gap-6 cursor-pointer"
      onClick={() => onClick()}
    >
      <div className="w-8 text-gray-600">{index > 9 ? index : `0${index}`}</div>
      <img
        src={cover}
        alt={title}
        className="object-cover w-8 h-8 rounded aspect-square"
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
            userInfo.token ? 
            //Get Dropdown Options
          axios.get("http://localhost:3001/api/playlists/user/created", { params: {
            userId: userInfo.id
          }}).then(res => {
            const data = res.data.map((item: any) => ({
              title: item.title,
              id: item._id
            }))
            setDropdown(data);
          }
          )
            : alert("Log in to see your playlists")

          }}
        >
          <DotsHorizontalIcon className="w-6 h-6" />
        </ListItem>
        {userInfo.token? 
        <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <MenuItem
          selected={selectedIndex === 0}
          onClick={(event: any) => handleMenuItemClick(event, 0)}
        >
          {'Choose the playlist'}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        {/* Dropdown options */}
        {dropdown?.map((option: any, index: number) => (
          <MenuItem
            key={index+1}
            onClick={(event: any) => handleMenuItemClick(event, index)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
      :
      null}
        
      </div>
    </div>
  )
}

export default SongItem
