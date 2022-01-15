const { Comment } = require('../models');

const commentData = [
    {
        new_comment: 'that looks infected',
        post_id: 2,
        user_id: 3,
    },
    {
        new_comment: 'why wont the world say hello to me?',
        post_id: 1,
        user_id: 1,
    },
    {
        new_comment: 'that looks tasty',
        post_id: 3,
        user_id: 2,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;