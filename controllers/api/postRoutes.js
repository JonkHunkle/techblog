const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.postTitle,
            content: req.body.postContent,
            user_id: req.session.user_id,
        });
        console.log(newPost)
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body,
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        res.json(postData);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router