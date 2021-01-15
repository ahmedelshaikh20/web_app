const router = require('express').Router();
const Locations = require('../models/locations');
const Faculties = require('../models/Faculties');
const Departements = require('../models/departements');
const Courses = require('../models/courses');
const Users = require('../models/users');
const Requests = require('../models/requests');
const Attendance = require('../models/attendance');
const verify = require('./verifyToken');
const {
    // addLocationValidation,
    // updateLocationValidation,
    // addFacultyValidation,
    // addDepartmentValidation,
    // addCourseValidation,
    // updateFacultyValidation,
    // updateDepartmentValidation,
    // deleteLocationValidation,
    // deleteFacultyValidation,
    // deleteDepartmentValidation,
    // deleteCourseValidation,
    // courseCoverageValidation,
    // viewCourseStaffValidation,
    // assignToSlotValidation,
    // deleteSlotAssignmentValidation,
    // assignCourseCoordinatorValidation,
    // removeAssignedMemberValidation,
    // updateSlotAssignmentValidation,
    viewSlotLinkingRequestsValidation,
    addCourseSlotValidation,
    deleteCourseSlotValidation,
    updateCourseSlotValidation,
    acceptSlotLinkingRequestValidation
} = require('./validation');
const { number, boolean } = require('@hapi/joi');
const { json } = require('express');
const courses = require('../models/courses');




async function coverage(id) {


    
        
        
    var coverage;
    
    var numberOfCourses = 0;
    
   
    
    
   
    
    


        
    
    var d = await Courses.findOne({_id:id});

    
    
    
        
    
      
      

       

        

            for(let element of d.slots){
                
                    numberOfCourses++
                

            }

        
        

    
    
    coverage = (numberOfCourses / d.teachingSlots) * 100;
    
    return coverage;
    
}










router.get('/viewSlotLinkingRequests',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= viewSlotLinkingRequestsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var userA = await Users.findOne({_id:req.user});
    // var userA = await Users.findOne({name:"Daniel"});
    var query = [];
    var query2 = await Requests.find();
    var j;
    // if(!userA.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    for(let element of userA.coursesCoordinated){
    
    
    for(j = 0; j < query2.length; j++){
        
        if(query2[j].courseId.equals(element) && !query2[j].status.localeCompare("Pending") && !query2[j].type.localeCompare("Slot Linking")){

            query.push(query2[j]);
            
        }
    }
    

    
    
    
    }
    var i;
    var resultF = [];
    for(i = 0;i < query.length;i++){
        var s1 = await Users.findOne({_id:query[i].senderId});
        var c1 = await Courses.findOne({_id:query[i].courseId});
        // console.log(s1);
        // console.log(c1);
        var id = query[i].id;
        var type = query[i].type;
        var senderId = s1.id;
        var status = query[i].status;
        var courseId = c1.id;
        var reason = query[i].reason;
        var day = query[i].day;
        var dayToBeReplaced = query[i].dayToBeReplaced;
        var dayOfTheLeave = query[i].dayOfTheLeave;
        var slot = query[i].slot;
       
        
            
        var temp = {"ID":id,"Type":type, "Sender ID":senderId, "Status":status, "Course ID": courseId, "Reason": reason, "Day": day, "Day To Be Replaced": dayToBeReplaced, "Day Of The Leave": dayOfTheLeave, "Slot":slot};
       

        resultF.push(temp);
        // console.log(resultF);


    }
    
    // if(resultF.length == 0){
    //     return res.status(400).send('You Do Not Have Any Pending Requests!');
    // }
    // else{
    res.send(resultF);
    // }


    
    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


