import express from 'express';
import { createSong,
    retrieveSong,
    retrieveSongList
} from '../../data/song-dao.js';

const router = express.Router();

export default router;