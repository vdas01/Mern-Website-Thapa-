const mongooose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
         type: String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


//hash password
const bcrypt = require('bcryptjs');
userSchema.pre('save',async function(next){
    //method is called when password is changed by user
   if(this.isModified('password')){
        // this.password =  bcrypt.hashSync(this.password,12);
        // this.cpassword =  bcrypt.hashSync(this.cpassword,12);
        //OR
        this.password =await  bcrypt.hash(this.password,12);
        this.cpassword =await  bcrypt.hash(this.cpassword,12);
   }
   next();
});

//generating token
//everytime user login token gets generated
userSchema.methods.generateAuthToken = async function(){
    try{
          let tokenV = jwt.sign({_id:this._id},process.env.SECRET_KEY);
          this.tokens = this.tokens.concat({token:tokenV});
          await this.save();
          return tokenV;
    }catch(err){
        console.log(err);
    }
}

//collection name
const User = mongooose.model('USER', userSchema);

module.exports = User;