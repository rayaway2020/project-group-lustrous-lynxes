import express from 'express';

const router = express.Router();

import users from './users.js';
router.use('/users', users);

import comments from './comments.js';
router.use('/comments', comments);

import playlists from './playlists.js';
router.use('/playlists', playlists);

import songs from './songs.js';
router.use('/songs', songs);

export default router;
