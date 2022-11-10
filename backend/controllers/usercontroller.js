const User= require('../models/user');
const ErrorHandler= require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const cloudinary = require('cloudinary');
const catchAsyncErrors= require('../middlewares/catchAsyncErrors')

exports.registerUser=  catchAsyncErrors( async (req,res,next)=>{
    if(req.body.avatar == ''){
        return next(new ErrorHandler('please select a profile pic', 400))
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })
    const {name, address, email, password}= req.body;
 

    const user= await User.create({
        name,
        address,
        email,
        password,
        
        avatar:
        {
            public_id: result.public_id,
            url: result.secure_url
        }
        
    
    })
      sendToken(user,200,res);
}
)


exports.loginUser=  catchAsyncErrors( async (req,res,next)=>{
    const {email,password}= req.body;

    if(!email || !password){
       return next(new ErrorHandler('please enter email & password', 400))
    }

    const user= await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401 ));
    }
    const isPasswordMatched= await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401 ));
    }
    sendToken(user, 200, res);
})


exports.logout=  catchAsyncErrors( async(req,res,next)=>{
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true 
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

exports.getUserProfile=  catchAsyncErrors( async (req,res,next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

exports.getUserFriend=  catchAsyncErrors( async (req,res,next)=>{
  let user= await User.findById(req.user.id)
    const friends= await Promise.all(
        user.friend_id.map(elem=>{
           return User.findById(elem.f_id)
       })
    )
    let friendList=[];
     friends.map(friend=>{
       const{_id, name, avatar}= friend;
       friendList.push({_id,name,avatar})

     })
     


     
  
 
    
     
    

    res.status(200).json({
        
        friendList
        
        
    })
})

exports.allUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address

        
    }

    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
       
    })

    res.status(200).json({
        success: true
    })
})


exports.addFriend = catchAsyncErrors( async (req, res, next) => {

    let user = await User.findById(req.user.id);
     let len= user.friend_id.length;
     let usercheck=''
    
    
    
     
    user.friend_id.forEach(elem=>{
     usercheck= elem.f_id.includes(req.params.id)
    
    })

    
    if(!usercheck ){
        user.friend_id.push({
            f_id: req.params.id
        })
        user.save();
      
        
    
    }
    else{
       return next(new ErrorHandler('Already a Friend'))
    }
    res.status(200).json({
        success: true,
        
        
        
    })


   
  
   })
      
     
     

   
   


  

 


exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');


    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})
    

