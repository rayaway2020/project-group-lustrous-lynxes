import express from 'express';
import verify from './verifyToken.js';
import { Song, User, Comment } from '../../db/schema.js';

const router = express.Router();

//Retrieve one song and comments
router.get('/', async (req, res) => {
    const song = await Song.findById(req.query.id);

    if (song) {
        res.json(song);
    } else {
        res.statusCode(404);
    }
});

router.get('/comments', async (req, res) => {
    const song = await Song.findById(req.query.id);

    const idList = song.comments;

    if (idList.length > 0) {
        const all_comments = await Comment.find({
            '_id': { $in: idList }
        });
    
        res.json(all_comments);
    } else {
        res.json([]);
    }
    
});

//Create One Song
router.post('/', async (req, res) => {
    const id = req.body.id;

    //Check existing song
    const existSong = await Song.findById(id);

    if (existSong == null) {
        const newSong = new Song({
            _id: id
        });
        await newSong.save();
        res.json(newSong);
    }
    else {
        res.json({});
    }
});

//Add a comment
router.post('/comment', verify, async (req, res) => {
    const songId = req.query.songId;
    const author = req.body.username;
    const content = req.body.content;


    try {
        const comment = new Comment({ author: author, content: content });
        await comment.save();

        await Song.findOneAndUpdate(
            { _id: songId }, 
            { $push: { comments: comment._id } },
        );

        res.json({ commendId: comment._id });
    } catch {err =>
        res.send(err);
    }
});

router.put('/comment/addlikes', async (req, res) => {
    const id = req.query.commentId;

    try {
        const dbComment = await Comment.findById(id);
        const likes = dbComment.likes + 1;
    
        await Comment.updateOne(
            { _id: id }, 
            { likes: likes }
        )
        
        res.json({ likes: likes });
    }
    catch {
        res.json({});
    }
});

router.put('/comment/cancellikes', async (req, res) => {
    const id = req.query.commentId;

    try {
        const dbComment = await Comment.findById(id);
        const likes = dbComment.likes - 1;
    
        await Comment.updateOne(
            { _id: id }, 
            { likes: likes }
        )
        
        res.json({ likes: likes });
    }
    catch {
        err => res.send(err) 
    }
});

//Get all Liked song of a user
//await Axios.put("http://localhost:3001/api/songs/user/liked", { headers: { auth-token: token}}, { params: { id: id }}).then(res => res.status)

// Add Liked Song
router.put('/add', verify, async (req, res) => {
    const userId = req.query.userId;
    const songId = req.query.songId;

    try {
        await User.findOneAndUpdate(
            { _id: userId }, 
            { $push: { likedSongs: [songId] } },
        );

        res.sendStatus(200);
    } catch {err =>
        res.send(err);
    }

});

router.put('/delete', verify, async (req, res) => {
    const userId = req.query.userId;
    const songId = req.query.songId;

    try {
        await User.findOneAndUpdate(
            { _id: userId }, 
            { $pullAll: { likedSongs: [songId] } },
        );

        res.sendStatus(200);
    } catch {err =>
        res.send(err);
    }

});




export default router;
