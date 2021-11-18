const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser.js')

//Secret String for JWT token signature
const SECRET_STRING = 'This_is_my_secret_string';

// ROUTE 1: POST Creating user at /api/auth/createuser, no login required
router.post('/createuser', [
    body('name', /*error message =>*/ 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    // If there is an error, return the bad request and error 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //Check whether the user with this email ID already exists
      let user = await User.findOne({email: req.body.email})
      if(user){
          return res.status(400).json({error: "User with this email already exists!"})
      }

      // Generating secure password
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
    
      // Create a new user
      user = await User.create({
          name: req.body.name,
          password: securePass,
          email: req.body.email
        })

      // Creating a JWT token for authentication
      const data = {
        user: {
          id: user.id 
        }
      }
      const authtoken = jwt.sign(data, SECRET_STRING);

      res.json({authtoken});

    } catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err) 
    //     res.json({error: "Please enter a unique value for email"})})
})

//ROUTE 2: POST Authenticate a user at /api/auth/login, login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    // Check is user exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(500).json({error: "Please enter valid login credentials"});
    }

    // Check if password is correct
    let passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(500).json({error: "Please enter valid login credentials"});
    }

    // Sending the response if authenticated
    const data = {
      user: {
        id: user.id 
      }
    }
    const authtoken = jwt.sign(data, SECRET_STRING);

    res.json({authtoken});
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE 3: POST Retreiving password hash from user login at api/auth/getuser, login required
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
})

module.exports = router