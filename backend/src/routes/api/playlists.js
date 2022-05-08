import express from 'express';
import verify from './verifyToken.js';
import getAPIInstance from '../../util/youtube.js';
import { Playlist } from '../../db/schema.js';

const router = express.Router();

// Retrieve one playlist
router.get('/network/:id', async (req, res) => {
    const id = req.params.id;
    if (id === 'undefined') {
        res.send({});
    } else {
        const api = await getAPIInstance();
        api.getPlaylist(id).then(result => {
            res.send(result);
        });
    }
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    const playlist = await retrievePlaylist(id);

    if (playlist) {
        res.json(playlist);
    } else {
        res.statusCode(404);
    }
});

// Create a playlist by a user
router.post('/', verify, async (req, res) => {
    const newPlaylist = await createPlaylist(
        req.body.userId,
        req.body.playlist
    );

    res.status(201)
        .header('Location', `/api/playlists/${newPlaylist._id}`)
        .json(newPlaylist);
});

router.put('/addSong/:playlistId/:songId', async (req, res) => {
    const success = await addToPlaylist(
        req.params.songId,
        req.params.playlistId
    );

    res.sendStatus(success ? 204 : 404);
});

router.put('/deleteSong/:playlistId/:index', async (req, res) => {
    const success = await deleteFromPlaylist(
        req.params.index,
        req.params.playlistId
    );

    res.sendStatus(success ? 204 : 404);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const playlist = req.body;
    playlist._id = id;
    const success = await updatePlaylist(playlist);

    res.sendStatus(success ? 204 : 404);
});

// Delete one playlist
router.delete('/:id', verify, async (req, res) => {
    const id = req.params.id;

    await Playlist.deleteOne({ _id: id });

    res.sendStatus(204);
});

export default router;
