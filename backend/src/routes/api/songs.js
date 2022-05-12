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

router.get('/favorite', async (req, res) => {
    const userId = req.query.userId;
    const dbUser = await User.findById(userId);

    if (dbUser) {
        const songIdList = dbUser.likedSongs;
        if (songIdList.length > 0) {
            const songList = await Song.find({
                '_id': { $in: songIdList }
            });
        
            res.json(songList);
        } else {
            res.json([]);
        }
    } else {
        res.json([])
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

router.get('/isliked', async (req, res) => {
    const songId = req.query.songId;
    const user = await User.findById(req.query.userId);

    if (user) {
        const likedSongs = user.likedSongs;

        res.json({ isLiked: likedSongs.includes(songId)});
    }
    
})

//Create One Song
router.post('/', async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const cover = req.body.cover;
    const duration = req.body.duration;

    //Check existing song
    const existSong = await Song.findById(id);

    if (existSong == null) {
        const newSong = new Song({
            _id: id,
            title: title,
            cover: cover,
            duration: duration
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
    const songId = req.body.songId;
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
    const id = req.body.commentId;
    const user = req.body.userId;

    try {
        const dbComment = await Comment.findById(id);
        const likes = dbComment.likes + 1;
        const userList = dbComment.likedUsers;
        userList.push(user);
        
    
        await Comment.updateOne(
            { _id: id }, 
            {
                $set: { 
                    "likes": likes, "likedUsers": userList 
                }
            },
        )
        
        res.json({ likes: likes });
    }
    catch {
        res.json({});
    }
});

router.put('/comment/cancellikes', async (req, res) => {
    const id = req.body.commentId;
    const user = req.body.userId;

    try {
        const dbComment = await Comment.findById(id);
        const likes = dbComment.likes > 0? dbComment.likes - 1: 0;
        const userList = dbComment.likedUsers;
        const deletedList = userList.filter(u => u !== user);
    
        await Comment.updateOne(
            { _id: id }, 
            {
                $set: { 
                    likes: likes, likedUsers: deletedList 
                }
            }
            
        )
        
        res.json({ likes: likes });
    }
    catch {
        err => res.send(err) 
    }
});

// Add Liked Song
router.put('/add', verify, async (req, res) => {
    const userId = req.body.userId;
    const songId = req.body.songId;

    try {
        await User.updateOne(
            { _id: userId }, 
            { $push: { likedSongs: songId } },
        );

        const newUser = await User.findById(userId);

        res.json({likedSongs: newUser.likedSongs});
    } catch {err =>
        res.send(err);
    }

});

//Delete like 
router.put('/delete', verify, async (req, res) => {
    const userId = req.body.userId;
    const songId = req.body.songId;

    const dbUser = await User.findById(userId);
    const likedSongs = dbUser.likedSongs.filter(x => x !== songId);

    try {
        await User.updateOne(
            { _id: userId }, 
            { likedSongs: likedSongs },
        );

        const newUser = await User.findById(userId);

        res.json({likedSongs: newUser.likedSongs});
    } catch {err =>
        res.send(err);
    }

});




export default router;
