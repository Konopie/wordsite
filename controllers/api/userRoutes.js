const express = require("express");
const {User, Comment, Post, Rate} = require("../../models/");
const router = express.Router();
const {checkPassword} = require('../../util/helpers');
let user;

// GET /api/user    get all user information from the database
router.get("/", (req,res) =>{
  User.findAll()
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// GET /api/user/1    get a singular post by id
router.get("/:id", (req,res) =>{
  User.findOne({
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

// GET /api/user/username/*username  
router.get("/username/:user", (req,res) =>{
  User.findOne({
    where: {
      username: req.params.user
    },
    attributes: {exclude: ['username', 'email', 'password']}
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

// PUT /api/user/1  modify a post by id
router.put('/:id', (req, res) => {
  User.update(req.body, {
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

// POST /api/user   create a new user from input information
router.post("/", (req,res) =>{
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// POST /api/user/login   checks the user input information against the database for wether or not a user can login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    //responsd to the client with error 400 if no user is found under that email and returns undefined for the following then statement
    if (!dbUserData) {
      res.status(400).json({ error: 'No user with that email address!' });
      return;
    }
    user = dbUserData;

    //checks the user input password against the hashed password stored in the database
    async function validatePassword(input, hash){
      const validate = await checkPassword(input, hash)
      return validate;
    }

    //returns the result of the password check
    return validatePassword(req.body.password, dbUserData.dataValues.password);
  }).then(result => {

    //if the email doesn't match anything in the database then result should be undefined and not true/false
    if(result === undefined){
      return;
    }

    //if ValidatePassword returns false for matching passwords
    if(!result){
      res.status(400).json({error: 'Incorrect Password!'});
      return;
    }

    //if ValidatePassword returns true for matching passwords
    if(result){
      req.session.save(() => {
      // declare session variables
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
      return;
    });
    }
    
  });
})

//POST /api/user/logout   logout a user from their session
router.post('/logout', (req, res) => {
  //destroys the saved cookie when the user logs out
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
})

// DELETE /api/user/1   deletes a user with a defined id from the database
router.delete("/:id", (req, res) =>{
  User.destroy({
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


module.exports = router;