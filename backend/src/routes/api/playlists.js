import express from 'express';
import { createPlaylist, 
    retrievePlaylist,
    addToPlaylist,
    deleteFromPlaylist,
    retrieveTrendingPlaylist,
    retrieveLatestPlaylist,
    updatePlaylist,
    deletePlaylist 
} from '../../data/playlist-dao.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Get All Created Playlist'));

router.get('/:id', (req, res) => res.send('Get A Playlist'));

export default router;