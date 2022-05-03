import { Playlist, Song } from './schema.js';

async function createSong(song) {
    const dbSong = await Song.create(song);
    return dbSong;
}

async function retrieveSong(id) {
    return await Song.findById(id);
}

async function retrieveSongList(playlistId) {
    const dbPlaylist = await Playlist.findById(playlistId);

    const idList = dbPlaylist.songs;

    return await Song.find({ _id: { $in: idList } });
}

export { createSong, retrieveSong, retrieveSongList };
