import express from 'express';
import verify from './verifyToken.js';
import getAPIInstance from '../../util/youtube.js';
import { User, Playlist, Song } from '../../db/schema.js';

const router = express.Router();

// Retrieve one playlist
router.get('/network', async (req, res) => {
    const unknownTypeId = req.query.id;
    const userId = req.query.userId;
    const info = {id: "", playlist: [], like: false, isUser: false }
    const utubePlaylist = await Playlist.findOne({ browseId: unknownTypeId})

    try {
        if (userId) {
            const dbUser = await User.findOne({ _id: userId});
            if (utubePlaylist) {
                info.id = utubePlaylist._id;
                const api = await getAPIInstance();
                info.playlist = await api.getPlaylist(unknownTypeId);
                console.log(dbUser);
                info.like = dbUser.likedPlaylist.includes(utubePlaylist._id);
            }
            else {
                const dbPlaylist = await Playlist.findOne({ _id: unknownTypeId})
                info.id = dbPlaylist._id;
                info.isUser = true;
                info.like = dbUser.likedPlaylist.includes(dbPlaylist._id);
            }
        } else {
            if (utubePlaylist) {
                info.id = utubePlaylist._id;
                const api = await getAPIInstance();
                info.playlist = await api.getPlaylist(unknownTypeId);
            } else {
                const dbPlaylist = await Playlist.findOne({ _id: unknownTypeId});
                info.id = dbPlaylist._id;
                info.isUser = true;
            }
        }
    } catch {
        err => res.json(err);
    }
    

    res.json(info);

});

router.get('/user/info', async(req, res) => {
    const userId = req.query.userId;
    const dbUser = await User.findById(userId);

    const result = {}

    const favoriteList = dbUser?.likedPlaylist;
    const ownedPlaylist = dbUser?.ownedPlaylist;
    const likedSongs = dbUser?.likedSongs;

    if (favoriteList) {
        const all_playlists = await Playlist.find({
            '_id': { $in: favoriteList }
        });

        result.favoriteList = all_playlists;
    }
    else {
        result.favoriteList = [];
    }

    if (ownedPlaylist) {
        const all_playlists = await Playlist.find({
            '_id': { $in: ownedPlaylist }
        });

        result.ownedPlaylist = all_playlists;
    }
    else {
        result.ownedPlaylist = [];
    }

    if (likedSongs) {
        const all_songs = await Song.find({
            '_id': { $in: likedSongs }
        });

        result.likedSongs = all_songs;
    }
    else {
        result.likedSongs = [];
    }

    res.json(result);

})

//Get all favorite playlist of a user
router.get('/user/favorite', async(req, res) => {
    const userId = req.query.userId;
    
    const dbUser = await User.findById(userId);
    const favoriteList = dbUser.likedPlaylist;

    if (favoriteList.length > 0) {
        const all_playlists = await Playlist.find({
            '_id': { $in: favoriteList }
        });
    
        res.json(all_playlists);
    } else {
        res.json([]);
    }

})

//Get all created playlist of a user
router.get('/user/created', async(req, res) => {
    const userId = req.query.userId;
    
    const dbUser = await User.findById(userId);
    const ownedPlaylist = dbUser.ownedPlaylist;

    if (ownedPlaylist.length > 0) {
        const all_playlists = await Playlist.find({
            '_id': { $in: ownedPlaylist }
        });
    
        res.json(all_playlists);
    } else {
        res.json([]);
    }
})

//Create a Playlist
router.post('/', verify, async (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;

    const dbUser = await User.findById(userId);

    if (dbUser) {
        const playlist = await Playlist.create({
            title: title,
            description: description,
            author: author
        });
    
        const newPlaylistId = playlist._id;

        const ownedPlaylists = dbUser.ownedPlaylist;
        ownedPlaylists.push(newPlaylistId);
        await User.updateOne(
            { _id: userId }, 
            {
                ownedPlaylist: ownedPlaylists
            },
        )
    
        res.json(playlist);
    }
})
    
    
        
    
    

// Create a system playlist
router.post('/public', async (req, res) => {
    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const author = req.body.author;
    const browseId = req.body.browseId;

    const dbPlaylist = await Playlist.find({ browseId: browseId }).limit(1);

    if (dbPlaylist.length != 0) {
        res.json(dbPlaylist);
    } else {
        const playlist = await Playlist.create({
            title: title,
            author: author,
            browseId: browseId,
            thumbnail: thumbnail
        });
    
        res.json(playlist);
    }
     
    
})


// Like Playlist
router.put('/add', verify, async (req, res) => {
    const userId = req.body.userId;
    const playlistId = req.body.playlistId;
        
    try {
        await User.updateOne(
            { _id: userId }, 
            { $push: { likedPlaylist: playlistId } },
        );

        const newUser = await User.findById(userId);

        res.json({likedPlaylist: newUser.likedPlaylist});
    } catch {err =>
        res.send(err);
    }

});

// Unlike Playlist
router.put('/delete', verify, async (req, res) => {
    const userId = req.body.userId;
    const playlistId = req.body.playlistId;

    const dbUser = await User.findById(userId);
    const likedPlaylist = dbUser.likedPlaylist.filter(x => x !== playlistId);

    try {
        await User.updateOne(
            { _id: userId }, 
            { likedPlaylist: likedPlaylist },
        );

        const newUser = await User.findById(userId);

        res.json({likedPlaylist: newUser.likedPlaylist});
    } catch {err =>
        res.send(err);
    }

});


//Delete one playlist
router.delete('/', verify, async (req, res) => {
    const id = req.query.id;

    await Playlist.deleteOne({ _id: id });

    res.sendStatus(204);
});

export default router;
