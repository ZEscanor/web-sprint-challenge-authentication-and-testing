const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
 const User = require("../users/user-model.js")
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);
server.get('/api/users', (req,res)=>{
 User.find()
 .then(users=>{
     res.status(200).json(users);
 })
 .catch((err)=>{
     res.status(500).json({message: "youllget em next time"})
 })
});
server.get('/', (req,res)=>{
    res.json({api:"api up"})
})
module.exports = server;
