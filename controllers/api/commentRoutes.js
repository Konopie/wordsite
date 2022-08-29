const express = require("express");
const {Comment} = require("../../models/");
const router = express.Router()

// GET /api/comment   get all comments within the database
router.get("/", (req,res) =>{
  Comment.findAll()
  .then(dbUserData => {
    console.log(dbUserData)
    res.json(dbUserData)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

// GET /api/comment   retrieve a comment based on the id provided
router.get("/:id", (req,res) =>{
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/comment    create a new comment
router.post("/", (req,res) =>{
  Comment.create({
    id: req.body.id,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
    comment_text: req.body.comment_text
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/comment    remove a comment based on id
router.delete("/:id", (req, res) =>{
  console.log('id', req.params.id);
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No comment found with this id' });
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