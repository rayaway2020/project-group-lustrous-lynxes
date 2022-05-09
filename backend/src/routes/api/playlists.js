import express from 'express';
import verify from './verifyToken.js';
import getAPIInstance from '../../util/youtube.js';
import { User, Playlist } from '../../db/schema.js';

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

//Create a Playlist
router.post('/', verify, async (req, res) => {
    const title = req.body.natitleme;
    const description = req.body.description;
    const author = req.body.username;
     
    const playlist = new Playlist({
        browseId: browseId,
        title: title,
        description: description,
        author: author
    });

    try {
        await playlist.save();
        res.json(playlist);
    } catch {
        err => res.send(err);
    }
})

//Delete one playlist
router.delete('/', verify, async (req, res) => {
    const id = req.query.id;

    await Playlist.deleteOne({ _id: id });

    res.sendStatus(204);
});

export default router;
