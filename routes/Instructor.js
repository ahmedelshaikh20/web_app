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
    courseCoverageValidation,
    viewCourseStaffValidation,
    assignToSlotValidation,
    deleteSlotAssignmentValidation,
    assignCourseCoordinatorValidation,
    removeAssignedMemberValidation,
    updateSlotAssignmentValidation
} = require('./validation');
const { number, boolean } = require('@hapi/joi');
const { json } = require('express');
const courses = require('../models/courses');




function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }







   async function coverage(id) {


    
        
        
    var coverage;
    var coverages = [];
    var numberOfCourses = 0;
    
   
    
    
   
    
    


        
    
    var d = await Courses.findOne({_id:id});

    
    
    
        
    
      var query = await Users.find({courses:d});
      

        var j;

        for(j = 0; j < query.length;j++){

            for(let element of query[j].schedule){
                if(element.course.equals(d._id)){
                    numberOfCourses++
                }

            }

        }
        

    
    
    coverage = (numberOfCourses / d.teachingSlots) * 100;
    
    return coverage;
    
}







router.get('/courseCoverage',verify,async (req, res) => {
    
    
    try {
        
        const {error}= courseCoverageValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        var coverage;
        var coverages = [];
        var numberOfCourses = 0;
        
        var l = await Users.findOne({_id:req.user});
        // if(!l) return res.status(400).send('The Logged In User Is Not In Our Database');
        var t = l.userType;
        // if(t != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
        var b = l.courses;
        // if(b.length == 0) return res.status(400).send('The Instructor Has No Courses'); 
        var i;
        for (i = 0; i < b.length; i++) {

        // try {
            
        
        var d = await Courses.findOne({_id:b[i]});
        // }
        // catch (e) {
        //     res.status(400).send('Error, One Of The Courses Does Not Exist In The Courses Database');
        // }
        
        
            
        
          var query = await Users.find({courses:d});
          
    
            var j;

            for(j = 0; j < query.length;j++){

                for(let element of query[j].schedule){
                    if(element.course.equals(d._id)){
                        numberOfCourses++
                    }

                }

            }
            
            // query.forEach(function(jedi){
            // numberOfCourses++;
            // });
        
        
        coverage = (numberOfCourses / d.teachingSlots) * 100;
        coverages[i] = {"Course Name":d.name, "Coverage": coverage + "%"};
        numberOfCourses = 0;
        
        }

        
    res.send(JSON.stringify(coverages));
    }
   catch (err) {
    res.status(400).send(err.message);
}
    
    
    

})

router.get('/viewDepartmentStaff',verify,async (req, res) => {
   
    var resultF = new Array();

    try{

    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
    var userA = await Users.findOne({_id:req.user});
    // var userA = await Users.findOne({name:"Daniel"});
    
    // if(!userA.departement) return res.status(400).send('You Are Not Assigned To A Department!');
    
    var query = await Users.find({departement: userA.departement});
    
    var i;
    for(i = 0;i < query.length;i++){
        var resultA = [];
        var resultC = [];
        var name = query[i].name;
        var email = query[i].email;
        var personalDetails = query[i].personalDetails;
        var departementA = await Departements.findOne({_id:query[i].departement});
        if(departementA){
        var departement = departementA.name;
        }
        else{
            departement = "";
        }
        var facultyA = await Faculties.findOne({_id:query[i].faculty});
        if(facultyA)
        var faculty = facultyA.name;
        var j;
        var coursesA = [];
        var coursesC = [];
        for(j = 0; j < query[i].courses.length;j++){
            
            coursesA[j] = await Courses.findOne({_id:query[i].courses[j]});
            

        }

        var e;
        for(e = 0; e < query[i].coursesCoordinated.length;e++){
            
            coursesC[e] = await Courses.findOne({_id:query[i].coursesCoordinated[e]});
            

        }


        var z;
        for(z = 0; z < coursesA.length;z++){
            
        
            resultA[z] = coursesA[z].name;

        }
        var t;
        for(t = 0; t < coursesC.length;t++){
            
            
            resultC[t] = coursesC[t].name;

        }
        
            
        var temp = {"Name":name,"Courses":resultA, "Department":departement, "Faculty":faculty, "Email": email, "Courses Coordinated": resultC, "Personal Details": personalDetails};
        

        resultF.push(temp);
        // console.log(resultF);


    }
    
    
    res.send(resultF);
    }

    catch (err)  {
        res.status(400).send(err.message);
    }

    })



