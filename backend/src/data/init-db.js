import mongoose from 'mongoose';
import { User, Song, Playlist, Comment } from './schema.js';
import { dummyData } from './dummy-data.js';
import { createPlaylist, retrieveTrendingPlaylist } from './playlist-dao.js';
import { addLikedSong, createUser, addLikedPlaylist } from './user-dao.js';
import { createComment } from './comment-dao.js';

// mongod --dbpath=/Users/yinqixia/data/db

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/MusicApp', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();

    await initialiseDatabase();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function clearDatabase() {
    await User.deleteMany({});
    await Playlist.deleteMany({});
    await Song.deleteMany({});
    await Comment.deleteMany({});
}

async function initialiseDatabase() {
    const admin0 = await createUser(new User({
        username: "admin0",
        email: "admin0@musicapp.com",
        password: "pwdadmin0"
    }));

    const admin1 = await createUser(new User({
        username: "admin1",
        email: "admin1@musicapp.com",
        password: "pwdadmin1"
    }));


    const songs = await Song.create(dummyData);


    const playlist1= await createPlaylist(admin0._id, new Playlist({
        title: "R&B Wave",
        songs: ["QMKG0KV452w", "HNibLPBq9Cw", "vgyn10eb1t0", "XZ868t23Pb4"]
    }))

    const playlist2 = await createPlaylist(admin1._id, new Playlist({
        title: "Mega Pop",
        songs: ["8B3Pz_2H6H8", "7GOFTXLSvMI", "OsfAnsMY21M", "KPM_BYl-EaQ", "QDQYVFQGkkw", "vy0O0okHiXs", "pHw5jgsE_pY", "51m9MBishWY", "qxrMpCMdYwk", "4EQkYVtE"]
    }))

    await createComment(admin0._id, "QMKG0KV452w", "This is amazing"); 
    
    await addLikedSong(admin1._id, songs[0]._id);

    await addLikedPlaylist(admin0._id, playlist2._id);

    await addLikedPlaylist(admin1._id, playlist2._id);
}