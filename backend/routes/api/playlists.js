import express from 'express';
import { verify } from './verifyToken';
import { getAPIInstance } from '../../util/youtube';
import { User, Playlist, Song } from '../../db/schema';

const router = express.Router();

// Retrieve one playlist
router.get('/network', async (req, res) => {
    const unknownTypeId = req.query.id;
    //Try to find it as a youtube playlist
    const utubePlaylist = await Playlist.findOne({ browseId: unknownTypeId });

    try {
        if (utubePlaylist) {
            const api = await getAPIInstance();
            //songs in the playlist
            const playlistInfo = await api.getPlaylist(unknownTypeId);
            res.json({
                id: utubePlaylist._id,
                playlist: playlistInfo,
                isUser: false,
            });
        } else {
            const dbPlaylist = await Playlist.findOne({ _id: unknownTypeId });
            const songIdList = dbPlaylist.content;
            const songList = await Song.find({ _id: { $in: songIdList } });

            res.json({
                id: dbPlaylist._id,
                playlist: {
                    title: dbPlaylist.title,
                    thumbnail: dbPlaylist.thumbnail,
                    owner: dbPlaylist.author,
                    description: dbPlaylist.description,
                    content: songList.map(item => ({
                        videoId: item._id,
                        title: item.title,
                        thumbnails: item.cover,
                        duration: item.duration
                    })),
                },
                isUser: true,
            });
        }
    } catch {
        err => res.json(err);
    }
});

//get created playlist, liked songs and favorite songs by the user.
router.get('/user/info', async(req, res) => {
    const userId = req.query.userId;
    const dbUser = await User.findById(userId);

    const result = {}

    const favoriteList = dbUser.likedPlaylist;
    const ownedPlaylist = dbUser.ownedPlaylist;
    const likedSongs = dbUser.likedSongs;

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

//Add a song to playlist
router.put('/addsong', async(req, res) => {
    const songId = req.body.songId;
    const playlistId = req.body.playlistId;

    const dbPlaylist = await Playlist.findById(playlistId);
    if (dbPlaylist) {
        if (!dbPlaylist.content.includes(songId)) {
            await Playlist.updateOne(
                {_id: playlistId},
                { $push: { content: songId } },
            );
            res.sendStatus(200);
        }
        else {
            res.sendStatus(201);
        }
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
        await Playlist.updateOne(
            {_id: playlistId },
            { $inc: { likes: 1 } }
        )

        res.sendStatus(200);
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

        res.json({});
    } catch {err =>
        res.send(err);
    }
});

export default router;
