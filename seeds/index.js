const seedComments = require('./comment-seeds')
const seedUsers = require('./user-seeds')
const seedPosts = require('./post-seeds')

const sequelize = require('../config/connection');

//seed all user data when the function seedAll is called
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Now Seeding Users');
    await seedUsers();

    console.log('Now Seeding Posts');
    await seedPosts();

    console.log('Now Seeding Comments');
    await seedComments();

    console.log('Done Seeding!');
};

module.exports = seedAll;