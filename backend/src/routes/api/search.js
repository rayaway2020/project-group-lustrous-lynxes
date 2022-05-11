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

    const result = {} 
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
    });    

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

})

export default router;
