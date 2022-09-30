const router = require('express').Router();
const {registerUser,loginUser,getUser} = require("../controler/user");
const { body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

// Routes 1 : create a user using : POST "/api/user/registerUser". No login required
router.post('/registerUser',[
    body('name','Name atleast must be  3 characters').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Passward atleast must be 5 characters').isLength({ min: 5 })
 ], (req,res) =>{
      registerUser(req,res);
});

// Routes 3 : create a user using : POST "/api/user/loginUser". No login required
router.post("/loginUser",[
    body('email','Enter a valid email').isEmail(),
    body('password','password can not be blank').exists()
  ],(req,res) =>{
   loginUser(req,res);
});

// Routes 3 : create a user using : GET "/api/user/getUser".  login required
router.get("/getUser", fetchuser ,(req,res) =>{
    getUser(req,res);
});


module.exports = router;