import mongoose from 'mongoose';
import { User, Song, Playlist, Comment } from './schema.js';
import { playlistData } from './recommend-data.js'

main();

async function main() {
    const CONNECTION_URL = "mongodb+srv://admin0:UUYVpH6WbZ7iwx4@cluster0.1buxm.mongodb.net/lustrous-lynxes?retryWrites=true&w=majority";

    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
    });

    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    await init_playlist();

    mongoose.disconnect();

    console.log('Disconnected from database!');
}

async function clearDatabase() {
    await User.deleteMany({});
    await Playlist.deleteMany({});
    await Song.deleteMany({});
    await Comment.deleteMany({});
}

async function init_playlist() {
    await Playlist.create(playlistData);
}
