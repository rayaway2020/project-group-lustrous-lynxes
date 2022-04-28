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

router.get('/', (req, res) => {
    
});

router.get('/:id', (req, res) => res.send('Get User'));


export default router;