router.get('/viewCourseStaff',verify,async (req, res, next) => {
   
        var resultF = new Array();
        
        // try{
        
        var m = await Users.findOne({_id:req.user});
        // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
        var n = m.userType;
        // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
        // const {error}= viewCourseStaffValidation(req.body);
        // if(error) return res.status(400).send(error.details[0].message);
        
        var id1 = '' + req.params.id;
        let param = req.query.id
        
        var courseID = await Courses.findOne({id:param})
        if(!courseID) return res.status(400).send('There Are No Courses With This ID');
        var query = await Users.find({courses: courseID});
        
        var i;
        for(i = 0;i < query.length;i++){
            var resultA = [];
            var resultC = [];
            var name = query[i].name;
            var email = query[i].email;
            var personalDetails = query[i].personalDetails;
            var departementA = await Departements.findOne({_id:query[i].departement});
            if(departementA){
            var departement = departementA.name;
            }
            else{
                var departement = "";
            }
            var facultyA = await Faculties.findOne({_id:query[i].faculty});
            if(facultyA)
            var faculty = facultyA.name;
            var j;
            var coursesA = [];
            var coursesC = [];
            
            for(j = 0; j < query[i].courses.length;j++){
                
                coursesA[j] = await Courses.findOne({_id:query[i].courses[j]});
                
    
            }
    
            var e;
            for(e = 0; e < query[i].coursesCoordinated.length;e++){
                
                coursesC[e] = await Courses.findOne({_id:query[i].coursesCoordinated[e]});
                
    
            }
    
    
            var z;
            for(z = 0; z < coursesA.length;z++){
                
            
                resultA[z] = coursesA[z].name;
    
            }
            var t;
            for(t = 0; t < coursesC.length;t++){
                
                
                resultC[t] = coursesC[t].name;
    
            }
            
                
            var temp = {"Name":name,"Courses":resultA, "Department":departement, "Faculty":faculty, "Email": email, "Courses Coordinated": resultC, "Personal Details": personalDetails};
            
    
            resultF.push(temp);
            // console.log(resultF);
    
    
        }
        
        if(resultF.length == 0) return res.status(400).send('There Is No Staff Who Teaches This Course');
        res.send(resultF);
        }
    
        // catch (err)  {
        //     res.status(400).send(err.message);
        // }
    
        )




