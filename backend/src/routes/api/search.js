import express from 'express';
import getAPIInstance from '../../util/youtube.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const searchQuery = req.query.search;

    const api = await getAPIInstance();

    const info = { songs: [], playlists: [] };

    // sort here
    await api.search(searchQuery, 'song').then(result => {
        const songs = result.content.slice(0, 10).map(item => ({
            videoId: item?.videoId,
            title: item?.name,
            artist:
                item?.artist.length > 1
                    ? item.artist[0].name
                    : item.artist.name,
            duration: item?.duration,
            thumbnail:
                item?.thumbnails.length === 0
                    ? 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif'
                    : item.thumbnails[item.thumbnails.length - 1].url,
        }));
        info.songs = songs;
    });

    await api.search(searchQuery, 'playlist').then(result => {
        const orderList = result.content.sort(
            (a, b) => a.trackCount - b.trackCount
        );
        const playlists = orderList.slice(0, 10).map(item => ({
            browseId: item.browseId,
            title: item.title,
            author: item.author,
            thumbnail: Array.isArray(item.thumbnails)
                ? item.thumbnails[item.thumbnails.length - 1].url
                : item.thumbnails
                ? item.thumbnails.url
                : 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif',
        }));
        info.playlists = playlists;
    });

    res.json(info);
});

export default router;