router.post('/addCourseSlot',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= addCourseSlotValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var currentCourse = await Courses.findOne({id:req.body.course});
    var currentSlot = req.body.slot;
    var currentDay = req.body.day
    var currentLocation =await Locations.findOne({name:req.body.location});
    if(!currentCourse) return res.status(400).send('Could Not Find Course');
    if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!currentLocation) return res.status(400).send('Could Not Find Location');
    if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');


    
    if(!m.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    
    var flag = false;
    for(let element of m.coursesCoordinated){
        if(element.equals(currentCourse._id)){
            flag = true;
        }
    }

    if(!flag) return res.status(400).send('You Do Not Coordinate The Course You Entered!');

    var k = await coverage(currentCourse._id);
    
    if(k >= 100) return res.status(400).send('The Course You Entered Reached The Maximum Number Of Teaching Slots!');
    
    var f2 = false;

    var query = await Courses.find();

    var i;
    var j;
    var z;

    for(i = 0; i < query.length; i++){

        var currentSlots = query[i].slots;
        for(let element of currentSlots){
            
            if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && element.location.equals(currentLocation._id)){
                
                return res.status(400).send('The New Slot You Entered Can NOT Be Entered Due To A Conflict With Another Slot On The Same Day, Slot & Location!');


            }




        }
    }

    var s2 = [];

    s2.push({day:currentDay, slot:currentSlot, location:currentLocation._id, available:true});
    await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s2}});
    res.send("New Slot Successfully Inserted!");
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})

router.post('/deleteCourseSlot',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= deleteCourseSlotValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var currentCourse = await Courses.findOne({id:req.body.course});
    var currentSlot = req.body.slot;
    var currentDay = req.body.day
    var currentLocation =await Locations.findOne({name:req.body.location});
    if(!currentCourse) return res.status(400).send('Could Not Find Course');
    if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!currentLocation) return res.status(400).send('Could Not Find Location');
    if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');


    
    if(!m.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    
    var flag = false;
    for(let element of m.coursesCoordinated){
        if(element.equals(currentCourse._id)){
            flag = true;
        }
    }

    if(!flag) return res.status(400).send('You Do Not Coordinate The Course You Entered!');


    
    var f2 = false;
    var f3 = false;
    

    var i;
    var j;
    var z;

    

        var currentSlots = currentCourse.slots;
        for(let element of currentSlots){
            
            if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && element.location.equals(currentLocation._id)){
                
                f2 = true;
                if(!element.available){
                    f3 = true;
                }

            }




        }
    


        if(!f2){

            return res.status(400).send('We Could Not Find The Slot You Entered!');
        }

        else if(f3){

            return res.status(400).send('We Can Not Delete This Slot As It Is Already Assigned To An Academic Member. Please Refer To The Course Instructor First In Order To Remove The Assigned Member!');

        }

        else{

            await Courses.update( // select your doc in moongo
                {_id:currentCourse._id}, // your query, usually match by _id
                { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation, available:true} } } , // item(s) to match from array you want to pull/remove
                { multi: true } // set this to true if you want to remove multiple elements.

                
            )

            res.send("Slot Deleted Successfully!");

        }


    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})