router.get('/viewSlotAssignments',verify,async (req, res) => {
   
    var result = [];
    
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
    var i;
    var j;
    var z;
    var user = await Users.findOne({_id:req.user});
    // if(!user.courses.length) return res.status(400).send('You Do Not Have Any Courses Assigned To You');
    for(i = 0; i < user.courses.length;i++){
        var temp = [];
        var course = await Courses.findOne({_id:user.courses[i]});
        var query = await Users.find({courses:course});
        
        for(j  = 0; j < query.length;j++){
            
            currentUser = query[j];

            for(let element of currentUser.schedule){
                
                if(element.course.equals(course._id)){
                    var loc = await Locations.findOne({_id:element.location})
                    temp.push({"Day":element.day, "Slot":element.slot, "Location":loc.name});
                }

            }

            }

            result.push({"Course Name": course.name, "Slot Assignments":temp, "ID":course._id});
        }
    
    
    res.send(result);
    }

    catch(err){

        res.status(400).send(err.message);
    }
     
    })



    router.post('/assignToSlot',verify,async (req, res) => {
        
        
        try{
        var m = await Users.findOne({_id:req.user});
        // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
        var n = m.userType;
        // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
        const {error}= assignToSlotValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        userID = req.body.id;
        var currentUser = await Users.findOne({id:userID});
        var currentCourse = await Courses.findOne({id:req.body.course});
        // var currentSlot = req.body.slot;
        // var currentDay = req.body.day
        // var currentLocation =await Locations.findOne({name:req.body.location});
        if(!currentUser) return res.status(400).send('Could Not Find User');
        if(!currentCourse) return res.status(400).send('Could Not Find Course');
        // if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
        // if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
        // if(!currentLocation) return res.status(400).send('Could Not Find Location');
        // if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');
        var contains = false;
        var e;
        for(e = 0; e < m.courses.length && contains == false;e++){

            if(m.courses[e].equals(currentCourse._id)){
                contains = true;
            }
            

        }
        if(!contains) return res.status(400).send('This Course Is Not Assigned To The Instructor Logged In');

        var k = await coverage(currentCourse._id);
        
        if(k >= 100) return res.status(400).send('This Course Is Fully Covered');

        var j;
        var courseSlots = [];
        courseSlots = currentCourse.slots;
        var f4 = false;
        var f5 = false;
        for(let element2 of courseSlots){
            var f3 = false;
            f5 = true;
            var currentDay;
            var currentSlot;
            var currentLocation;
            if(element2.available){
                f4 = true;
                currentDay = element2.day;
                currentSlot = element2.slot;
                currentLocation = element2.location;
                


        var i;
        
        var z;
        var query = await Users.find();
        var flag = false;
        
        var s = [];
        var s2 = [];
        for(i = 0; i < query.length; i++){
            
            var currentSchedule = query[i].schedule;
            for(let element of currentSchedule){

                // console.log(element.day + " -- " + currentDay + " -- " + element.slot + " -- " + currentSlot + " -- " + element.location + " -- " + currentLocation._id + " -- " +  (element.slot).localeCompare(currentSlot) + " -- ");
                if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && element.location.equals(currentLocation)){
                    f3 = true;
                    
                    // return res.status(400).send('The Location Is Not Available On This Slot And Day');


                }

                else if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot) && query[i]._id.equals(currentUser._id)){

                    // return res.status(400).send('This Academic Member Already Has A Teaching Slot On This Day');
                    f3 = true

                }



                        
             }

        }
    
    
        // console.log(f3);
        // console.log(f4);
        var f2 = false;
        for(z = 0; z < currentUser.courses.length;z++){

            if(currentUser.courses[z].equals(currentCourse._id)){
                f2 = true;
            }


        }


        if(f3 == false && f4 == true){
            s.push({day:currentDay, slot:currentSlot, course:currentCourse._id, location:currentLocation, type:"Normal"})
            s2.push({day:currentDay, slot:currentSlot, location:currentLocation, available:false});
            await Users.updateOne({id:req.body.id}, {$push: { schedule:s}});
            await Courses.update( // select your doc in moongo
                {_id:currentCourse._id}, // your query, usually match by _id
                { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation, available:true} } } , // item(s) to match from array you want to pull/remove
                { multi: true } // set this to true if you want to remove multiple elements.
            )

            await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s2}});
            if(!f2){
            await Users.updateOne({id:req.body.id}, {$push: { courses:currentCourse._id}});
            }
            return res.send("Course Assigned Successfully!");
        }
    }
}

        if(!f5){
        return res.status(400).send("There Aren't Any Slots Assigned To This Course!");
}
        else if(f3 == false && f4 == false){

            return res.status(400).send("There Aren't Any Available Slots!");
        }

        else if(f3 == true || f3 == false){

            return res.status(400).send("None Of The Available Slots Could Be Assigned To The Academic Member!");
        }


        
        
        }
    
        catch(err){
    
            res.status(400).send(err.message);
        }
         
        })


 router.post('/deleteSlotAssignment',verify,async (req, res) => {
        
        
            try{
            var m = await Users.findOne({_id:req.user});
            // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
            var n = m.userType;
            // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
            const {error}= deleteSlotAssignmentValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);
            userID = req.body.id;
            var cID;
            var cIDF = false;
            var currentUser = await Users.findOne({id:userID});
            // var currentCourse = await Courses.findOne({id:req.body.course});
            var currentSlot = req.body.slot;
            var currentDay = req.body.day
            // var currentLocation =await Locations.findOne({name:req.body.location});
            

            if(!currentUser) return res.status(400).send('Could Not Find User');
            // if(!currentCourse) return res.status(400).send('Could Not Find Course');
            if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
            if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
            // if(!currentLocation) return res.status(400).send('Location Is Invalid');
            // if(!contains) return res.status(400).send('This Course Is Not Assigned To The Entered User');
            // if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');
            var i;
            var j;
            var z;
            
            var flag = false;
            var s = [];
            
                
                var currentSchedule =currentUser.schedule;
                for(let element of currentSchedule){
                    
                    // console.log(element.day + " -- " + currentDay + " -- " + element.slot + " -- " + currentSlot + " -- " + element.location + " -- " + currentLocation._id + " -- " +  (element.slot).localeCompare(currentSlot) + " -- ");
                    if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot)){
                        flag = true;
                        var currentCourseID = element.course;
                        var currentLocation = element.location;
                        cID = element.course;
                        cIDF = true;
                        var contains = false;
                        var e;
                        for(e = 0; e < m.courses.length && contains == false;e++){
                
                            if(m.courses[e].equals(cID)){
                                contains = true;
                            }
                            
                
                        }
    
                    }
    
    
    
                            
                 }
    
            
            if(!contains && cIDF) return res.status(400).send('This Course Is Not Assigned To The Logged In Instructor');
            
            if(flag){
                var s2 = [];
                s2.push({day:currentDay, slot:currentSlot, location:currentLocation, available:true});
                await Users.update( // select your doc in moongo
                    {id:userID}, // your query, usually match by _id
                    { $pull: { schedule:{ day: currentDay , slot: currentSlot} } } , // item(s) to match from array you want to pull/remove
                    { multi: false } // set this to true if you want to remove multiple elements.
                )
                await Courses.update( // select your doc in moongo
                    {_id:currentCourseID}, // your query, usually match by _id
                    { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation, available:false} } } , // item(s) to match from array you want to pull/remove
                    { multi: true } // set this to true if you want to remove multiple elements.
                )
    
                await Courses.updateOne({_id:currentCourseID}, {$push: {slots:s2}});
                res.send("Deletion Done!");
            }

            else{

                return res.status(400).send('We Could Not Find A Match For The Day And Slot');
            }
            
            
            }
            catch(err){
        
                res.status(400).send(err.message);
            }
             
})



