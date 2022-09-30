const {  validationResult } = require('express-validator');
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'harshisagoodb$oy';

const registerUser = async (req,res) =>{
    let success = false;
    //If there are errors, Return bad request and  the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {name,email,password} = req.body;
  
   // check whether the user with this  email exist already
 
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success:success,error:'sorry a user with this email already exists'})
    }
  
 
    // create hashing password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password,salt);
 
    //create new user
   user = await  User.create({ name, email, password:secPass});
 
     //generate json web token
    const data ={
      user:{
        id:user.id
      }
    } 
    const authToken =  jwt.sign(data,JWT_SECRET);
 
      // res.json(user);
      success = true;
     return res.json({success:success,authToken:authToken,response:user});
    
     } catch (error) {
       console.error(error.message);
      return res.status(500).send("Inertnal Server Error");
     }
}

const loginUser = async (req,res) =>{
    
  let success = false;
  //If there are errors, Return bad request and  the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;
 try {
   let user = await User.findOne({email});
   if(!user){
     return res.status(400).json({errors:'please try to login with correct credentials'});
   }
   const passwordCompare = await bcrypt.compare(password,user.password);
   if(!passwordCompare){
    success = false;
    return res.status(400).json({success:success,errors:'please try to login with correct credentials'});
   }

   const data ={
    user:{
      id:user.id
    }
  }
  const authToken =  jwt.sign(data,JWT_SECRET);
   success = true;
 return res.json({success:success,authToken:authToken,response:user});

 }catch (error) {
  console.error(error.message);
  return res.status(500).send("Inertnal Server Error");
}


}

const getUser = async (req,res) =>{ 
try {
    const userId=req.user.id;
     const user = await User.findById(userId).select('-password');
    return res.send(user)
   } catch (error) {
     console.error(error.message);
    return res.status(500).send("Inertnal Server Error");
   }
}




module.exports = {registerUser,loginUser,getUser}