router.post('/updateCourseSlot',verify,async (req, res) => {
        
        
    try{
    
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= updateCourseSlotValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var currentCourse = await Courses.findOne({id:req.body.course});
    var currentSlot = req.body.slot;
    var currentDay = req.body.day
    var currentLocation =await Locations.findOne({name:req.body.location});
    var newLocation =await Locations.findOne({name:req.body.newLocation});
    var newSlot = req.body.newSlot;
    var newDay = req.body.newDay;

    
    if(!currentCourse) return res.status(400).send('Could Not Find Course');
    if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!currentLocation) return res.status(400).send('Could Not Find Location');
    if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');
    if(!(newSlot == "First" || newSlot == "Second" || newSlot == "Third" || newSlot == "Fourth" || newSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(newDay != "Sunday" && newDay != "Monday" && newDay != "Tuesday" && newDay != "Wednesday" && newDay != "Thursday" && newDay != "Friday" && newDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!newLocation) return res.status(400).send('New Location Is Invalid');
    if(!newLocation.type.localeCompare("offices")) return res.status(400).send('The New Location You Entered Is An Office!');

        
    
    if(!m.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    
    var flag = false;
    for(let element of m.coursesCoordinated){
        if(element.equals(currentCourse._id)){
            flag = true;
        }
    }

    if(!flag) return res.status(400).send('You Do Not Coordinate The Course You Entered!');


    
    var f2 = false;
    var f3 = false;
    var f4 = false;
    var f5 = false;

    var i;
    var j;
    var z;

    

        var currentSlots = currentCourse.slots;
        for(let element of currentSlots){
            
            if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && element.location.equals(currentLocation._id)){
                
                f2 = true;
                if(!element.available){
                    f3 = true;
                }
                

            }




        }

        var query = await Courses.find();
        
        for(i = 0; i < query.length;i++){
            currentSlots = query[i].slots
        for(let element of currentSlots){
            
            if(!element.day.localeCompare(newDay) && !element.slot.localeCompare(newSlot) && element.location.equals(newLocation._id)){
                
                f4 = true;

                

            }




        }
    }

        
    


        if(!f2){

            return res.status(400).send('We Could Not Find The Slot You Entered!');
        }

        else if(f3){

            return res.status(400).send('We Can Not Update This Slot As It Is Already Assigned To An Academic Member. Please Refer To The Course Instructor First In Order To Remove The Assigned Member!');

        }

        else if(f4){

            return res.status(400).send('The New Slot You Entered CAN NOT Be Added To This Course Due To A Conflict With Another Slot!');

        }

        else{

            
            
            
            await Courses.update( // select your doc in moongo
                {_id:currentCourse._id}, // your query, usually match by _id
                { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation._id, available:true} } } , // item(s) to match from array you want to pull/remove
                { multi: true } // set this to true if you want to remove multiple elements.
            )

            
            var s3 = [];
            s3.push({day:newDay, slot:newSlot, location:newLocation._id, available:true});


            await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s3}});

            res.send("Slot Updated Successfully!");

        }


    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


router.post('/acceptSlotLinkingRequest',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= acceptSlotLinkingRequestValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var currentUser = await Users.findOne({_id:req.user});
    
    var reqq = await Requests.findOne({id:req.body.id});
    if(!reqq) return res.status(400).send('Invalid Request ID!');
    var sender = await Users.findOne({_id:reqq.senderId});
    var currentDay = reqq.day;
    var currentSlot = reqq.slot;
    var type = reqq.type;
    var status = reqq.status;
    var currentCourse = await Courses.findOne({_id:reqq.courseId});
    
    if(status.localeCompare("Pending")) return res.status(400).send('The Request Is Already Accepted/Rejected!');
    if(type.localeCompare("Slot Linking")) return res.status(400).send('The Request Is Not A Slot Linking Request!');
    if(!m.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    if(!sender) return res.status(400).send('The Sender Is Not In Our Database!');
    if(!currentCourse) return res.status(400).send('The Course Related To This Request Is Not In Our Database!');

    var flag = false;
    for(let element of m.coursesCoordinated){
        if(element.equals(currentCourse._id)){
            flag = true;
        }
    }

    if(!flag) return res.status(400).send('You Do Not Coordinate The Course Related To This Request!');

    var f3 = false;
    for(let element2 of sender.courses){


        if(element2.equals(currentCourse._id)){

            f3 = true;

        }


    }

    if(!f3) return res.status(400).send('The Sender Of The Request Is No Longer Assigned To The Course In The Request!');
    
    var i;
    var f2 = false;
    var s = [];
    var query = await Courses.find();
    for(i = 0; i < query.length && f2 == false;i++){
        currentSlots = query[i].slots;
        for(let element of currentSlots){
            if(!f2){
            if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && element.available && query[i]._id.equals(currentCourse._id)){
                
            f2 = true;
            var currentLocation = await Locations.findOne({_id:element.location});
            s.push({day:currentDay, slot:currentSlot, course:currentCourse._id, location:currentLocation._id, type:"Normal"})
            
            


            var s2 = [];
            s2.push({day:currentDay, slot:currentSlot, location:currentLocation._id, available:false});
             await Courses.update( // select your doc in moongo
                {_id:currentCourse._id}, // your query, usually match by _id
                { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation._id, available:true} } } , // item(s) to match from array you want to pull/remove
                { multi: true } // set this to true if you want to remove multiple elements.
             )
            
            await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s2}});




            
            await Users.updateOne({_id:sender._id}, {$push: { schedule:s}});
            await Requests.updateOne({id:reqq.id}, {$set: { status:"Accepted"}});
            
            await Users.updateOne({_id:sender._id}, {$push: { notification:reqq._id}});
            await Users.updateOne({_id:currentUser._id}, {$pull: { notification:reqq._id}});

             return res.send("Request Accepted!");





        }




    }

    }


    }


        if(!f2){

            return res.status(400).send('The Request Can Not Be Accepted Due To The Slot Not Being Available OR Have Been Removed OR Updated!');



        }



    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


