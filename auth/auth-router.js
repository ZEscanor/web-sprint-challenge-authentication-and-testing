const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Users = require("../users/user-model.js")

const{isValid} = require("../users/user-service.js")

const {jwtSecret} = require("./secret.js");

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;
  if(isValid(credentials)){
   const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds)

  credentials.password = hash;

  Users.add(credentials)
  .then(user => {
    res.status(201).json({data:user});

  })
  .catch(error => {
    res.status(500).json({message:error.message});

  });
  }
  else{
    res.status(400).json({
      message:"please provide a corrrect username and password to setup"
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  if(isValid(req.body)){
    Users.findBy({username:username})
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password,user.password)){
        const token = makeToken(user)
        res.status(200).json({message:"Welcome to API", token});
      }
      else {
        res.status(401).json({message:"invalid credentials"})
      }
    })
    .catch(error=>{
      res.status(500).json({message:error.message});
    })
  }
  else {
    res.status(400).json({message:"please provide right username and password"})
  }
  
});

function makeToken(user){
  //returns a token built with jwt
  const payload = {
   subject: user.id,
   username: user.username,
   role: user.role,
  }

  const options = {
   expiresIn: "30 seconds",
  }
  return jwt.sign(payload,jwtSecret, options)

}
module.exports = router;
