const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/Authenticate');

require('../db/conn');
const User = require('../model/userSchema');


router.get('/',(req,res)=>{
    res.send("Hello from home")
})

//using promise:-
router.post('/register',(req,res)=>{
    console.log(req.body);
    const {name, email,phone,work,password,cpassword} = req.body;

    //validation
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: 'Plzz filled the field properly'});
    }
    if(password !== cpassword)
    return res.status(422).json({error: "Password mismatched"});
    
    //checking if user exists or not
    //checking current email with emails in database
    User.findOne({email})
    .then((userExist)=>{
        //if user exists
        if(userExist){
            return res.status(422).json({error: 'Email already exist'});
        }
         
        //create new user object
        const user = new User({name,email,phone,work,password,cpassword});

        //then save in database
        user.save().then(()=>{
            res.status(201).json({message: "user registered successfuly"});
        }).catch((err)=> res.status(500).json({error: "Failed to register"}));

    }).catch(err=>{ console.log(err); });
    // console.log(req.body);
    // console.log(req.body.name);
    // res.json({message: req.body});
    // res.send(req.body);
})

//using async:-
// router.post('/register',async (req,res)=>{
//     const {name, email,phone,address} = req.body;

//     //validation
//     if(!name || !email || !phone || !address){
//         return res.status(422).json({error: 'Plzz filled the field properly'});
//     }
    

//     try{
//          const userExist = await User.findOne({email:email});
//          if(userExist)
//          return res.status(422).json({error: "Email already exist"});

//          const user = new User({name,email,phone,address});
//          const userRegister = await user.save();

//          if(userRegister)
//            res.status(201).json({message: "User registered succesfully"});
//         else
//            res.status(500).json({error: "Failed to registered"});
//     }catch(err){
//           console.log(err);
//     }
//     //checking if user exists or not
//     //checking current email with emails in database




//     // console.log(req.body);
//     // console.log(req.body.name);
//     // res.json({message: req.body});
//     // res.send(req.body);
// })

//for login
router.post('/signin',async (req,res)=>{
    // console.log(req.body);
    try{
       const {email,password} = req.body;
       if(!email || !password)
       return res.status(400).json({error:"Plzz filled the data"});

       const userLogin = await User.findOne({email:email});
        // console.log(userLogin);
        if(userLogin){
            const isMatch = bcrypt.compareSync(password,userLogin.password);
             
            const token =await userLogin.generateAuthToken();
            // console.log(token);

            //to store in cookie
            res.cookie("jwtoken",token,{
                //automatically expires user token after 30 days
                expires:new Date(Date.now()+2592000000),
                httpOnly:true
            })

            if(!isMatch)
             res.status(400).json({error:'Invalid Credentials'});
            else
            res.status(200).json({message:"User SignIn Successfully"});
        }
        else
        res.status(400).json({error:"user error"});
    }catch(err){
        console.log(err);
    }
})

//about us :-

// router.get('/about',authenticate,(req,res)=>{
//      console.log('Hello my about');
//      res.send(req.rootUser);
// })


module.exports = router;