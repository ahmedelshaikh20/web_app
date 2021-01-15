const verify=require('verifyToken')
const app = require("express")
const router=app.Router()
const Request=require('../models/requests')
const User=require('../models/users')
const Course=require('../models/courses')


router.get('/requests/replacements',verify,(req,res)=>{
    
    var request=await Request.find({type:'Replacement'})

    res.send(request)
})
router.post('/requests/slotlinking/',verify,(req,res)=>{
    const request=new Request({
        type:'Slot Linking',
        senderId:req.user._id,
        course:req.body.course,
        reason:req.body.reason
    }) 
    request.save();
    var course= Course.findOne({name:req.body.course})

    var user=await User.update({coursesCoordinated:{$in:course._id}},{notifications:{$push:request._id}})
    

    res.send('slot Linking sent to coordinator')
})