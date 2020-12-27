const mongoose=require('mongoose');

const NoteSchema=mongoose.Schema({
    userName:String,
    userAddress:String,
    message :String,
    noteType:String
})

module.exports=mongoose.model('sms_notification',NoteSchema)