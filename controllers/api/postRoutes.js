const express = require("express");
const {Post, User, Comment} = require("../../models/");
const sequelize = require('../../config/connection.js')

const router = express.Router()

// GET /api/post get all posts from the database
router.get("/", (req,res) =>{
  Post.findAll(
    {
      attributes: [
        'id',
        'user_id',
        'post_text',
        'post_url',
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
    }
  )
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// GET /api/post/1    retrieve a specific post based on the id of the user
router.get("/:id", (req,res) =>{
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/post/userID/1   retrieve a specific post based on the user within the db
router.get("/userID/:id", (req,res) =>{
  Post.findAll({
    where: {
      user_id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT /api/post/1    modify a post that is within the db
router.put('/:id', (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/post   add a post to the database
router.post("/", (req,res) =>{
  console.log(req.body);
  Post.create({
    id: req.body.id,
    user_id: req.session.user_id,
    post_text: req.body.post_text,
    post_url: req.body.post_url
  })
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// DELETE /api/post/1   remove a specific post from the db
router.delete("/:id", (req, res) =>{
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;