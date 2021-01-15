const router = require('express').Router();
const Locations = require('../models/locations');
const Faculties = require('../models/Faculties');
const Departements = require('../models/departements');
const Courses = require('../models/courses');

const Request=require('../models/requests')




const Users = require('../models/users');
const {
    addLocationValidation,
    updateLocationValidation,
    addFacultyValidation,
    addDepartmentValidation,
    addCourseValidation,
    updateFacultyValidation,
    updateDepartmentValidation,
    deleteLocationValidation,
    deleteFacultyValidation,
    deleteDepartmentValidation,
    deleteCourseValidation,
    updateCourseValidation
} = require('./validation');
const verify = require('./verifyToken');
const departements = require('../models/departements');
const faculties = require('../models/Faculties');
const { raw } = require('express');

router.get('/getComment',async(req,res)=>{
    try {
        let to_send = [];
        const reqo= await Request.find();
        if(!reqo) return res.send([]);

        for(const req of reqo)
        {
            if(req.status=="Rejected")
            {
            to_send.push([req.id,req.comment])
            }
        }
    res.send(to_send);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})


router.get('/viewFaculty',async(req,res)=>{
    try {
        const fac= await Faculties.find();
        if(!fac) return res.send([]);
    res.send(fac);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})


router.get('/viewUsers',async(req,res)=>{
    try {
        let tosend= [];

        const users= await Users.find();
        if(!users) return res.send([]);
        let x;
        let y;
        let xx;
        let yy;
        for(const ue of users)
        {
            x  = await Faculties.findOne({_id:ue.faculty});
            y  = await Departements.findOne({_id:ue.departement});
           
            if(!x) {xx="none";}
            else{xx =  x.name;}
            if(!y) { yy="none";}
            else{  yy = y.name;}
              
           
           
           tosend.push({"email":ue.email,"name":ue.name,"id":ue.id,"userType":ue.userType,"faculty":xx,"departement":yy,"salary":ue.salary,"isNew":ue.new});
        }
    res.send(tosend);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

router.get('/viewCourses',async(req,res)=>{
    try {
        let tosend= [];

        const courses= await Courses.find();
        if(!courses) return res.send([]);
        let x;
        let depts = [];
        for(const co of courses)
        {
       
            for(const de of co.departement)
            {
                x  = await Departements.findOne({_id:de});
                if(x){
                    depts.push(x.name);
                }
               
             }
             tosend.push({"name":co.name,"courseID":co.id,"departements":depts});
             depts=[];
        }
    
        res.send(tosend);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})


router.get('/viewLocations',async(req,res)=>{
    try {
        const loc= await Locations.find();
        if(!loc) return res.send([]);
    res.send(loc);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})


router.get('/viewDepart',async(req,res)=>{
    try {
        let tosend= [];
        const depart= await Departements.find();
        if(!depart) return res.send([]);
        let x;
        for(const de of depart)
        {
            x  = await Faculties.findOne({_id:de.faculty});
            if(x)  { tosend.push({"name":de.name,"faculty":x.name});}
            else{
                tosend.push({"name":de.name,"faculty":""});
            }
            
         
        }
        
    res.send(tosend);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

router.post('/addLocation',verify, async (req, res) => {
    /**
     * bya5od name , type , max capacity
     */
    try {
        const {error}= addLocationValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const locExist= await Locations.findOne({name: req.body.name});
        if(locExist) return res.status(400).send('Location already exists.');


        const Loc= new Locations ({
        name:req.body.name,
        type:req.body.type,
        currentCapacity:0,
        maxCapacity:req.body.maxCapacity
        })
    const locAdded = await Loc.save();
    res.send(locAdded);

    }
    catch (err) {
        res.status(400).send(err.message);
    }

})

router.post('/updateLocation',verify, async (req, res) => {

    /**
     * loc  name w t update type , current  , max capacity
     */
    try {
        const {error}= updateLocationValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const locExist= await Locations.findOne({name: req.body.name});
        if(!locExist) return res.status(400).send('Error location not exists');
       
        let type= req.body.type;
        let currentCapacity= req.body.currentCapacity;
        let maxCapacity= req.body.maxCapacity;

        if(type == null)
        {
           type=locExist.type;
        }

        if(currentCapacity == null)
        {
            currentCapacity=locExist.currentCapacity;
        }
        if(maxCapacity == null)
        {
            maxCapacity=locExist.maxCapacity;
        }
        if(currentCapacity > maxCapacity) return res.status(400).send("ERROR currentCpacity cant be greaterthan maxCapacity");

        let myquery = { name:req.body.name };
        let newvalues = { $set: {currentCapacity: currentCapacity ,maxCapacity:maxCapacity,type:type} };

     
       const loc =  await Locations.updateOne(myquery,newvalues);

        res.send('Succsuffuly updated');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})

router.post('/deleteLocation',verify, async (req, res) => {
    try {
        const {error}= deleteLocationValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");


        const locExist= await Locations.findOne({name: req.body.name});
        if(!locExist) return res.status(400).send('Location doesnot exists.');

        let id_location = (await Locations.findOne({name:req.body.name}))._id;
        await Locations.deleteOne({name:req.body.name});
        



        let myquery = { officeLocation:id_location };
        let newvalues = { $set: {officeLocation:null }};

       await Users.updateMany(myquery,newvalues);



       let myquery_ = { "schedule.location":id_location };
       let newvalues_ = { $set: {"schedule.$.location":null }};

      await Users.updateMany(myquery_,newvalues_);

       res.send('Successfully deleted');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})




router.post('/addFaculty',verify, async (req, res) => {
    /**
     * add faculty by name to the table
     */
    try {

        const {error}= addFacultyValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const facultyExist= await Faculties.findOne({name: req.body.name});
        if(facultyExist) return res.status(400).send('Error faculty already exists');

        const faculty= new Faculties ({
            name:req.body.name,
            })
        const facultyAdded = await faculty.save();
        res.send(facultyAdded);

    }
    catch (err) {
        res.status(400).send(err.message);
    }

})
router.post('/updateFaculty',verify, async (req, res) => {
    /*
    - name , newName ->change the name of faculty to new name 
    */
    try { 
        const {error}= updateFacultyValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const facExist= await faculties.findOne({name: req.body.name});
        if(!facExist) return res.status(400).send('Error faculty not exists');

 
     
        let myquery = { name:req.body.name };
        let newvalues = { $set: {name:req.body.newName} };

     
       const facUpdated =  await faculties.updateOne(myquery,newvalues);

        res.send('Successfully updated');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})

router.post('/deleteFaculty',verify, async (req, res) => {
    
    try {
        const {error}= deleteFacultyValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const facExist= await faculties.findOne({name: req.body.name});
        if(!facExist) return res.status(400).send('Error faculty not exists');

        await faculties.deleteOne({_id:facExist._id});
        res.send('successfully deleted');

    }
    catch (err) {
        res.status(400).send(err.message);
    }

})


router.post('/addDepartment',verify, async (req, res) => {
    /**
     * name: depart
     * faculty name
     */
    try {
        const {error}= addDepartmentValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");


        const facultyExist= await Faculties.findOne({name: req.body.faculty});
        if(!facultyExist) return res.status(400).send('Error faculty doesnot exists');
          
       

        const departement= new Departements ({
            name:req.body.name,
            faculty:facultyExist._id
            })
        const departementAdded = await departement.save();
    
        res.send('Department added Successfully');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})
router.post('/updateDepartment',verify, async (req, res) => {
    /* 
    update name of department
     */
    try {
        
        const {error}= updateDepartmentValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const departExist= await Departements.findOne({name: req.body.name});
        if(!departExist) return res.status(400).send('Error departement not exists');

 
     
        let myquery = { name:req.body.name };
        let newvalues = { $set: {name:req.body.newName} };

     
       const depUpdated =  await Departements.updateOne(myquery,newvalues);

        res.send('Department updated Successfully');



    }
    catch (err) {
        res.status(400).send(err.message);
    }

})

router.post('/deleteDepartment',verify, async (req, res) => {
    try {
        const {error}= deleteDepartmentValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");



        const departExist= await Departements.findOne({name: req.body.name});
        if(!departExist) return res.status(400).send('Error departement not exists');

        
        const courseExist= await Courses.find({departement: departExist._id});

        let courses_id = []
        for (z=0; z<courseExist.length; z++)
        {
            courses_id.push(courseExist[z]._id);
        }

        let myqueryz__ = { "schedule.course":{$in:courses_id} };
        let newvaluesz__ = { $set: {"schedule.$[elem].course":null }};
    
    
        await Users.updateMany(myqueryz__,newvaluesz__,
           { arrayFilters: [ { "elem.course": { $in: courses_id } } ]}
            );

        

        let myquery_ = { courses:{$in:courses_id}};
        let newvalues_ = { $pull: {courses: {$in: courses_id }} };
        await Users.updateMany(myquery_,newvalues_);


        let myquery___ = { coursesCoordinated:{$in:courses_id}};
        let newvalues___ = { $pull: {coursesCoordinated: {$in: courses_id }} };
     
        await Users.updateMany(myquery___,newvalues___);



        await Courses.updateMany(
            {departement:{$in:[departExist._id]}},
            {$pull:{departement:departExist._id}
        })

        await Users.updateMany({departement:departExist._id},{$set:{departement:null}})

         await Departements.deleteOne({_id:departExist._id})

 
    


        res.send('Successfully deleted');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})



router.post('/addCourse',verify, async (req, res) => {
    /**
     * add course underdepart 
     */
    try {
        const {error}= addCourseValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const departExist= await departements.findOne({name: req.body.departement});
        if(!departExist) return res.status(400).send('Error departement doesnot exists');

        const course= new Courses ({
            name:req.body.name,
            id:req.body.id,
            departement:departExist._id
            })
          const courseAdded = await course.save();
         
        res.send(courseAdded);
        

    }
    catch (err) {
        res.status(400).send(err.message);
    }

})


router.post('/updateCourse',verify, async (req, res) => {
    /**
     * HADEK NAME L 8ayart l department bta3 l course ele edtholk
     */
    try {
        const {error}= updateCourseValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

 
        const courseExist= await Courses.findOne({id: req.body.id});
        if(!courseExist) return res.status(400).send('Error course doesnot exists');

        const dept_get_id= await Departements.findOne({name: req.body.departement});
        if(!dept_get_id) return res.status(400).send('Error departement doesnot exists');

        let courses_dept = courseExist.departement;
     
        if(courses_dept.includes(dept_get_id._id)) return res.status(400).send('Course already in this departement');

        courses_dept.push(dept_get_id._id);



        let myquery_ = { _id:courseExist._id};
        let newvalues_ = { $set: {departement: courses_dept}};
     
        await Courses.updateOne(myquery_,newvalues_);

        res.send('Course updated Successfully');

    }
    catch (err) {
        res.status(400).send(err.message);
    }

})
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

router.post('/deleteCourse',verify, async (req, res) => {
    // delete course under department 
    /**
     * hydek name course , departement you should delete l course da mn kol l departements
     * 
     */
    try {
        const {error}= deleteCourseValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(! (req.user.role === "HR")) return res.status(400).send("not Authorized");

        const course= await Courses.findOne({id: req.body.id});

        let dept = course.departement;
        
        const dept_get_id= await Departements.findOne({name: req.body.departement});
        if(!dept_get_id) return res.status(400).send('Error departement doesnot exists');

        
        let dept_id = dept_get_id._id;

        let cour_id = course._id;

        dept=removeItemOnce(dept,dept_id);


        let myquery = { _id:cour_id };
        let newvalues = { $set: {departement:dept} };

     
       const courseupdated =  await Courses.updateOne(myquery,newvalues);


       /**
        * let's remove from users
        * please check it later 
        */
        let myquery_ = { departement:dept_id};
        let newvalues_ = { $pull: {courses: {$in: cour_id }} };
     
        await Users.updateMany(myquery_,newvalues_);


        let myquery___ = { departement:dept_id};
        let newvalues___ = { $pull: {coursesCoordinated: {$in: cour_id }} };
     
        await Users.updateMany(myquery___,newvalues___);

     
       let myqueryz__ = { "schedule.course":cour_id };
       let newvaluesz__ = { $set: {"schedule.$[elem].course":null }};
   
       await Users.updateMany(myqueryz__,newvaluesz__,
          { arrayFilters: [ { "elem.course": cour_id } ]}
           );

       
       res.send('Successfully deleted');


    }
    catch (err) {
        res.status(400).send(err.message);
    }

})

module.exports = router;
