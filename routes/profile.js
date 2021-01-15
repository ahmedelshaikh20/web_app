const router = require('express').Router();
const Locations = require('../models/locations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const {registerValidation,loginValidation,resetValidation,updateProfileValidation,deleteStaffvalidation,updateStaffvalidation} = require('./validation');
const verify = require('./verifyToken');
const Faculties = require('../models/Faculties');
const Departements = require('../models/departements');
const Courses = require('../models/courses');
const { object, array } = require('@hapi/joi');
const Request=require('../models/requests')

router.get('/myCourses',verify, async (req, res)=>{
    try {  
        let tosend = [];
        let name ;
        const user=await Users.findOne({_id:req.user._id})
    
        for(const course of user.courses)
        {
            name = await Courses.findOne({_id:course});
            tosend.push(name.id);
        }
        if(!user) return res.send([]);
    res.send(tosend);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});


router.get('/mynotify',verify, async (req, res)=>{
    try {  
        const user=await Users.findOne({_id:req.user._id})
        if(!user) return res.send([]);

   let to_send = [];
   let reqo;
   let str ="";
   let y;
   if(user.notification)
   {
    for (const note of user.notification )
    {
        reqo = await Request.findOne({_id:note})
        y= await Users.findOne({_id:reqo.senderId})
        str =reqo.type +" Request" +" From " + y.name+"[" + reqo.status+"]"; 
        to_send.push(str)
        str= "";
    }
   }
       
    //res.send(user.notification);

    res.send(to_send);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});



router.get('/addAdmin', async (req, res)=>{
    /*
    this route add admin (admin@guc.edu.eg) (123456) HR USE IT FOR 1 TIME ONLY 
    */

    const salt= await bcrypt.genSalt(10)
    const password = await bcrypt.hash("123456", salt) 
    const user = new Users({
        email: "admin@guc.edu.eg",
        password:password,
        id: "HR-1",
        name : "GUC_ADMIN",
        userType: "HR",
        new: false
    });
    const newUser= await user.save();
    res.send('Done adding admin')

})


router.post('/deleteStaff', verify,async (req, res) => {
    try {



        const {error}= deleteStaffvalidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);



        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");



        const user = await Users.findOne({ email: req.body.email })



        if (user == null) { 
            return res.send('Invalid Email')
        }

        await Users.deleteOne({_id:user._id});

        res.send('Successfully deleted');

        
    }
    catch (err) {
        res.status(400).send(err);
    }

})


router.post('/updateStaff', verify,async (req, res) => {
    /**
     * 
     */
    try {
        const {error}= updateStaffvalidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");


        const user = await Users.findOne({ email: req.body.email })
        if (user == null)  return res.send('Invalid Email')
        
        let body = req.body;
        let daysOff= body.daysOff;
        let officeLocation = body.officeLocation;
        let courses = body.courses;
        let faculty = body.faculty;
        let userType = body.userType;
        let departement= body.departement;
        let salary= body.salary;
        let coursesCoordinated = body.coursesCoordinated;
        let personalDetails= body.personalDetails;
        let schedule=body.schedule;
        let annualLeaves=body.annualLeaves;
        let missingHours=body.missingHours;
        let missingDays=body.missingDays;
        let extraHours=body.extraHours;
        let notification=body.notification;

        if(daysOff == null) daysOff = user.daysOff
        if(officeLocation == null) officeLocation = user.officeLocation
        if(courses == null) courses = user.courses
        if(faculty == null) faculty = user.faculty
        if(userType == null) userType = user.userType
        if(departement == null) departement = user.departement
        if(salary == null) salary = user.salary
        if(coursesCoordinated == null) coursesCoordinated = user.coursesCoordinated
        if(personalDetails == null) personalDetails = user.personalDetails
        if(schedule == null) schedule = user.schedule
        if(annualLeaves == null) annualLeaves = user.annualLeaves
        if(missingHours == null) missingHours = user.missingHours
        if(missingDays == null) missingDays = user.daysOmissingDaysff
        if(extraHours == null) extraHours = user.extraHours
        if(notification == null) notification = user.notification

        if(req.body.faculty){
        const facultyExist= await Faculties.findOne({name: req.body.faculty});
        if(!facultyExist) return res.status(400).send('Error faculty doesnot exists');
        faculty=facultyExist._id;

        }

        if(req.body.departement)
        {
        const depart= await Departements.findOne({name: req.body.departement});
        if(!depart) return res.status(400).send('Error departement doesnot exists');
        departement=depart._id;

        }
        if(req.body.officeLocation)
        {
            const loc= await Locations.findOne({name: req.body.officeLocation});
            if(!loc) return res.status(400).send('Error location doesnot exists');

        
           let curruserloc= await Locations.findOne({_id: user.officeLocation});

          if(! (curruserloc == null) && (! (curruserloc.name == req.body.officeLocation )))
           {

            if(loc.currentCapacity == loc.maxCapacity) return res.status(400).send('Office has already full capacity.');

               let capcoldloc = curruserloc.currentCapacity -1 ;

               let capnewloc = loc.currentCapacity +1 ;

               let myquery = { _id:curruserloc._id};
               let newvalues = { $set: {currentCapacity: capcoldloc} };
                  await Locations.updateOne(myquery,newvalues);

                   myquery = { _id:loc._id};
                   newvalues = { $set: {currentCapacity: capnewloc} };
                     await Locations.updateOne(myquery,newvalues);

           }
           else if (! curruserloc )
           {
            let capnewloc = loc.currentCapacity +1 ;
            let myquery;
            let newvalues;
            myquery = { _id:loc._id};
            newvalues = { $set: {currentCapacity: capnewloc} };
              await Locations.updateOne(myquery,newvalues);
           }


       
        officeLocation=loc._id;


        }
        let finalcourse = [];
        if(req.body.courses)
        { 
            if(user.new ) return res.status(400).send('Cant assign course to new staff');
            //give id for courses
            let courseex;
            for ( let i =0 ; i<courses.length ; i++)
            {
                 courseex= await Courses.findOne({id: courses[i]});
                if(!courseex) return res.status(400).send('Error course doesnot exists');
                finalcourse.push(courseex._id)

            }


            courses=finalcourse;
 

        }
        let finalcoursecorrd = [];
        if(req.body.coursesCoordinated)
        { 
            if(user.new) return res.status(400).send('cant assign a course to new staff.');
            
            //give id for courses
            let courseexxx;
            for ( let i =0 ; i<coursesCoordinated.length ; i++)
            {
                courseexxx= await Courses.findOne({id: coursesCoordinated[i]});
                if(!courseexxx) return res.status(400).send('Error course doesnot exists');
                finalcoursecorrd.push(courseexxx._id)

            }

            coursesCoordinated=finalcoursecorrd;
        }
       
        if(req.body.daysOff)
        {
            if(user.userType == "HR")
            {
                if((!daysOff.includes("Saturday") )|| (!daysOff.includes("Friday")) )
                {
                    return res.status(400).send('Error cant take this daysOff ');
                }
            }
            else
            {
                if(!daysOff.includes("Friday") )
                {
                    return res.status(400).send('Error cant take this daysOff ');
                }

            }

        }
        let finalschedule = [];
        if(req.body.schedule)
        {     
            let c0u;
            let loc;
            for ( let i =0 ; i<schedule.length ; i++)
            {
                c0u= await Courses.findOne({id: schedule[i].course});
                if(!c0u) return res.status(400).send('Error course doesnot exists');

                 loc= await Locations.findOne({name:schedule[i].location });
                if(!loc) return res.status(400).send('Error location doesnot exists');
                schedule[i].course=c0u._id;
                schedule[i].location=loc._id;
                finalschedule.push(schedule[i])

            }

            schedule=finalschedule;
        }

        let myquery = { _id: user._id };
        let newvalues = { $set: 
        {   daysOff:daysOff 
            ,
            officeLocation:officeLocation 
            ,
            courses:courses 
            ,
            faculty:faculty 
            ,
            userType:userType 
            ,
            departement:departement 
            ,
            salary:salary 
            ,
            coursesCoordinated:coursesCoordinated 
            ,
            personalDetails:personalDetails 
            ,
            schedule:schedule 
            ,
            annualLeaves:annualLeaves 
            ,
            missingHours:missingHours 
            ,
            missingDays:missingDays 
            ,
            extraHours:extraHours 
            ,
            notification:notification 

        } };
        
        await Users.updateOne(myquery,newvalues);

        res.send('Successfully updated');

        
    }
    catch (err) {
        res.status(400).send(err);
    }

})




router.post('/register',verify, async (req, res) => {
  
    try {
        const {error}= registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");
        
        const emailExist= await Users.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists.');

        const courseExist= req.body.courses;
        if(courseExist) return res.status(400).send('Cant assign a course to a new academic staff member.');

        let facultyExist = null;
        if(req.body.faculty){
             facultyExist= await Faculties.findOne({name: req.body.faculty});
            if(!facultyExist) return res.status(400).send('Error faculty doesnot exists');
            facultyExist=facultyExist._id;
    
            }
        let depart = null ;
            if(req.body.departement)
            {
             depart= await Departements.findOne({name: req.body.departement});
            if(!depart) return res.status(400).send('Error departement doesnot exists');
            depart=depart._id;
    
            }
    
       
        let office_id  = null;
        if(req.body.officeLocation){
        const office= await Locations.findOne({name: req.body.officeLocation});
        if(!office) return res.status(400).send('Office not exist');
         //if assign to office has already full capacity 
        if(office.currentCapacity == office.maxCapacity) return res.status(400).send('Office has already full capacity.');

  
       
  
        let capnewloc = office.currentCapacity +1 ;

        myquery = { _id:office._id};
        newvalues = { $set: {currentCapacity: capnewloc} };
        await Locations.updateOne(myquery,newvalues);

        office_id = office._id;
        }

        // get last ID of AC or HR
        let empty ;

        const userType=req.body.userType;
        let user1;
        if(userType == "HR")
        {
            user1 = await Users.find({userType : userType }).sort({_id:1});
           empty= user1.length;
        }else{
            user1 = await Users.find({$or : [{userType:"DR"} , {userType:"TA"},{userType:"CC"} , {userType:"HOD"}] }).sort({_id:1});
            empty= user1.length;

        }
         
        let int_id ;
       

        if(empty==0){
           int_id = 1;
        }else{
        let new_id ;
         new_id = ((user1.slice(-1)[0]).id);
        int_id = parseInt(new_id.substring(3, new_id.length),10) + 1;
       }




        let dayOff;
        if(!req.body.daysOff)
        {
            dayOff=['Friday'];
        }
        else{ dayOff=req.body.daysOff;  dayOff.push("Friday");} 

        if(userType ==="HR"){
            new_id ="HR-"+int_id;
            dayOff.push("Saturday");
        }else{
            new_id="AC-"+int_id;
        }

        if(req.body.daysOff)
        {
            let dOff= req.body.daysOff;
            if(dOff.length > 2)   return res.status(400).send('Cant have more than 2 days off. Friday is added by defualt so add 1 only if HR your daysoff saturday,friday');

            if(req.body.userType == "HR")
            {
                if(dOff.length >= 1)  return res.status(400).send('All HR have Saturday,Friday cant have other daysOff');
                if (dayOff.push("Saturday"));
            }
        }


      
        const salt= await bcrypt.genSalt(10)
        const password = await bcrypt.hash("123456", salt) 
        const user = new Users({
            email: req.body.email,
            password:password,
            id: new_id,
            name : req.body.name,
            userType: req.body.userType,
            salary:req.body.salary,
            officeLocation: office_id,
            personalDetails: req.body.personalDetails,
            daysOff:dayOff,
            departement:depart,
            faculty:facultyExist,
            gender:req.body.gender
        });
        const newUser= await user.save();
        res.send(newUser)


    } catch (err) {
        res.status(400).send(err.message);
    }

})

router.post('/login', async (req, res) => {
    try {
        const {error}= loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const user = await Users.findOne({ email: req.body.email })
        if (user == null) { 
            return res.send('Invalid email')
        }
        const correctpassword = await bcrypt.compare(req.body.password, user.password)

        if (!correctpassword) {
            return res.status(400).send('Invalid Password')
        }
        let options = {
            maxAge: 1000 * 60 * 60, // would expire after 60 minutes
        }
        const token = jwt.sign({ _id: user._id, role: user.userType }, process.env.TOKEN_SECRET,
            { expiresIn: '3600s' });

        res.cookie('token', token, options);

        res.send('Successfully logged in.');

        
    }
    catch (err) {
        res.status(400).send(err);
    }

})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token');

        res.send('Successfully logged out.')
    }
    catch (err) {
        res.status(400).send(err.message);
    }

})


