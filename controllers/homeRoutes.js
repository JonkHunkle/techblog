const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth');


// Homepage route -- displays the blogs, date created, and the user who published it 
router.get('/', async (req, res) => {

    try {

        const allPostData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'], exclude: ['password']
            }],
        });



        const posts = allPostData.map(post => post.get({ plain: true }));



        res.render('landing', { posts: posts, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }


});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
            }]
        });


        const users = userData.get({ plain: true });

        res.render('dash', {
            users: users,
            posts: users.posts,
            logged_in: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

});



router.get('/signup', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res
    res.render('signup')
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username'], exclude: ['password']
            }, {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }],
            }],
        });

        const posts = postData.get({ plain: true });
        console.log('posts?', posts)
        res.render('post', {
            posts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log('is this the error?', err)
        res.status(500).json(err);
    }
});
module.exports = router