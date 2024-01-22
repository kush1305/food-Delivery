const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const {body,validationResult }= require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


//should be in .env file 
const jwtSecret = process.env.REACT_APP_SECRET_KEY;



//Route 1: for sign up using POST request
router.post('/createuser',[
    body('email').isEmail(),
    body('password').isLength({min:5})
]
,async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors:result.array()});
    }

    const check= await User.findOne({'email':req.body.email})
    if(check){
      return res.json({success:"User Already exists."})
    }


    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
  
    
    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })

    res.json({success:"true"});
    
    } catch (error) {
        console.log(error);
        res.json({success:"false"});
        
    }
})

//Route 2: for login using POST request

router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({min:5})
]
,async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors:result.array()});
    }
    let {email,password}= req.body;
  
    
    try {
      let userData=  await User.findOne({email});
      if(!userData){
        return res.status(400).json({errors:"Try logging with correct credentials"})

      }

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
          return res.status(400).json({ errors: "Password error" });
      }

      const data= {
        user:{
            id:userData.id
        }
      }

      const authtoken= jwt.sign(data,jwtSecret)


    return res.json({success:true,authtoken:authtoken});
    
    } catch (error) {
        console.log(error);
        res.json({success:"false"});
        
    }
})




module.exports= router;