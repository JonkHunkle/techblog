const { Post } = require('../models');

const postData = [
    {
        title: 'My first post!',
        content: 'I love the internet',
        user_id: 1,
    },
    {
        title: 'can you guess my favorite animal?',
        content: 'It is a cat!',
        user_id: 3,
    },
    {
        title: 'why do i eat so much cheese?',
        content: 'I swear im not lactose intolerant',
        user_id: 2,
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;