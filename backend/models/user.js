const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const userSchema= new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
        maxLength: [500, 'Your name cannot exceed 500 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    friend_id: [
        {
        f_id: {
            type: String,
            required: false
        }
    }
     ],
 
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password= await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.methods.getJwtToken =  function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
}

module.exports= mongoose.model('User', userSchema);

