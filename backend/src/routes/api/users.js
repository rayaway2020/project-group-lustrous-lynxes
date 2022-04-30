import express from 'express';
import { retrieveUser,
    createUser,
    addLikedSong,
    removeLikedSong,
    addLikedPlaylist,
    removeLikedPlaylist,
    updateUser
} from '../../data/user-dao.js';

const router = express.Router();

// Retrieve One User
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const user = await retrieveUser(id);

    if (user) {
        res.json(user);
    } else {
        res.statusCode(404);
    }
});

// Create One User
router.post('/', (req, res) => {
    const newUser = await createUser(req.body);

    res.status(201)
        .header('Location', `/api/users/${newUser._id}`)
        .json(newUser);
})

// Modify One User
router.put('/:id', (req, res) => {
    const id = req.params.id;

    const user = req.body;
    user._id = id;

    const success = await updateUser(user);
    res.sendStatus(success ? 204: 404);
})

// Add Liked Song
router.put('/addsong/:userId/:songId', (req, res) => {
    const userId = req.params.userId;
    const songId = req.params.songId;

    const success = await addLikedSong(userId, songId);

    res.sendStatus(success? 204: 404);
});

// Remove Liked Song
router.put('/removesong/:userId/:songId', (req, res) => {
    const userId = req.params.userId;
    const songId = req.params.songId;

    const success = await removeLikedSong(userId, songId);

    res.sendStatus(success? 204: 404);
});

// Add Liked Playlist
router.put('/addplaylist/:userId/:playlistId', (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const success = await addLikedPlaylist(userId, playlistId);

    res.sendStatus(success? 204: 404);
});

// Remove Liked Playlist
router.put('/removeplaylist/:userId/:playlistId', (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const success = await removeLikedPlaylist(userId, playlistId);

    res.sendStatus(success? 204: 404);
});

export default router;