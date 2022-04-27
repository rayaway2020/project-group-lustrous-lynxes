import { Playlist, User } from "./schema.js";

async function createPlaylist(userId, playlist) {
    const dbPlaylist = await Playlist.create({
        title: playlist.title,
        songs: playlist.songs,
        owner: userId
    });

    const dbUser = await User.findById(userId);

    if (dbUser) {
        dbUser.createdPlaylists.push(dbPlaylist._id);
        await dbUser.save();
    }

    return dbPlaylist;
}

async function retrieveTrendingPlaylist() {
    return await Playlist.find().sort({ likes: -1 }).limit(5);
}

async function retrieveLatestPlaylist() {
    return await Playlist.find().sort({ createdDate: -1 }).limit(5);
}

async function retrievePlaylist(id) {
    return await Playlist.findById(id)
}

async function addToPlaylist(song, playlist) {
    const dbPlaylist = await Playlist.findById(playlist._id);

    if (dbPlaylist) {
        
        dbPlaylist.songs.push(song._id);
        dbPlaylist.save();

        return true;
    }

    return false;
}

async function deleteFromPlaylist(index, playlist) {
    const dbPlaylist = await Playlist.findById(playlist._id);

    if (dbPlaylist) {
        
        dbPlaylist.songs.splice(index, 1);
        dbPlaylist.save();

        return true;
    }

    return false; 
}

async function updatePlaylist(playlist) {
    const dbPlaylist = await Playlist.findById(playlist._id);

    if (dbPlaylist) {

        dbPlaylist.title = playlist.title;
        dbPlaylist.description = playlist.description;
        dbPlaylist.followers = playlist.followers;
        dbPlaylist.likes = playlist.likes;
        dbPlaylist.thumbnailUrl = playlist.thumbnailUrl;

        return true;
    }

    return false;
}

async function deletePlaylist(id) {
    await Playlist.deleteOne({ _id: id });
}

export {
    createPlaylist,
    retrievePlaylist,
    addToPlaylist,
    deleteFromPlaylist,
    retrieveTrendingPlaylist,
    retrieveLatestPlaylist,
    updatePlaylist,
    deletePlaylist
}