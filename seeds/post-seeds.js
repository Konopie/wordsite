const {Post} = require('../models');

const postData = [
    {
        user_id: 1,
        post_text: 'Check out this nice pie recipie I found!',
        post_url: 'https://www.allrecipes.com/recipe/12224/key-lime-pie-i/'
    },
    {
        user_id: 2,
        post_text: 'Check out this nice pizza recipie I found!',
        post_url: 'https://www.simplyrecipes.com/recipes/homemade_pizza/'
    },
    {
        user_id: 3,
        post_text: 'Check out this nice pot roast recipie I found!',
        post_url: 'https://cafedelites.com/slow-cooked-balsamic-pot-roast/'
    },
    {
        user_id: 4,
        post_text: 'Check out this nice lasagna recipie I found!',
        post_url: 'https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/'
    },
    {
        user_id: 5,
        post_text: 'Check out this nice salmon recipie I found!',
        post_url: 'https://www.thechunkychef.com/honey-garlic-glazed-salmon/'
    },
    {
        user_id: 5,
        post_text: 'Check out this nice lobster recipie I found!',
        post_url: 'https://therecipecritic.com/lobster-tail-recipe/'
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;