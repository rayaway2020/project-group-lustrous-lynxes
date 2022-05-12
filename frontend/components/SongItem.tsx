import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Divider, ListItem, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const playlists = [
  'Add to the playlist 1',
  'Add to the playlist 2',
  'Add to the playlist 3',
]

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
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index)
    setAnchorEl(null)
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
          onClick={handleClickListItem}
        >
          <DotsHorizontalIcon className="w-6 h-6" />
        </ListItem>
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
            {'Like this song'}
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          {playlists.map((option, index) => (
            <MenuItem
              key={option}
              selected={index + 1 === selectedIndex}
              onClick={(event: any) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default SongItem