router.post('/resetPassword', async (req, res) => {
    try {
        const {error}= resetValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const emailExist= await Users.findOne({email: req.body.email});
        if(!emailExist) return res.status(400).send('Invalid email..');

        let email = req.body.email;

        let options = {
            maxAge: 1000 * 60 * 5, // would expire after 15 minutes
        }
        const token = jwt.sign({ _id: emailExist._id, role: emailExist.userType }, process.env.TOKEN_SECRET,
            { expiresIn: '300s' });

        res.send(token );
    }
    catch (err) {
        res.status(400).send(err);
    }

})


router.post('/resetpasswordnow/:token', async (req, res) => {
    // send new password 
    try {
        const verified= jwt.verify(req.params.token,process.env.TOKEN_SECRET); 
        if(!verified) return res.status(400).send('Bad token');

        const salt= await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.newPassword, salt) ;

        let myquery = { _id: verified._id};
        let newvalues = { $set: {password: newPassword ,new:false } };

        await Users.updateOne(myquery,newvalues);

        res.clearCookie('token');

        res.send('Sucussefully reset password');
    }
    catch (err) {
        res.status(400).send(err);
    }

})

router.get('/viewProfile',verify, async (req, res) => {
    try {
      
       let loccc;
       let faculty_;
       let depart_;
        let currUser= await Users.findOne({_id: req.user._id});
        const depart= await Departements.findOne({_id: currUser.departement});
        const faculty= await Faculties.findOne({_id: currUser.faculty});
        if(!faculty)
        {
            faculty_=null;
        }else{
            faculty_=faculty.name;
        }

        if(!depart)
        {

            depart_=null;
        }else
        {
            depart_=depart.name;
        }
        const location = await Locations.findOne({_id:currUser.officeLocation});
        if(!location){loccc=null;}
        else {
            loccc=location.name;
        }
        let loc;
        let schedule = currUser.schedule;


      //  let finalschedule = [];
        let c0u;

        let mysch= new Array();
        for( let z=0; z<schedule.length; z++){
            mysch.push(new Object ());
        }
        let courseid ;
        let locname;
        for (let  i =0 ; i<schedule.length ; i++)
        {

            if(schedule[i].course == null)
            {

                courseid=null;
            }
            else{
            c0u= await Courses.findOne({_id: schedule[i].course});

            courseid=c0u.id;
            }

             if(schedule[i].location == null)
             {
                locname=null;

             }
             else
             {
                loc= await Locations.findOne({_id:schedule[i].location });
                locname=loc.name;
             }
          

      

            mysch[i].location=locname;
            mysch[i].day=schedule[i].day;
            mysch[i].type=schedule[i].type;
            mysch[i].slot=schedule[i].slot;

            mysch[i].course=courseid;

        }


        let coursesCoordinated = currUser.coursesCoordinated;
        let courseexxx;
        let finalcoursecorrd=[];
        for ( let i =0 ; i<coursesCoordinated.length ; i++)
        {
            if(coursesCoordinated==null)
            {
                finalcoursecorrd=null;
            }
            else
            {
            courseexxx= await Courses.findOne({_id: coursesCoordinated[i]});
            finalcoursecorrd.push(courseexxx.id)

            }
           

        }
        let coursz=[];
        let couzzz = currUser.courses;

        if(couzzz == null)
        {
            coursz=null;
        }
        else
        {
        let b ;
        for ( let k =0 ; k<couzzz.length ; k++)
        {
            b= await Courses.findOne({_id: couzzz[k]});
            coursz.push(b.id);
        }
    }


        

        res.json({
            "email":currUser.email,
            "name":currUser.name,
            "faculty":faculty_,
            "personalDetails":currUser.personalDetails,
            "coursesCoordinated":finalcoursecorrd,
            "userType":currUser.userType,
            "daysOff":currUser.daysOff,
            "schedule":mysch,
            "officeLocation":loccc,
            "id":currUser.id,
            "departement":depart_,
            "missingHours":currUser.missingHours,
            "missingDays": currUser.missingDays,
            "extraHours":currUser.extraHours,
            "annualLeaves":currUser.annualLeaves,
            "gender":currUser.gender,
            "accidentalLeaves":currUser.accidentalLeaves,
            "courses":coursz

            
        });

    
    }
    catch (err) {
        res.status(400).send(err.message);
    }

})



