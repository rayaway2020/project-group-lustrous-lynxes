import { Comment, Song, User } from "./schema.js";

async function retrieveComment(id) {
    return await Comment.findById(id);
}

//getting all comments of a song
async function retrieveCommentList(idList) {
    return await Comment.find({
        '_id': { $in: idList }
    });
}

async function createComment(userId, songId, commentText) {

    const dbComment = new Comment({
        text: commentText,
        owner: userId
    });
    await dbComment.save();

    const dbUser = await User.findById(userId);
    const dbSong = await Song.findById(songId);

    if (dbUser && dbSong) {
        dbUser.createdComments.push(dbComment._id);
        await dbUser.save();
    
        dbSong.comments.push(dbComment._id);
        await dbSong.save();
    }

    return dbComment;
}

async function updateComment(comment) {

    const dbComment = await Comment.findById(comment._id);
    if (dbComment) {

        dbComment.text = comment.text;
        dbComment.likes = comment.likes;
                
        await dbComment.save()
        return true;
    }

    return false;
}

async function deleteComment(id) {
    await Comment.deleteOne({ _id: id });
}

export {
    retrieveComment,
    retrieveCommentList,
    createComment,
    updateComment,
    deleteComment
}