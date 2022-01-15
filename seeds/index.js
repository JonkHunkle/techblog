const seedPost = require('./postseeds');
const seedComment = require('./commentseeds');
const seedUser = require('./userseeds');


const sequelize = require('../config/connections');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPost();
    console.log('\n----- USER POSTS SEEDED -----\n');

    await seedComment();
    console.log('\n----- TAGS SEEDED -----\n');

    process.exit(0);
};

seedAll();