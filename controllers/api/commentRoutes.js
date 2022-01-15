const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log(req.body, "REQ.BODY")
        const newComment = await Comment.create({
            new_comment: req.body.comment,
            post_id: req.body.id,
            user_id: req.session.user_id,
        });
        console.log(newComment)
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router