router.post('/updateProfile',verify, async (req, res) => {
    try {

        const {error}= updateProfileValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

  
        let currUser= await Users.findOne({_id: req.user._id});
       
        
     

        if(! (req.body.newPassword ==null))
        { 
        const correctpassword = await bcrypt.compare(req.body.password, currUser.password)

        if (!correctpassword) {
            return res.status(400).send('Invalid Old Password')
        }

        const salt= await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.newPassword, salt) ;

        let myquery = { _id: req.user._id };
        let newvalues = { $set: {password: newPassword ,new:false } };

        await Users.updateOne(myquery,newvalues);

        res.clearCookie('token');
        }   


        let email= req.body.email;
        let personalDetails= req.body.personalDetails;
    

        if(email == null)
        {
            email=currUser.email;
      
        }
        else
        {
            const emailExis_= await Users.findOne({email: req.body.email});
            if(emailExis_) return res.status(400).send('Email already exists.');
        }

        if(personalDetails == null)
        {
            personalDetails=currUser.personalDetails;
        }
            
 
        let myquery = { _id: req.user._id };
        let newvalues = { $set: {personalDetails:personalDetails  ,
            email:email} };
        
        await Users.updateOne(myquery,newvalues);
        res.send('Successfully updated profile.')

    }
    catch (err) {

        res.status(400).send(err);
    }

})


module.exports = router;
