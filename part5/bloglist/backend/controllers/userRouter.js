const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async(req,res) => {
  //get username name and password fields from request's body
  const {username, name, password} = req.body

  if (password.length < 3) {
    res.status(401).json({error: 'password is too short' })
   }
  //hashing the pasword
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  //create the new user with password hash

  const user = new User({
    username,
    name, 
    passwordHash
  })

  //store the resolved promise
  // value from user.save() 
  //to savedUser variable 
  const savedUser = await user.save()
  //return status 201 CREATED and the savedUser
  res.status(201).send(savedUser)

})

userRouter.get('/', async (req,res)=>{
 
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, like: 1})
  res.json(users)
})

module.exports = userRouter

