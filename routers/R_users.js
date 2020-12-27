const express=require('express');
const User=require('../models/M_users');
const router=express.Router();

//get users
router.get('/',async (req,res)=>{

    let users=await User.find();
    res.json(users)
    
    
})

//post users
router.post('/',(req,res)=>{
    
    let user=new User({
        userName:req.body.userName,
        address:req.body.address
    });
    user.save().then(data=>{res.json(data)}).catch(err=>{res.json({message:err})})
    
})

module.exports=router
