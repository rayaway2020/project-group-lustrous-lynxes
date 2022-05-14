import { Playlist } from '../../db/schema.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const Trending = await Playlist.find().sort({ likes: 1 }).limit(5);

    const ForYou = await Playlist.find().sort({ author: 1 }).limit(5);

    const NewRelease = await Playlist.find({
        'browseId': { $in: [
            "VLPL3-sRm8xAzY9gpXTMGVHJWy_FMD67NBed",
            "VLRDCLAK5uy_lBNUteBRencHzKelu5iDHwLF6mYqjL-JU", 
            "VLRDCLAK5uy_kLjQ2Had9aZX72-8jqo3u22eQyUGdpr5s",
            "VLRDCLAK5uy_mhnQ-VhAMQEODSHiytwObvyO0dIgY1yco",
            "VLRDCLAK5uy_nJW8rgpnSeRsPRdm3HybTsAhjJu4E48Ks"
        ]}
    });


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
