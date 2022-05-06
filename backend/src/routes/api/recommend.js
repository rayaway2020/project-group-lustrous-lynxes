import express from 'express';
import {
    trendingData,
    forYouData,
    newReleaseData,
} from '../../data/recommend-data.js';

const router = express.Router();

router.get('/', async (req, res) => {
    // the mock data
    const raw = [
        {
            title: 'Trending',
            data: trendingData,
        },
        {
            title: 'For You',
            data: forYouData,
        },
        {
            title: 'New Release',
            data: newReleaseData,
        },
    ];
    return res.status(200).json(raw);
});

export default router;
