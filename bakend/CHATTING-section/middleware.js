const asyncHandler=require("express-async-handler")
const userModel=require('./modals/useModel')
const jwt=require("jsonwebtoken")

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log('oooooo')
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
       
      try {
        token = await req.headers.authorization.split(" ")[1];
        console.log('token',token)
         
        const decoded =await jwt.verify(token,process.env.SECRET_KEY);
        
        req.user = await userModel.findById(decoded.id).select("-password");
        
        next();
      } catch (error) {
        console.log("kkk")
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  
  module.exports = { protect };