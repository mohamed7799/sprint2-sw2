const express=require('express');
const Note=require('../models/M_notifications');
const router=express.Router();

//get notes
router.get('/',async (req,res)=>{

    let notes=await Note.find();
    res.json(notes)
    
})

//post note
router.post('/',(req,res)=>{
    
    let note=new Note({
        userName:req.body.userName,
        userAddress:req.body.userAddress,
        message :req.body.message,
        noteType:req.body.noteType
    });
    note.save().then(data=>{res.json(data)}).catch(err=>{res.json({message:err})})
    
   
})

//delete note

router.delete('/:noteId',async(req,res)=>{
    const removedNote=await Note.deleteOne({_id:req.params.noteId})
    res.json(removedNote)
})

//update note

router.patch('/:noteId',async(req,res)=>{
    const updatedNote=await Note.updateOne(
        {_id:req.params.noteId},
        {$set:{message :req.body.message}})

    res.json(updatedNote)
})


module.exports=router