router.post('/assignCourseCoordinator',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
    const {error}= assignCourseCoordinatorValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    userID = req.body.id;
    var currentUser = await Users.findOne({id:userID});
    var currentCourse = await Courses.findOne({id:req.body.course});
    if(!currentUser) return res.status(400).send('Could Not Find User');
    if(!currentCourse) return res.status(400).send('Could Not Find Course');
    
    var contains2 = false;
    var h;
    for(h = 0; h < m.courses.length && contains2 == false;h++){

        if(m.courses[h].equals(currentCourse._id)){
            contains2 = true;
        }
        

    }

    if(!contains2) return res.status(400).send('This Course Is Not Assigned To Logged In Instructor');
    
    var contains = false;
            var e;
            for(e = 0; e < currentUser.courses.length && contains == false;e++){
    
                if(currentUser.courses[e].equals(currentCourse._id)){
                    contains = true;
                }
                
    
            }
            
            if(!contains) return res.status(400).send('This Course Is Not Assigned To The Entered User');



    var i;
    var f = false;
    for(i = 0; i < currentUser.coursesCoordinated.length;i++){

        if(currentUser.coursesCoordinated[i].equals(currentCourse._id)){
            f = true;
        }

    }
    
    if(f) return res.status(400).send('The Instructor Is Already A Coordinator Of This Course');
    else{
        var j;
        var flag = false;
        var query = await Users.find();
        for(j = 0; j < query.length;j++){
            currentC = query[j].coursesCoordinated;
            for(let element of currentC){

                if(element.equals(currentCourse._id)){
                    flag = true
                }

            }
        }

        if(!flag){
        await Users.updateOne({id:req.body.id}, {$push: { coursesCoordinated:currentCourse._id}});
        if(!currentUser.userType.localeCompare("TA")){
        await Users.updateOne({id:req.body.id}, {$set: { userType:"CC"}});
        }
        res.send("Member Assigned As A Coordinator Successfully!");
    }
    else{
        return res.status(400).send('This Course Already Has A Coordinator');
    }
    }
    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


router.post('/removeAssignedMember',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
    const {error}= removeAssignedMemberValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    userID = req.body.id;

    var currentUser = await Users.findOne({id:userID});
    var currentCourse = await Courses.findOne({id:req.body.course});

        
    

    if(!currentUser) return res.status(400).send('Could Not Find User');
    if(!currentCourse) return res.status(400).send('Could Not Find Course');
    
    // if(!contains) return res.status(400).send('This Course Is Not Assigned To The Entered User');
    // if(!currentLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');
    var contains2 = false;
    var h;
    for(h = 0; h < m.courses.length && contains2 == false;h++){

        if(m.courses[h].equals(currentCourse._id)){
            contains2 = true;
        }
        

    }

    if(!contains2) return res.status(400).send('This Course Is Not Assigned To Logged In Instructor');
    
    var contains = false;
            var e;
            for(e = 0; e < currentUser.courses.length && contains == false;e++){
    
                if(currentUser.courses[e].equals(currentCourse._id)){
                    contains = true;
                }
                
    
            }
    
            if(!contains) return res.status(400).send('This Course Is Not Assigned To The Entered User');
    var i;
    var j;
    var z;
    
    var flag = false;
    var s = [];
    
        
        var currentSchedule =currentUser.schedule;
       
            
            // console.log(element.day + " -- " + currentDay + " -- " + element.slot + " -- " + currentSlot + " -- " + element.location + " -- " + currentLocation._id + " -- " +  (element.slot).localeCompare(currentSlot) + " -- ");
            
                for(let element of currentSchedule){

                    if(element.course.equals(currentCourse._id)){
                        
                        var s2 = [];
                        s2.push({day:element.day, slot:element.slot, location:element.location, available:true});
                        await Courses.update( // select your doc in moongo
                            {_id:currentCourse._id}, // your query, usually match by _id
                            { $pull: { slots:{ day: element.day , slot: element.slot, location:element.location, available:false} } } , // item(s) to match from array you want to pull/remove
                            { multi: true } // set this to true if you want to remove multiple elements.
                        )
            
                        await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s2}});

                    }


                }
               
                await Users.update( // select your doc in moongo
                    {id:userID}, // your query, usually match by _id
                    { $pull: { schedule:{course:currentCourse._id} } } , // item(s) to match from array you want to pull/remove
                    { multi: true } // set this to true if you want to remove multiple elements.
                )

                await Users.update( // select your doc in moongo
                    {id:userID}, // your query, usually match by _id
                    { $pull: { courses:currentCourse._id}  } , // item(s) to match from array you want to pull/remove
                    { multi: true } // set this to true if you want to remove multiple elements.
                )
            



                    
         

    
    
    
    
        res.send("Member Removed Successfully!");
    


    
    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})


