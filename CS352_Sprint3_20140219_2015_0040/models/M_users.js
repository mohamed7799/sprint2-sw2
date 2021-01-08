const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    userName:String,
    address:String
})

module.exports=mongoose.model('user',UserSchema)