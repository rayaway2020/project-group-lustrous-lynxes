import express from 'express';
import { Playlist } from '../../data/schema.js';
import { createSong,
    retrieveSong,
    retrieveSongList
} from '../../data/song-dao.js';

const router = express.Router();

//Retrieve one song
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const song = await retrieveSong(id);

    if (song) {
        res.json(song);
    } else {
        res.statusCode(404);
    }

});

//Retrieve song list for a playlist
router.get('/playlist/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId;

    res.json(await retrieveSongList(playlistId));
})

//Create One Song
router.post('/', async (req, res) => {
    const newSong = await createSong(req.body);
    
    res.statusCode(201)
    .header('Location', `/api/songs/${newSong._id}`)
    .json(newSong);
})

export default router;