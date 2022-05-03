import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: String,
    thumbnailUrl: String,
    createdDate: { type: Date, default: Date.now },
    likedSongs: [{ type: String, ref: 'Song' }],
    likedPlaylists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    createdComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdPlaylists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
});

export const User = mongoose.model('User', userSchema);

const songSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    artist: String,
    duration: Number,
    thumbnailUrl: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Song = mongoose.model('Song', songSchema);

const playlistThumbnail =
    'https://pro2-bar-s3-cdn-cf4.myportfolio.com/dbea3cc43adf643e2aac2f1cbb9ed2f0/f14d6fc4-2cea-41a2-9724-a7e5dff027e8_rw_600.jpg?h=99cbed677113851ef5b0af352fa8a5b1';

const playlistSchema = new Schema({
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    description: String,
    followers: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    thumbnailUrl: { type: String, default: playlistThumbnail },
    songs: [{ type: String, ref: 'Song' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Playlist = mongoose.model('Playlist', playlistSchema);

const commentSchema = new Schema({
    text: { type: String, required: true },
    likes: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('Comment', commentSchema);
