import express from 'express';
import {
    retrieveUser,
    createUser,
    addLikedSong,
    removeLikedSong,
    addLikedPlaylist,
    removeLikedPlaylist,
    updateUser,
} from '../../data/user-dao.js';
import jwt from 'jsonwebtoken';
import { User } from '../../data/schema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const SECRET = 'lsnfile38r2cjsod39uri4gnug';

router.use(express.json());

// Retrieve One User
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await retrieveUser(id);

    if (user) {
        res.json(user);
    } else {
        res.statusCode(404);
    }
});

// Create One User
router.post('/', async (req, res) => {
    const newUser = await createUser(req.body);

    res.status(201)
        .header('Location', `/api/users/${newUser._id}`)
        .json(newUser);
});

// Modify One User
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const user = req.body;
    user._id = id;

    const success = await updateUser(user);
    res.sendStatus(success ? 204 : 404);
});

// Add Liked Song
router.put('/addsong/:userId/:songId', async (req, res) => {
    const userId = req.params.userId;
    const songId = req.params.songId;

    const success = await addLikedSong(userId, songId);

    res.sendStatus(success ? 204 : 404);
});

// Remove Liked Song
router.put('/removesong/:userId/:songId', async (req, res) => {
    const userId = req.params.userId;
    const songId = req.params.songId;

    const success = await removeLikedSong(userId, songId);

    res.sendStatus(success ? 204 : 404);
});

// Add Liked Playlist
router.put('/addplaylist/:userId/:playlistId', async (req, res) => {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const success = await addLikedPlaylist(userId, playlistId);

    res.sendStatus(success ? 204 : 404);
});

// Remove Liked Playlist
router.put('/removeplaylist/:userId/:playlistId', async (req, res) => {
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

//register a user
router.post('/register', async (req, res) => {
    // console.log(req.body);
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    res.send(user);
});

//login
router.post('/login', async (req, res) => {
    // console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
    });
    if (!user) {
        return res.status(422).send({
            message: 'Email does not exist',
        });
    }
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (!isPasswordValid) {
        return res.status(422).send({
            message: 'Incorrect passward',
        });
    }
    //create a token
    const token = jwt.sign(
        {
            id: String(user._id),
        },
        SECRET
    );

    res.send({
        user,
        token,
    });
});

const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop();
    const { id } = jwt.verify(raw, SECRET);
    req.user = await User.findById(id);
    next();
};

router.get('/:id/username', auth, async (req, res) => {
    res.send(req.user.username);
});

export default router;
