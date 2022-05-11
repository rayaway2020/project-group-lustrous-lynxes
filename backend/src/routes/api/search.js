import express from 'express';
import getAPIInstance from '../../util/youtube.js';

const router = express.Router();

router.get('/playlists', async (req, res) => {
    const searchQuery = req.query.search_query;
    const api = await getAPIInstance();
    api.search(searchQuery, 'playlist').then(result => {
        console.log(result);
        const raw = result.content.map(item => {
            return {
                browseId: item.browseId,
                title: item.title,
                author: item.author,
                thumbnail:
                    item.thumbnails[1]?.url ||
                    'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif',
            };
        });
        res.send(raw);
    });
});

router.get('/songs', async (req, res) => {
    const searchQuery = req.query.search_query;
    const api = await getAPIInstance();
    api.search(searchQuery, 'song').then(result => {
        const raw = result.content.map(item => {
            if (!item.thumbnails || item.thumbnails.length == 0) {
                item.thumbnails = [
                    {
                        url: 'https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif',
                    },
                ];
            }
        });
        res.send(raw);
    });
});

router.get('/', async (req, res) => {
    const searchQuery = req.query.search;

    const api = await getAPIInstance();

    api.search(searchQuery, "song").then(result => {
        res.json(result);
        const songs = result.content.slice(0,10).map(item => ({
            videoId: item.videoId,
            title: item.name,
            artist: item.artist[0].name,
            duration: item.duration,
            thumbnail: item.thumbnails.length === 0? "https://c.tenor.com/Tu0MCmJ4TJUAAAAC/load-loading.gif" : item.thumbnails[item.thumbnails.length-1].url
        }))

    })
})

export default router;
