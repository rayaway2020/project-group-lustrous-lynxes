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

// Create a playlist by a user
router.post('/', (req, res) => {
    const newPlaylist = await createPlaylist(req.body.userId, req.body.playlist);

    res.status(201)
        .header('Location', `/api/playlists/${newPlaylist._id}`)
        .json(newPlaylist);
});


router.put('/addSong/:playlistId/:songId', (req, res) => {
    const success = await addToPlaylist(req.params.songId, req.params.playlistId);

    res.sendStatus(success? 204: 404);
});

router.put('/deleteSong/:playlistId/:index', (req, res) => {
    const success = await deleteFromPlaylist(req.params.index, req.params.playlistId);

    res.sendStatus(success? 204: 404);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const playlist = req.body;
    playlist._id = id;
    const success = await updatePlaylist(playlist);

    res.sendStatus(success ? 204 : 404);
})



// Delete one playlist
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await deletePlaylist(id);

    res.sendStatus(204);
});

export default router;