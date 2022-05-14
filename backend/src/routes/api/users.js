import express from 'express';
import verify from './verifyToken.js';
import { User } from '../../db/schema.js';

const router = express.Router();

router.use(express.json());

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
