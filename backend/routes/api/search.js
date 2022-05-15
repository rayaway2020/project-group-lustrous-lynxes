import express from 'express';
import {getAPIInstance} from '../../util/youtube';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.get('/', async (req, res) => {
    const searchQuery = req.query.search;

    const api = await getAPIInstance();

    const info = { songs: [], playlists: [] };

    // sort here
    await api.search(searchQuery, 'song').then(result => {
        const songs = result.content.slice(0, 10).map(item => ({
            videoId: item.videoId,
            title: item.name,
            artist:
                item.artist.length > 1
                    ? item.artist[0].name
                    : item.artist.name,
            duration: item.duration,
            thumbnail:
                item.thumbnails.length === 0
                    ? 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif'
                    : item.thumbnails[item.thumbnails.length - 1].url,
        }));
        info.songs = songs;
    });

    const dbPlaylists = await Playlist.find({title: new RegExp(searchQuery, 'i'), browseId: ""});

    await api.search(searchQuery, 'playlist').then(result => {
        const playlists = result.content.slice(0, 10).map(item => ({
            _id: "",
            browseId: item.browseId,
            title: item.title,
            author: item.author,
            thumbnail: Array.isArray(item.thumbnails)
                ? item.thumbnails[item.thumbnails.length - 1].url
                : item.thumbnails
                ? item.thumbnails.url
                : 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif',
        })).concat(dbPlaylists.map(item => ({
            _id: item._id,
            browseId: "",
            title: item.title,
            author: item.author,
            thumbnail: item.thumbnail
        }))).sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1
            } else {
                return -1
            }
        }).slice(0, 10);

        info.playlists = playlists;
    });
    
    res.json(info);
});

export default router;
