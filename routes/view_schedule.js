const app = require("express")
const router=app.Router()
const User=require('../models/users')
const Location=require('../models/locations')
const Course=require('../models/courses')
const verify = require('./verifyToken');


router.get("",verify,async(req,res)=>{
    var user=await User.findOne({_id:req.user._id})
        
    var scheduleTemp=user.schedule;
    var schedule= await convertSchedule(scheduleTemp)
    
    res.send(schedule)
})
 async function  convertSchedule (scheduleTemp){
    var schedule=[]
    for(let element of scheduleTemp){
            var c=await Course.findOne({_id:element.course})
            var l=await Location.findOne({_id:element.location})
                schedule.push({
                    day:element.day,
                    slot:element.slot,
                    course:c.name,
                    location:l.name,
                    type:element.type
                })
         
    }
    
   
         return schedule
}
module.exports = router;
