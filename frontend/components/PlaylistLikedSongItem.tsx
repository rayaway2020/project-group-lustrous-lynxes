type SongItemProps = {
    title: string
    cover: string
    duration: string
}

const PlaylistLikedSongItem = ({ title, cover, duration }: SongItemProps) => {
    return (
        <div className="flex flex-row items-start gap-3 hover:bg-sky-100 rounded-3xl p-4 w-72 h-20">
            <img
                src={cover ? cover : "https://p2.music.126.net/0jbv7CBVqdqHAb1guLX_pg==/109951167156624589.jpg?param=512y512"}
                alt={title ? title : "Song"}
                className="object-contain w-12 h-12 rounded aspect-square"
            />
            <div className="flex flex-col">
                <b>{title ? title : "Song"}</b>
                <div>{duration ? duration : "00:00"}</div>
            </div>
        </div>
    )
}

export default PlaylistLikedSongItem
