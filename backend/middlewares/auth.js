const ErrorHandler = require("../utils/errorHandler");
const jwt= require('jsonwebtoken');
const User= require('../models/user')

exports.isAuthenticatedUser = async(req,res,next)=>{

    const { token }= req.cookies
    
    
    if(!token){
        return next( new ErrorHandler('please login to access this',401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user= await User.findById(decoded.id);
    next()
}