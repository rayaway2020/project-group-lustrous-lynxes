import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: String,
    content: String,
    createdDate: { type: Date, default: Date.now }
})

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        min: 6,
        max: 255
     },
    email: { 
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    ownedPlaylist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    likedPlaylist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    likedSongs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
})
export const User = mongoose.model('User', userSchema);

const songSchema = new Schema({
    _id: { type: String, required: true },
    comments: commentSchema
})
export const Song = mongoose.model('Song', songSchema);

const playlistSchema = new Schema({
    browseId: { type: String, default: "" },
    title: { type: String, required: true },
    thumbnail: { type: String, default: "https://pro2-bar-s3-cdn-cf4.myportfolio.com/dbea3cc43adf643e2aac2f1cbb9ed2f0/f14d6fc4-2cea-41a2-9724-a7e5dff027e8_rw_600.jpg?h=99cbed677113851ef5b0af352fa8a5b1" },
    author: String,
    description: String,
    likes: Number,
    songList: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
})
export const Playlist = mongoose.model('Playlist', playlistSchema);