router.post('/updateSlotAssignment',verify,async (req, res) => {
        
        
    try{
    var m = await Users.findOne({_id:req.user});
    // if(!m) return res.status(400).send('The Logged In User Is Not In Our Database');
    var n = m.userType;
    // if(n != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
    const {error}= updateSlotAssignmentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    userID = req.body.id;
    var cID;
    var cIDF = false;
    var currentUser = await Users.findOne({id:userID});
    
    var currentSlot = req.body.slot;
    var currentDay = req.body.day
    var newLocation =await Locations.findOne({name:req.body.newLocation});
    var newSlot = req.body.newSlot;
    var newDay = req.body.newDay;
    
    // var currentCourseSlots = [];
    // currentCourseSlots = await courses.find({id:req.body.course});
    // console.log(currentUser);

    if(!currentUser) return res.status(400).send('Could Not Find User');
    
    if(!(currentSlot == "First" || currentSlot == "Second" || currentSlot == "Third" || currentSlot == "Fourth" || currentSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(currentDay != "Sunday" && currentDay != "Monday" && currentDay != "Tuesday" && currentDay != "Wednesday" && currentDay != "Thursday" && currentDay != "Friday" && currentDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!(newSlot == "First" || newSlot == "Second" || newSlot == "Third" || newSlot == "Fourth" || newSlot == "Fifth")) return res.status(400).send('Invalid Slot Number');
    if(newDay != "Sunday" && newDay != "Monday" && newDay != "Tuesday" && newDay != "Wednesday" && newDay != "Thursday" && newDay != "Friday" && newDay != "Saturday") return res.status(400).send('Invalid Day');
    if(!newLocation) return res.status(400).send('Location Is Invalid');
    if(!newLocation.type.localeCompare("offices")) return res.status(400).send('The Location You Entered Is An Office!');

    var i;
    var j;
    var z;
    
    var flag = false;
    var s = [];
    
        var currentCourse;
        var currentCourseID;
        var currentLocation;
        var currentSchedule =currentUser.schedule;
        for(let element of currentSchedule){
            
           
            if(!element.day.localeCompare(currentDay) && !element.slot.localeCompare(currentSlot)){
                flag = true;
                currentCourseID = element.course;
                currentCourse = await Courses.findOne({_id:currentCourseID});
                currentLocation = await Locations.findOne({_id:element.location});
                cID = element.course;
                cIDF = true;
                var contains = false;
                var e;
                for(e = 0; e < m.courses.length && contains == false;e++){
        
                    if(m.courses[e].equals(cID)){
                        contains = true;
                    }
                    
        
                }

            }



                    
         }

    
    if(!contains && cIDF) return res.status(400).send('This Course Is Not Assigned To The Logged In Instructor');
    
    if(flag){
            var f2 = false;
            var f3 = false;
            var currentCourseSlots = [];
            currentCourseSlots = currentCourse.slots
            
            
            for(let element2 of currentCourseSlots){
                
                if(!element2.day.localeCompare(newDay) && !element2.slot.localeCompare(newSlot) && element2.location.equals(newLocation._id)){

                    f2 = true;


                }

                
                if(!element2.day.localeCompare(newDay) && !element2.slot.localeCompare(newSlot) && element2.location.equals(newLocation._id) && !element2.available){

                    f3 = true;


                }
            }
                if(f3){


                    return res.status(400).send('The New Assignment Is Not Available At This Time!');


                }

                
                else if(!f2){


                    return res.status(400).send('The New Assignment You Entered Is Not Valid For This Course!');


                }

                else{

                    var f4 = false;
                    var query = await Users.find();

                    for(i = 0; i < query.length; i++){
            
                        var currentSchedule2 = query[i].schedule;
                        for(let element of currentSchedule2){
            
                            // console.log(element.day + " -- " + currentDay + " -- " + element.slot + " -- " + currentSlot + " -- " + element.location + " -- " + currentLocation._id + " -- " +  (element.slot).localeCompare(currentSlot) + " -- ");
                            if(!element.day.localeCompare(newDay) && !element.slot.localeCompare(newSlot) && element.location.equals(newLocation._id)){
                                f4 = true;
                                // return res.status(400).send('The Location Is Not Available On This Slot And Day');
            
            
                            }
            
                            else if(!element.day.localeCompare(newDay) && !element.slot.localeCompare(newSlot) && query[i]._id.equals(currentUser._id)){
            
                                // return res.status(400).send('This Academic Member Already Has A Teaching Slot On This Day');
                                f4 = true
            
                            }
            
            
            
                                    
                         }
            
                    }

                    if(f4) return res.status(400).send('We Can not Assign The New Assignment To The Member! Please Choose Another Assignment. ');

                    else{

                        var s2 = [];
                        s2.push({day:currentDay, slot:currentSlot, location:currentLocation._id, available:true});
                        await Courses.update( // select your doc in moongo
                            {_id:currentCourse._id}, // your query, usually match by _id
                            { $pull: { slots:{ day: currentDay , slot: currentSlot, location:currentLocation._id, available:false} } } , // item(s) to match from array you want to pull/remove
                            { multi: true } // set this to true if you want to remove multiple elements.
                        )
            
                        await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s2}});
                        var s3 = [];
                        s3.push({day:newDay, slot:newSlot, location:newLocation._id, available:false});
                        await Courses.update( // select your doc in moongo
                            {_id:currentCourse._id}, // your query, usually match by _id
                            { $pull: { slots:{ day: newDay , slot: newSlot, location:newLocation._id, available:true} } } , // item(s) to match from array you want to pull/remove
                            { multi: true } // set this to true if you want to remove multiple elements.
                        )
            
                        await Courses.updateOne({_id:currentCourse._id}, {$push: {slots:s3}});

                        await Users.update( // select your doc in moongo
                            {id:userID}, // your query, usually match by _id
                            { $pull: { schedule:{day:currentDay, slot:currentSlot, location:currentLocation._id, course:currentCourse._id} } } , // item(s) to match from array you want to pull/remove
                            { multi: true } // set this to true if you want to remove multiple elements.
                        )

                        s.push({day:newDay, slot:newSlot, course:currentCourse._id, location:newLocation._id, type:"Normal"})
                        await Users.updateOne({id:req.body.id}, {$push: { schedule:s}});

                            res.send("Update Done!");
                    }

                }

            
        

    }

    else{

        return res.status(400).send('We Could Not Find A Match For The Day And Slot For This Member!');
    }
    
    
    }
    catch(err){

        res.status(400).send(err.message);
    }
     
})

