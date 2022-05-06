import express from 'express';
import getAPIInstance from '../../util/youtube.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const searchQuery = req.query.search_query;
    const api = await getAPIInstance();
    api.search(searchQuery, 'playlist').then(result => {
        res.send(result.content);
    });
});

export default router;
