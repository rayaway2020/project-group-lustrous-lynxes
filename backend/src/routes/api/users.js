import express from 'express';
import verify from './verifyToken.js';
import { User } from '../../db/schema.js';

const router = express.Router();

router.use(express.json());

// Axios.post('http://localhost:3001/api/users', null, { params: { id }}).then(res => res.status))
router.get('/', verify, async (req, res) => {
    const user = await User.findById(req.query.id);

    if (user) {
        res.send({
            username: user.username,
            email: user.email,
            thumbnail: user.thumbnail + user.username,
            ownedPlaylist: user.ownedPlaylist,
            likedPlaylist: user.likedPlaylist,
            likedSongs: user.likedSongs
        });
    } else {
        res.statusCode(404);
    }
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
