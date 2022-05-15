import axios from 'axios'
import { info } from 'console'
import { useContext } from 'react'
import { playbarContext } from './Layout'
import SongItem from './SongItem'

interface SonglistRowProps {
  title: string
  items: any[]
}

const SonglistRow = ({ title, items }: SonglistRowProps) => {
  const { setCurrentSong, setPlaying, setPlaylist } = useContext(playbarContext)
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex flex-col gap-4">
        {items?.map((item, i) => (
          <SongItem
            key={i}
            index={i + 1}
            cover={item.thumbnail}
            title={item.title}
            duration={item.duration}
            onClick={() => {
              setPlaylist(items)
              setCurrentSong(i)
              setPlaying(true)

              if (item?.videoId) {
                axios.post('http://localhost:3001/api/songs/', {
                  id: item.videoId,
                  title: item.name,
                  cover: item.thumbnail,
                  duration: item.duration,
                })
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default SonglistRow
