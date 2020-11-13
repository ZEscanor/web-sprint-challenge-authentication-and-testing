const router = require('express').Router();

const Users = require("./user-model.js");

//const restricted = require()

router.get("/", (req,res)=>{

Users.Find()
.then(users => {
    res.status(200).json(users)
})
.catch(err = res.send(err))
})

module.exports = router;