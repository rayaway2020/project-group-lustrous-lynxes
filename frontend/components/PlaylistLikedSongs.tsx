import {PlayIcon} from '@heroicons/react/solid'
import PlaylistLikedSongItem from './PlaylistLikedSongItem'
import PlaylistCard from './PlaylistCard'

const PlaylistLikedSongs = () => {
    return (
        <section className='flex flex-col gap-12'>
            <div className="flex flex-row justify-between gap-6">
                <div className="flex flex-col justify-between w-1/3 h-80 bg-sky-100 rounded-3xl p-8">
                    <div>Description</div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <b>My Favorite Songs</b>
                            <div>100 Songs</div>
                        </div>
                        <PlayIcon className="h-12 w-12" />
                    </div>
                </div>

                {/* Songs */}
                <div className="flex flex-row flex-wrap w-2/3 h-80 bg-zinc-300 rounded-3xl p-2">
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                    <PlaylistLikedSongItem />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <b>Favorite Albums</b>
                <div className='flex flex-row flex-wrap gap-4 w-full bg-zinc-300 p-8'>
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                </div>
            </div>
        </section>
    )
}

export default PlaylistLikedSongs