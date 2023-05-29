const asyncHandler=require('express-async-handler')
const userModel=require('./modals/useModel')
const jwt=require('./generateToken')
const { use } = require('./useroutes/userRoute')
const { query } = require('express')


const registercontroller=asyncHandler(async(req,resp)=>{
   const {name,email,password,pic}=req.body

   if(!name || !email || !password){
    resp.send("pls enter all fields")
   }

   const userExist=await userModel.findOne({email:email})
   if(userExist){
    resp.json("email already used")
   }

   
   const newUser=await userModel.create({
    name:name,
    email:email,
    password:password,
    pic:pic
   })

   if(newUser){
    console.log("jwt-signup",jwt(newUser._id))
    resp.send({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        pic:pic,
        JWTtoken:jwt(newUser._id)

    })
   }else{
    resp.send("something is wrong")
   }
})




const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
 
   const user = await userModel.findOne({ email:email });
   console.log('f')
   if (user && (await user.matchPassword(password))) {
    console.log("jwt-login",jwt(user._id))
     res.send({
       _id: user._id,
       name: user.name,
       email: user.email,
       isAdmin: user.isAdmin,
       pic: user.pic,
       token: jwt(user._id),
     });

    
   } else {
     res.status(401);
     console.log('hh')
     throw new Error("Invalid Email or Password");
   }
 });

 
const alluser=asyncHandler(async(req,resp)=>{
  
   const keyword=req.query.search ?{
     $or:[
      {name:{$regex:req.query.search,$options:'i'}},
      {email:{$regex:req.query.search,$options:'i'}}
     ]
   }:{}
   console.log('req.user',req.user)
   const res=await userModel.find(keyword).find({ _id: { $ne: req.user._id } });
   resp.send(res)
   
})
 
module.exports={registercontroller,login,alluser};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyeWFuX2Nob3VoYW4iLCJpZCI6IjY0NThkMTRlNDEzMDBhYzBlNjVkOTI0NiIsImlhdCI6MTY4MzU0MjM1MSwiZXhwIjoxNjgzNTQ1OTUxfQ.t0ES-cPIOtOu-7_tQreScfGK5rfeDSnzkvLisJJ8YzY