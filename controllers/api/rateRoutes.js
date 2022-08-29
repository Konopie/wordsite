const express = require("express");
const {Rate} = require("../../models/");
const router = express.Router()

// GET /api/rate get all rate information on posts
router.get("/", (req,res) =>{
  Rate.findAll()
  .then(dbUserData => {
    res.json(dbUserData)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

// GET /api/rate/:id  get a specific rating on a post
router.get("/:id", (req,res) =>{
  Rate.findOne({
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

// POST /api/rate  create a new rate for a post
router.post("/", (req,res) =>{
  Rate.create({
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    rating: req.body.rating
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/rate  remove rate from a post
router.delete("/:id", (req, res) =>{
  console.log('id', req.params.id);
  Rate.destroy({
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