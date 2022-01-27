const router = require('express').Router();
const { User, Post, Comment } = require('../../models');




router.get('/', async (req, res) => {
    const allcomments = await Comment.findAll({
        include: [{
            model: User,
            attributes: ['username'], exclude: ['password']
        }],
    })
    const posts = allcomments.map((post) => post.get({ plain: true }));
    res.json({ posts })
})

router.post('/', async (req, res) => {
    try {

        const newComment = await Comment.create({
            new_comment: req.body.new_comment,
            post_id: req.body.id,
            user_id: req.session.user_id,
        });
        console.log('full new comment', newComment)
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router