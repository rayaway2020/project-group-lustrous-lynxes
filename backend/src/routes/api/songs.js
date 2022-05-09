import express from 'express';
import verify from './verifyToken.js';
import { Song, User } from '../../db/schema.js';

const router = express.Router();

//Retrieve one song and comments
router.get('/get/:id', async (req, res) => {
    const song = await Song.findById(req.params.id);

    if (song) {
        res.json(song);
    } else {
        res.statusCode(404);
    }
});

//Get all Liked song of a user
//await Axios.get("http://localhost:3001/api/songs/user/liked", { headers: { authorization: "Bearer " + token}}, { params: { id: id }}).then(res => res.status)

router.get('/user/liked', verify, async (req, res) => {
    const dbUser = await User.findById(req.query.id)

    const songList = dbUser.likedSongs;

    if (songList) {
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
