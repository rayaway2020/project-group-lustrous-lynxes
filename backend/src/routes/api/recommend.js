import { Playlist } from '../../db/schema.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const Trending = await Playlist.find().sort({ likes: 1 }).limit(5);

    const ForYou = await Playlist.find().sort({ browseId: 1 }).limit(5);

    const NewRelease = await Playlist.find().sort({ browseId: -1 }).limit(5);

    const raw = [
        {
            title: 'Trending',
            data: Trending,
        },
        {
            title: 'For You',
            data: ForYou,
        },
        {
            title: 'New Release',
            data: NewRelease,
        },
    ];
    return res.status(200).json(raw);
});

export default router;
