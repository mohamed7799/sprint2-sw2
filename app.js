const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const mailNote=require('./models/M_queued_mail_notes');
const smsNote=require('./models/M_queued_sms_notes');
const app=express();
app.use(bodyParser.json());

//routes
const usersRoute=require('./routers/R_users');
app.use('/users',usersRoute)

const notesRoute=require('./routers/R_notifications');
app.use('/notes',notesRoute)

app.get('/',(req,res)=>{
    res.send("main page")
})

// connect to DB
mongoose.connect('mongodb+srv://mohamed:mohamed@cluster0.oetao.mongodb.net/mohamed?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
    console.log("we are connected")
})
//listen
app.listen(3000);


////////////////////////////////index

let notesTemps = {
    logIn: { data: "you have logged in!", type: "login" },
    signUp: { data: "your sign up is complete", type: "signup" },
    forgPass: { data: "this note for forgetting your password", type: "forgetpassowrd" },
    deals: { data: "there are new deals to check", type: "deals" }
}

let User = function (name, address) {
    this.userName = name;
    this.userAddress = address;
}

let Notification = function (userName, userAddress,message, noteType) {
    this.userName=userName;
    this.userAddress=userAddress;
    this.message =message;
    this.noteType=noteType;
}

let notification_control = {
    notList: [],
    getNote: function (index) { return this.notList[index - 1] },
    getAllNote: function () { return this.notList },
    addNote: function (userName, userAddress,messageType, noteType) {
        let messageTemp=`hi ${userName} ${messageType.data}`
        this.notList.push(new Notification(userName, userAddress,messageTemp, noteType));
    },
    updateNote: function (index, proprty, newValue) {
        this.notList[index - 1][proprty] = newValue;
    },
    deleteNote: function (index) {
        this.notList.splice(index - 1, 1);

    },
}


let NotificationQueuing={
    smsQueue:[],
    mailQueue:[],
    add_sms_note:function(userName,userAddress,messageType,noteType="sms"){
        
        let messageTemp=`hi ${userName} ${messageType.data}`
        this.smsQueue.push(new Notification(userName, userAddress,messageTemp, noteType));
        let note=new smsNote({
            userName:userName,
            userAddress:userAddress,
            message :messageTemp,
            noteType:noteType
        });
        note.save().then(data=>json(data)).catch(err=>{res.json({message:err})})
    },
    add_mail_note:function(userName,userAddress,messageType,noteType="mail"){
    
        let messageTemp=`hi ${userName} ${messageType.data}`
        this.mailQueue.push(new Notification(userName, userAddress,messageTemp, noteType));
        let note=new mailNote({
            userName:userName,
            userAddress:userAddress,
            message :messageTemp,
            noteType:noteType
        });
        note.save().then(data=>json(data)).catch(err=>{res.json({message:err})})
    },

    printQueue:function(queueType){
        console.log(this[`${queueType}Queue`])
    }
}


let users = [new User('mohamed', 'm@mail.com'),
new User('emad', '010026263'),
new User('amr', 'a@mail.com'),
new User('glal', 'g@mail.com'),
new User('ahmed', '011115861'),
new User('omer', '011555592')]



//add sms notes
/*
NotificationQueuing.add_sms_note(users[1].userName,users[1].userAddress,notesTemps.logIn);
NotificationQueuing.add_sms_note(users[4].userName,users[4].userAddress,notesTemps.logIn);
NotificationQueuing.add_sms_note(users[5].userName,users[5].userAddress,notesTemps.logIn);
*/
//add mail notes
/*
NotificationQueuing.add_mail_note(users[0].userName,users[0].userAddress,notesTemps.logIn);
NotificationQueuing.add_mail_note(users[2].userName,users[2].userAddress,notesTemps.logIn);
NotificationQueuing.add_mail_note(users[3].userName,users[3].userAddress,notesTemps.logIn);
*/


