const app = require("express")
const router=app.Router()
const User=require('../models/users')
const Request=require('../models/requests')
const verify = require('./verifyToken');

router.post('/accept',verify,async (req,res)=>{
    if(req.user.role=='HR')
        return res.status(400).send('YOU ARENT AUTHORIZED')
    try{
        var integer = parseInt(req.body.id, 10);

        var user=await User.findOne({_id:req.user._id})
        var replacement=await Request.findOne({id:integer,type:"Replacement",departement:user.departement})

        if(!replacement){
            return res.status(400).send('no replacement with that id or not the same department')            
        }

        if(replacement.senderId==req.user._id){
            return res.status(400).send('you cant accept your own request !!')            
        }
        if(replacement.status!="Pending"){
            return res.status(400).send('you cant accept a non pending request')            
        }
        var sender=await User.findOne({_id:replacement.senderId})

        if(!(user.courses.includes(replacement.courseId)||user.coursesCoordinated.includes(replacement.courseId))){
            return res.status(400).send('you arent authorized you dont share the same course')            
        }
        var schedule=user.schedule.filter((element)=>element.day==replacement.day&&element.slot==replacement.slot);
        if(schedule.length!=0){
            return res.status(400).send('you are busy that slot ')            
        }
        var senderSchedule= sender.schedule.filter((element)=>element.day==replacement.day&&element.slot==replacement.slot)
        var location=senderSchedule[0].location
        var updatedSched={
            day:replacement.day,
            slot:replacement.slot,
            location:location,
            type:"Replacement",
            course:replacement.courseId


        }
        await User.update({_id:req.user._id},{$push:{schedule:updatedSched}})
        await Request.update({id:integer},{$set:{status:"Accepted"}})
        await User.update({_id:sender._id},{$push:{notifications:replacement._id}})
        return res.send("Acceted and Schedule Updated")
        
      
    }catch(error){
        res.send(error.message)

        
    }
  

})

router.post('/reject',verify,async (req,res)=>{
    if(req.user.role=='HR'||req.user.role!="HOD")
        return res.status(400).send('YOU ARENT AUTHORIZED')
    try{
        if(!(Number.isInteger(req.body.id))){
            return res.status(400).send('please enter request id "number" in the parameter')
        }
        var user=await User.findOne({_id:req.user._id})
        var replacement=await Request.findOne({id:req.body.id,type:"Replacement",departement:user.departement})

        if(!replacement){
            return res.status(400).send('no replacement with that id and your department')            
        }
        if(replacement.senderId==req.user._id){
            return res.status(400).send('you cant accept your own request !!')            
        }
        if(replacement.status!="Pending"){
            return res.status(400).send('you cant reject a non pending request')            
        }
        var sender=await User.findOne({_id:replacement.senderId})

        await Request.update({id:req.body.id},{$set:{status:"Rejected"}})
        await User.update({_id:sender._id},{$push:{notifications:replacement._id}})
        return res.send("Rejected Done")
        
      
    }catch(error){
        res.send(error.message)

        
    }
  

})



module.exports=router
