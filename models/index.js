const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

/*
A User can have many Posts but
a post only belongs to a single user however
a user can leave many ratings on many posts while
a post can have many ratings from many users
*/
User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

User.belongsToMany(Post, {
    through: 'rate',
    as: 'rating',

    foreignKey: 'user_id'
})

Post.belongsToMany(User, {
    through: 'rate',
    as: 'rating',

    foreignKey: 'post_id'
})



/*
Comments are given by users,
Comment are given to posts
*/
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})


module.exports = {User, Comment, Post};