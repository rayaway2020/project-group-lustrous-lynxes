import express from 'express';
import { retrieveComment, 
    retrieveCommentList, 
    createComment, 
    updateComment, 
    deleteComment 
} from '../../data/comment-dao.js';

const router = express.Router();

// Create new article
router.post('/', async (req, res) => {
    const newComment = await createComment(req.body.userId, req.body.songId, commentBody);

    res.status(HTTP_CREATED)
        .header('Location', `/api/articles/${newArticle._id}`)
        .json(newArticle);
})

// Retrieve all articles
router.get('/', async (req, res) => {
    res.json(await retrieveCommentList(req.body));
});

// Retrieve single article
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const article = await retrieveComment(id);

    if (article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
});

// Update article
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    comment._id = id;
    const success = await updateComment(comment);
});

// Delete article
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteComment(id);
    res.sendStatus(200);
});

export default router;