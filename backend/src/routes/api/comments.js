import express from 'express';
import { retrieveComment, 
    retrieveCommentList, 
    createComment, 
    updateComment, 
    deleteComment 
} from '../../data/comment-dao.js';

const router = express.Router();

// Retrieve comments
router.get('/', async (req, res) => {
    res.json(await retrieveCommentList(req.body.idList));
});

// Retrieve single comment
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const comment = await retrieveComment(id);

    if (comment) {
        res.json(comment);
    }
    else {
        res.sendStatus(404);
    }
});

//Create a comment
router.post('/', async (req, res) => {
    const newComment = await createComment(req.body.userId, req.body.songId, req.body.comment);

    res.status(201)
        .header('Location', `/api/comments/${newComment._id}`)
        .json(newComment);
})

// Update article
router.put('/:id', async (req, res) => {
    const { id } = req.params;
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