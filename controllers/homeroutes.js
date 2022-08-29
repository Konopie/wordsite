const router = require('express').Router();
const {Post, Comment, User} = require('../models');
const sequelize = require('sequelize');

// GET redirect user to the main homepage and render all posts
router.get('/', (req, res)=>{
  

  Post.findAll({
      attributes: [
        'id',
        'post_url',
        'post_text',
        'user_id'
      ],
      include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('home', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
  })   
})

// GET redirect a user to a single post
router.get('/post/:id', (req, res)=>{
  if(!req.session.loggedIn){
    res.redirect('/login');
    return;
  }
  
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'post_text',
      'user_id'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      console.log(dbPostData)
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });
      console.log(post)

      // pass data to template
      res.render('single-post', {post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

// GET redirect a user to the login page
router.get('/login', (req, res) => {
  //if the user has already logged in then redirect back to the homepage
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
})

router.get('/create-post', (req, res) => {
  if(!req.session.loggedIn){
    res.redirect('/login');
    return;
  }

  res.render('create-post');
})

module.exports = router;