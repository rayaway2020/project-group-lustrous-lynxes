import express from 'express';
import verify from './verifyToken.js';
import { User } from '../../db/schema.js';

const router = express.Router();

router.use(express.json());

// Axios.post('http://localhost:3001/api/users', null, { params: { id }}).then(res => res.status))
router.get('/', verify, async (req, res) => {
    const user = await User.findById(req.query.id);

    if (user) {
        res.json(user);
    } else {
        res.statusCode(404);
    }
});

// Modify One User
router.put('/', verify, async (req, res) => {
    const id = req.query.id;

    const user = req.body;
    user._id = id;

    const success = await updateUser(user);
    res.sendStatus(success ? 204 : 404);
});

// Add Liked Song
router.put('/addsong', verify, async (req, res) => {
    const userId = req.query.userId;
    const songId = req.query.songId;
    
    const dbUser = await User.findById(userId);
    if (dbUser) {
        dbUser.likedSongs.push(songId);
        await dbUser.save();

        return res.status(200);
    }

    return res.status(400).send(err);
});

// Remove Liked Song
router.put('/removesong', verify, async (req, res) => {
    const userId = req.query.userId;
    const songId = req.query.songId;

    const dbUser = await User.findById(userId);

    if (dbUser) {
        dbUser.likedSongs.splice(index, 1);
        await dbUser.save();

        return res.status(200);
    }

    return res.status(400).send(err);
});

// Add Liked Playlist
router.put('/addplaylist', verify, async (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const success = await addLikedPlaylist(userId, playlistId);

    res.sendStatus(success ? 204 : 404);
});

// Remove Liked Playlist
router.put('/removeplaylist', async (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const success = await removeLikedPlaylist(userId, playlistId);

    res.sendStatus(success ? 204 : 404);
});

//find a user
router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

export default router;
