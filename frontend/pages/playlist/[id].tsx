import type { NextPage } from 'next'
import Header from '../../components/Header'
import Playbar from '../../components/Playbar'
import SongItem from '../../components/SongItem'
import PlaylistHeader from '../../components/PlaylistHeader'
import { getPlayList, getPlayListInfo } from '../../mock/playlist'

const Playlist: NextPage = () => {
  const songs = getPlayList()
  const info = getPlayListInfo()
  return (
    <>
      <Header />
      <div className="flex flex-col w-full max-w-screen-xl gap-8 px-6 mx-auto my-24">
        {/* header section */}
        <PlaylistHeader {...info} />
        {/* playlist section */}
        {/* todo this bg color need to be updated */}
        <div className="flex flex-col gap-4 px-12 py-8 rounded-2xl bg-slate-50">
          {songs.map((item, i) => (
            <SongItem
              key={i}
              index={i + 1}
              title={item.title}
              cover={item.cover}
              duration={item.duration}
            />
          ))}
        </div>
      </div>
      <Playbar />
    </>
  )
}
export default Playlist
