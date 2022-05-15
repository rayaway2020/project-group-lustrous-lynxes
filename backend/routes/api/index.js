import express from "express";

const router = express.Router();

import users from './users';
import playlists from './playlists';
import songs from './songs';
import search from './search';
import recommend from './recommend';
import auth from './auth';


router.use('/users', users);
router.use('/playlists', playlists);
router.use('/songs', songs);
router.use('/search', search);
router.use('/recommend', recommend);
router.use('/auth', auth);



export default router;