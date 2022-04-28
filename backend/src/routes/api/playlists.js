import express from 'express';
import { createPlaylist, 
    retrievePlaylist,
    addToPlaylist,
    deleteFromPlaylist,
    retrieveTrendingPlaylist,
    retrieveLatestPlaylist,
    updatePlaylist,
    deletePlaylist 
} from '../../data/playlist-dao.js';

const router = express.Router();

// Retrieve one playlist
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const playlist = await retrievePlaylist(id);

    if (playlist) {
        res.json(playlist);
    } else {
        res.statusCode(404);
    }
});

// Retrieve trending playlists
router.get('/trending/', (req, res) => {
    res.json(await retrieveTrendingPlaylist());
})

// Retrieve latest playlists
router.get('/latest/', (req, res) => {
    res.json(await retrieveLatestPlaylist());
})

// Delete one playlist
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await deletePlaylist(id);

    res.sendStatus(204);
});

export default router;