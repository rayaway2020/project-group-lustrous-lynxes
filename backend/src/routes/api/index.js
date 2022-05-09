import express from 'express';

const router = express.Router();

import users from './users.js';
router.use('/users', users);

import playlists from './playlists.js';
router.use('/playlists', playlists);

import songs from './songs.js';
router.use('/songs', songs);

import search from './search.js';
router.use('/search', search);

import recommend from './recommend.js';
router.use('/recommend', recommend);

import auth from './auth.js';
router.use('/auth', auth);

export default router;
