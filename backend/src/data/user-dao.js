import { Playlist, User } from './schema.js';

async function retrieveUser(id) {
    return await User.findById(id);
}

async function createUser(user) {

    const dbUser = new User(user);
    await dbUser.save();
    
    return dbUser;
}

async function addLikedSong(userId, songId) {

    const dbUser = await User.findById(userId);

    if (dbUser) {

        dbUser.likedSongs.push(songId);
        await dbUser.save();

        return true;
    }

    return false;
}

async function removeLikedSong(userId, index) {

    const dbUser = await User.findById(userId);

    if (dbUser) {
        dbUser.likedSongs.splice(index, 1);
        await dbUser.save();
        
        return true;
    }

    return false;
}


async function addLikedPlaylist(userId, playlistId) {

    const dbUser = await User.findById(userId);
    const dbPlaylist = await Playlist.findById(playlistId);

    if (dbUser && dbPlaylist) {

        dbUser.likedPlaylists.push(playlistId);
        await dbUser.save();

        dbPlaylist.likes += 1;
        await dbPlaylist.save();

        return true;
    }

    return false;
}

async function removeLikedPlaylist(userId, playlistId) {

    const dbUser = await User.findById(userId);
    const dbPlaylist = await Playlist.findById(playlistId);

    if (dbUser && dbPlaylist) {
        

        const deletedPlaylist = dbUser.likedPlaylists.filter(id => (id != playlistId));
        dbUser.likedPlaylists = deletedPlaylist;

        await dbUser.save();

        dbPlaylist.likes -= 1;
        await dbPlaylist.save();

        return true;
    }

    return false;
}

async function updateUser(user) {

    const dbUser = await User.findById(user._id);

    if (dbUser) {

        dbUser.username = user.username;
        dbUser.email = user.email;
        dbUser.password = user.password;
        dbUser.bio = user.bio;
        dbUser.thumbnailUrl = user.thumbnailUrl;
        dbUser.createdDate = user.createdDate;
        dbUser.likedSongs = user.likedSongs;
        dbUser.likedPlaylists = user.likedPlaylists;
        dbUser.createdComments = user.createdComments;
        dbUser.createdPlaylists = user.createdPlaylists;

        await dbUser.save();
        
        return true;
    }
}

export {
    retrieveUser,
    createUser,
    addLikedSong,
    removeLikedSong,
    addLikedPlaylist,
    removeLikedPlaylist,
    updateUser
}