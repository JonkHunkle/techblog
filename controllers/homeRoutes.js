const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth');


// Homepage route -- displays the blogs, date created, and the user who published it 
router.get('/', async (req, res) => {

    try {
        console.log('in the get')
        const allPostData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['user_name'], exclude: ['password']
            }],
        });
        console.log('its all the posts', allPostData);


        const posts = allPostData.map(post => post.get({ plain: true }));
        console.log(posts)


        res.render('landing', { posts: posts });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }


});

router.get('/posts', async (req, res) => {

});

router.get('/signup', async (req, res) => {
    res.render('signup')
})
module.exports = router