router.post('/rejectSlotLinkingRequest',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    const {error}= acceptSlotLinkingRequestValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    var currentUser = await Users.findOne({_id:req.user});
    
    var reqq = await Requests.findOne({id:req.body.id});
    if(!reqq) return res.status(400).send('Invalid Request ID!');
    var sender = await Users.findOne({_id:reqq.senderId});
    var currentDay = reqq.day;
    var currentSlot = reqq.slot;
    var type = reqq.type;
    var status = reqq.status;
    var currentCourse = await Courses.findOne({_id:reqq.courseId});
    
    if(status.localeCompare("Pending")) return res.status(400).send('The Request Is Already Accepted/Rejected!');
    if(type.localeCompare("Slot Linking")) return res.status(400).send('The Request Is Not A Slot Linking Request!');
    if(!m.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    if(!sender) return res.status(400).send('The Sender Is Not In Our Database!');
    if(!currentCourse) return res.status(400).send('The Course Related To This Request Is Not In Our Database!');

    var flag = false;
    for(let element of m.coursesCoordinated){
        if(element.equals(currentCourse._id)){
            flag = true;
        }
    }

    if(!flag) return res.status(400).send('You Do Not Coordinate The Course Related To This Request!');
    
    
            await Requests.updateOne({id:reqq.id}, {$set: { status:"Rejected"}});
            
            await Users.updateOne({_id:sender._id}, {$push: { notification:reqq._id}});
            await Users.updateOne({_id:currentUser._id}, {$pull: { notification:reqq._id}});

             return res.send("Request Rejected!");



    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})





router.get('/viewCourseSlots',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "CC") return res.status(400).send('Only Course Coordinators Are Allowed To Use This Functionality');
    // const {error}= viewSlotLinkingRequestsValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    
    var userA = await Users.findOne({_id:req.user});
    // var userA = await Users.findOne({name:"Daniel"});
    var query = [];
    var query2 = await Courses.find();
    var j;
    // if(!userA.coursesCoordinated) return res.status(400).send('You Do Not Coordinate Any Course!');
    for(let element of userA.coursesCoordinated){
    
    
    for(j = 0; j < query2.length; j++){
        
        if(query2[j]._id.equals(element)){

            query.push(query2[j]);
            
        }
    }
    

    
    
    
    }
    var i;
    var resultF = [];
    for(i = 0;i < query.length;i++){
        var temp = [];
        var name = query[i].name;
 
        
        for(let element of query[i].slots){
            var location = await Locations.findOne({_id:element.location});
            var available1  = element.available;
            if(available1) var available = "Yes"
            else var available = "No"
            temp.push({"Day":element.day, "Slot":element.slot, "Location":location.name, "Available":available});
        }
        
       

        resultF.push({"Course Name":name, "Slots":temp});
        // console.log(resultF);


    }
    
    // if(resultF.length == 0){
    //     return res.status(400).send('You Do Not Have Any Pending Requests!');
    // }
    // else{
    res.send(resultF);
    // }


    
    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


module.exports = router;
