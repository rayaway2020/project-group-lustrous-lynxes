import express from 'express';
import { Song } from '../../data/schema';

const router = express.Router();

//Retrieve one song
router.get('/:id', async (req, res) => {
    const song = await Song.findById(req.params.id);

    if (song) {
        res.json(song);
    } else {
        res.statusCode(404);
    }
});


//Create One Song
router.post('/', async (req, res) => {
    const newSong = new Song({
        _id: req.body.videoId
    });

    res.statusCode(201)
        .header('Location', `/api/songs/${newSong._id}`)
        .json(newSong);
});

export default router;
