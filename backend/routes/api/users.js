import express from 'express';
import {verify} from './verifyToken';
import { User } from '../../db/schema';

const router = express.Router();

// Get all user information
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

export default router;