router.get('/viewCourseCoordinators',verify,async (req, res) => {
    
    
    try {
        var result = new Array();
        const {error}= courseCoverageValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        var coverage;
        var coverages = [];
        var numberOfCourses = 0;
        
        var l = await Users.findOne({_id:req.user});
        // if(!l) return res.status(400).send('The Logged In User Is Not In Our Database');
        var t = l.userType;
        // if(t != "DR") return res.status(400).send('Only Instructors Are Allowed To Use This Functionality');
        var b = l.courses;
        // if(b.length == 0) return res.status(400).send('The Instructor Has No Courses'); 
        var i;
        
        for (i = 0; i < b.length; i++) {

        temp = [];
            
        
        var d = await Courses.findOne({_id:b[i]});
        
        
            
        
        
        
            
        
          var query = await Users.find({coursesCoordinated:d});
          
            
            var j;
            
            for(j = 0; j < query.length;j++){

                for(let element of query[j].coursesCoordinated){
                    
                    if(element.equals(d._id)){
                        temp.push(query[j].name);
          
                       
                

            }
        }
            
        
    }
        
                result.push({"Course Name": d.name, "Coordinators":temp})
        
        }

        
    res.send(result);
    }
   catch (err) {
    res.status(400).send(err.message);
}
    
    
    

})









module.exports = router;
