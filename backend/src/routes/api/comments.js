import express from 'express';
import express from 'express';
import { retrieveComment, 
    retrieveAllComment, 
    retrieveSongComment,
    createComment, 
    updateComment, 
    deleteComment 
} from '../../data/comment-dao.js';

const router = express.Router();

// Retrieve all comments
router.get('/', async (req, res) => {
    res.json(await retrieveAllComment());
});

// Retrieve one comment
router.get('/comment/:id', async (req, res) => {
    const id = req.params.id;

    const comment = await retrieveComment(id);

    if (comment) {
        res.json(comment);
    } else {
        res.statusCode(404);
    }

});

// Retrieve song comments
router.get('/:songid', async (req, res) => {
    const songid = req.params.songid;

    res.json(await retrieveSongComment(songid));
});

//Create a comment
router.post('/', async (req, res) => {
    const newComment = await createComment(req.body.userId, req.body.songId, req.body.comment);

    res.status(201)
        .header('Location', `/api/comments/${newComment._id}`)
        .json(newComment);
})

// Update comment
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    comment._id = id;
    const success = await updateComment(comment);

    res.sendStatus(success ? 204 : 404);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteComment(id);
    res.sendStatus(200);
});

export default router;