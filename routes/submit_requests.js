const app = require("express")
const router=app.Router()
const User=require('../models/users')
const Course=require('../models/courses')
const Request=require('../models/requests')
const mongoose = require("mongoose");
const verify = require('./verifyToken');
const { string } = require("@hapi/joi")
const {validateCancel,validateLeave,validateChangeDayOff,validateSlotLinking,validateReplacement, validateViewSubmittedRequests} = require('./validate_requester');
const { request } = require("express")


router.get('/viewReplacement',verify,async(req,res)=>{
    if(req.user.role=='HR')
             return  res.status(404).send('YOU ARENT AUTHORIZED')
   try{
    var user=await User.findOne({_id:req.user._id})
    var requests=await Request.find({departement:user.departement,type:'Replacement',courseId:{$in:user.courses}})
    if(requests.length==0){
        return res.status(404).send('No Replacement Requests Yet')
    }
    var replacements=[];
    for(let element of requests){
        var sender=await User.findOne({_id:element.senderId})
        var course=await Course.findOne({_id:element.courseId})
        var temp={
            requestId:element.id,
            sender:sender.email,
            course:course.name,
            reason:element.reason,
            status:element.status,
            comment:element.comment,
            day:element.day,
            dateOfLeave:element.dayOfTheLeave
                }
        replacements.push(temp)
    }
    res.send(replacements)

   }catch(error){
       
    res.send(error)

   }
})
router.post('/send/replacement',verify,async (req,res)=>{//day,//reason,coursename,dateOfLeave
    if(req.user.role=='HR')
        return res.status(400).send('YOU ARENT AUTHORIZED')
    try{
        const {error}=validateReplacement(req.body)
        if(error) return res.status(400).send(error.details[0].message);

        var user=await User.findOne({_id:req.user._id})
        var course=await Course.findOne({id:req.body.courseId})

        var d=new Date(req.body.dateOfLeave)
        var checkDay=false;
      
        for(let element of user.schedule){
            if(element.day==req.body.day||req.body.slot==element.slot){
                checkDay=true
            }
        }
        
        if(checkDay){
            if(user.annualLeaves>0.5){
                var r=await Request({
                    type:'Replacement',
                    senderId:req.user._id,
                    reason:req.body.reason,
                    courseId:course,
                    departement:user.departement,
                    day:req.body.day,
                    slot:req.body.slot,
                    dayOfTheLeave:d.setHours(2,0,0,0)
                    
                })
                await r.save()
                return res.send('Replacement Sent')
            }else{
                res.send('you dont have remaining annual leave balance')
            }
        }
        else{
            res.send('you have nothing at that time')
        }
    }catch(error){
        res.send(error.message)

        
    }
  

})
router.post('/send/slotLinking',verify,async (req,res)=>{//day,//reason,coursename,slot,dateOflinking
   

    if(req.user.role=='HR')
    return res.send('YOU ARENT AUTHORIZED')
try{
    const {error}=validateSlotLinking(req.body)
    if(error) return res.status(400).send(error.details[0].message);


        var user=await User.findOne({_id:req.user._id})
        var course=await Course.findOne({id:req.body.courseId})
                var checkDay=false;
            for(let element of user.schedule){
            if(element.slot==req.body.slot){
                checkDay=true
            }
            }
if(!checkDay){
   var r=await Request({
       type:'Slot Linking',
       senderId:req.user._id,
       courseId:course,
       departement:user.departement,
       day:req.body.day,
       slot:req.body.slot
   })
   
        await r.save()
        var coordinator=await User.updateOne({userType:'CC',coursesCoordinated:{$in:course._id}},{$push:{notification:r._id}});
        res.send('Request Sent')
}
else{
   res.send('you are busy at this slot')
}

}catch(error){
    return res.send(error)
}
  

})
router.post('/send/changeDayOff',verify,async (req,res)=>{//daytobereplaced,//requested-day,//reason
    if(req.user.role=='HR')
    return res.send('YOU ARENT AUTHORIZED')
   try {
    const {error}=validateChangeDayOff(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    var user=await User.findOne({_id:req.user._id})
    if(!user.daysOff.includes(req.body.dayToBeReplaced)){
        return res.send('you dont have this day as a day off ')
    }
    if(user.daysOff.includes(req.body.dayWanted)){
        return res.send('you already have this day as a day off ')
    }else{
        var r=await Request({
            type:'Change day off',
            senderId:req.user._id,
            reason:req.body.reason,
            departement:user.departement,
            day:req.body.dayWanted,
            dayToBeReplaced:req.body.dayToBeReplaced
        })

        try{
            await r.save()}
            catch(err){
              return res.send(err)}
        var hod=await User.updateOne({userType:'HOD',departement:user.departement},{$push:{notification:r._id}});

        res.send('Request Sent')
    }
   } catch (error) {
       return res.send(error)
   }
  

})
router.post('/send/leaveRequest',verify,async (req,res)=>{//typeOfLeave,reason,dateOfLeave'MM/DD/YYYY,daytobereplaced
if(req.user.role=='HR')
return res.send('YOU ARENT AUTHORIZED')
try {
    const {error}=validateLeave(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    
const oneDay = 24 * 60 * 60 * 1000
const current=new Date().setHours(0,0,0,0)

    var user=await User.findOne({_id:req.user._id})

    const type=req.body.leaveType;
    const dateofLeave=new Date(req.body.dateOfLeave).setHours(2,0,0,0)

    if(type!='Compensation'){

        if(type=='MLeave'){
            if(user.gender!='f')
                return res.send('Meternity leave is only for females !')
            if(!req.body.reason){
                return  res.send('please enter document to prove in "reason" field')
            }else{
            var r=await Request({
                type:req.body.leaveType,
                senderId:req.user._id,
                reason:req.body.reason,
                departement:user.departement,
                dayOfTheLeave:dateofLeave
            })
            
            await r.save()
            var hod=await User.updateOne({userType:'HOD',departement:user.departement},{$push:{notification:r._id}});
            return res.send('Done')

        }

        }
        if(type=='SLeave'){
            if(!req.body.reason){
                return    res.send('please enter document to provein "reason" field')
            }
            
            const date=new Date(req.body.dateOfLeave);
            const diffDays = Math.round(Math.abs((date - current) / oneDay));
            if(diffDays>3&& current>date){
                res.send('the requested sick leave canot be submitted you are beyond deadline 3days after the sick day')
            }else {
                var r=await Request({
                    type:req.body.leaveType,
                    senderId:req.user._id,
                    reason:req.body.reason,
                    departement:user.departement,
                    dayOfTheLeave:date,
                })
        
                await r.save()
                var hod=await User.updateOne({userType:'HOD',departement:user.departement},{$push:{notification:r._id}});
                return res.send('Done')

            }
        }
        if(type=='ALeave'){/////////////////////////TODO

            if(current>req.body.dateOfLeave){
                return  res.send('you cant send an accident leve before the leave please enter a future date !!!')
            }else{
                if(user.accidentalLeaves<=0 || user.annualLeaves <=0.5){
                    return  res.send('you dont have any remaining accidental leaves or annual Leaves !')
                }else{
                    var r=await Request({
                        type:req.body.leaveType,
                        senderId:req.user._id,
                        reason:req.body.reason,
                        departement:user.departement,
                        dayOfTheLeave:dateofLeave,
                    })
            
                    await r.save()
                    var hod=await User.updateOne({userType:'HOD',departement:user.departement},{$push:{notification:r._id}});
                    return res.send('Done')
                }
            }
        }//////////////////////////////////////////////////////////////////////////////


    }else{
        if(!req.body.reason||!req.body.dayToBeReplaced){
            return  res.send('please enter Required data >>> reason of compenstaion a String, dayToBeReplaced A string day of the week where it is the compensation day')
        }
        else{
            
            if(!user.daysOff.includes(req.body.dayToBeReplaced))
                return res.status(400).send(`your day off isnt ${req.body.dayToBeReplaced}`)
            var r=await Request({
                type:req.body.leaveType,
                senderId:req.user._id,
                reason:req.body.reason,
                departement:user.departement,
                dayOfTheLeave:req.body.dateOfLeave,
                dayToBeReplaced:req.body.dayToBeReplaced
            })
            await r.save()
            var hod=await User.updateOne({userType:'HOD',departement:user.departement},{$push:{notification:r._id}});
            res.send(`Request sent with ${req.body.dayToBeReplaced} as the day you shall compensate the leave`)

        }
    }
  
} catch (error) {
    return res.send(error)
}

})



router.post('/cancelRequest',verify,async (req,res)=>{//id of request
    if(req.user.role=='HR')
    return res.send('YOU ARENT AUTHORIZED')

   try {
    const {error}=validateCancel(req.body)
    if(error) return res.status(400).send(error.details[0].message);
        var request=await Request.findOne({id:req.body.id})
        if(!request){
           return res.status(404).send('NOT A VALID REQUEST ID')
        }
        if(request.senderId!=req.user._id)  {
            return res.send('You arent authorized TO CANCEL this Request')
        }
        if(request.status!='Pending'){
            return  res.send('You cant Cancel A non Pending Request')
        }else{
             if(request.dayOfTheLeave<new Date())
                {
                    return   res.send('the time has passed')
                }else{
                   await Request.deleteOne({id:req.body.id})
                   res.send('canceled !')
                }
            
        }
       
   } catch (error) {
       return res.send(error)
   }
})
router.get('/viewSubmittedRequests',verify,async (req,res)=>{//filter
    if(req.user.role=='HR')
    return res.send('YOU ARENT AUTHORIZED')
 try {
     
       
    const {error}=validateViewSubmittedRequests(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    var user=await User.findOne({_id:req.user._id})

    var requests=await Request.find({senderId:req.user._id}).then((reqs)=>{
        if(req.body.filter){
            return reqs.filter((r)=>r.status==req.body.filter)
        }else{
            return reqs
        }
    })
    

    if(requests.length==0&&req.body.filter){
        return    res.send(`No ${req.body.filter} Requsets`)
    }
    if(requests.length==0){
        return    res.send('No Submitted Requests')
    }
    var toView=[]
    for(let element of requests){
        switch (element.type){
            case 'Replacement':
                var c=await Course.findOne({_id:element.courseId})
                var temp={
                    id:element.id,
                    type:element.type,
                    course:c.name,
                    reason:element.reason,
                    status:element.status,
                    comment:element.comment,
                    day:element.day,
                    dateOfLeave:element.dayOfTheLeave,
                    comment:element.comment
                }
                toView.push(temp);
                break;
            case 'Slot Linking':
                var c=await Course.findOne({_id:element.courseId})
                var temp={
                    id:element.id,
                    type:element.type,
                    reason:element.reason,
                    course:c.name,
                    status:element.status,
                    day:element.day,
                    dateOfLink:element.dayOfTheLeave,
                    comment:element.comment

                }
                toView.push(temp);
                break;
            case 'Change day off':
                var temp={
                    id:element.id,
                    type:element.type,
                    reason:element.reason,
                    status:element.status,
                    day:element.day,
                    dayToBeReplaced:element.dayToBeReplaced,
                    comment:element.comment

                }
                toView.push(temp);
                break;
             case 'Compensation':
                 var temp={
                    id:element.id,
                    type:element.type,
                    status:element.status,
                    reason:element.reason,
                    dateOfTheLeave:element.dayOfTheLeave,
                    dayToBeReplaced:element.dayToBeReplaced,
                    comment:element.comment

                 }
                 toView.push(temp);
                break;
            default:
                var temp={
                    id:element.id,
                    type:element.type,
                    status:element.status,
                    reason:element.reason,
                    dateOfTheLeave:element.dayOfTheLeave,
                    comment:element.comment

                }
                 toView.push(temp);
                break;
                

        }
        
    }
    return res.send(toView)

 } catch (error) {
     return res.send(error)
 }


})




function isValidDate(dateString) {
    var regEx = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/;

    if(!dateString.match(regEx)) return false;
      // Invalid format
   return true;
  }

module.exports=router



//            var temp=await  User.updateOne({_id:req.user._id},{$inc:{annualLeaves:-1}})
