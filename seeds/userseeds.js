const { User } = require('../models');

const userData = [
    {
        first_name: 'Jimmy',
        last_name: 'John',
        user_name: 'Sammy_Jimmy69',
        email: 'jimmy@john.com',
        password: '12345678',
    },
    {
        first_name: 'Sue',
        last_name: 'Mee',
        user_name: 'Legal_babe',
        email: 'sue@yeu.com',
        password: '12345678',
    },
    {
        first_name: 'Karlty',
        last_name: 'Danils',
        user_name: 'kattykat',
        email: 'meow@meemoo.com',
        password: '12345678',
    },
]

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;