import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import CustomInput from "components/CustomInput/CustomInput.js";
import Hidden from '@material-ui/core/Hidden';
import axios from "axios";
import "antd/dist/antd.css";
import {  message } from "antd";
const verify = require("../Login/Auth");


const useStylesz= makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 270,
    color: "rgba(255,255,255,.62)",
    fontSize: "200px",
     marginTop: " 0 px",
    marginBottom: "0px",
    

  },
  Button: {
    margin: theme.spacing(0),
    minWidth: 100,
    color: "rgba(255,255,255,.62)",
    fontSize: "14px",
    marginTop: "50px",
    marginRight: "0px",
    marginBottom: "0px",
  },
  Textbox:{
    margin: theme.spacing(2),
    minWidth: 200,
    color: "rgba(255,255,255,.62)",
    fontSize: "180px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    fullWidth:true

    

  },
  Textbox2:{
    margin: theme.spacing(0),
    minWidth: 200,
    color: "rgba(255,255,255,.62)",
    fontSize: "180px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    

  }
}));
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const [Courses,setCourses] = useState([]);

  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
    axios.get('http://localhost:3000/api/user/hr/viewCourses', {

    },{ withCredentials: true })
    .then(function (response) {
       let coursez = [];
       let deptz = "[";
       response.data.forEach(element =>{
        
       let i;
        for( i =0; i<(element.departements.length) -1 ; i++)
        {
          deptz = deptz + element.departements[i] + ", ";
        }
        let dd=element.departements[(element.departements.length) -1];
        if(!dd)
        {
          dd="none"
        }
        deptz= deptz + dd  + "]"
        coursez.push([element.name,element.courseID,deptz]);
        deptz="[";
       })
     
       setCourses(coursez);
    })
    .catch(function (error) {
 

    });
}, [Courses])

  const classes = useStyles();
  const classesz = useStylesz();

 const courseName=  <CustomInput

 labelText="Enter Course  Name"
 id="courseName"
 formControlProps={{
   fullWidth: true
 }}
/>


const courseID=  <CustomInput
             
labelText="Enter Course ID "
id="courseID"
formControlProps={{
  fullWidth: true
}}
/>

const departement=  <CustomInput
             
labelText="Enter Course Departement"
id="courseDepart"
formControlProps={{
  fullWidth: true
}}
/>

const TSlots=  <CustomInput
             
labelText="Enter TeachingSlots Number"
id="teach"
formControlProps={{
  fullWidth: true
}}
/>



const butt=   <Button  className={classesz.Button} color="primary" type="submit" >Apply changes</Button>;

const [addCourse,setAddCourse] = useState("")
const [addDepartement,setAddDepartement] = useState("")
const [addCourseID,setAddCourseID ]= useState("")
const [addTeach,setAddTeach ]= useState("")


const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


   let coursename ;
   let _depart;
   let _courseID;
   let type;
   const handleModFac = (event) => {
     type = event.target.value;
    setbutton(butt);
    setType(type);
  
    if(type == "Add Course" )
    { 
        setAddCourse(courseName);
        setAddDepartement(departement);
        setAddCourseID(courseID);
        setAddTeach(TSlots);
  
    }
    else if(type =="Delete Course under Departement")
    { 
      setAddCourseID(courseID);
      setAddDepartement(departement);
      setAddCourse("");
      setAddTeach("");
    }
    else if(type == "Update Course under Departement")
    {
      setAddCourseID(courseID);
      setAddDepartement(departement);
      setAddCourse("");
      setAddTeach("");

    }
   else if(type="Delete Course")
    {
      setAddCourseID(courseID);
      setAddDepartement("");
      setAddCourse("");
      setAddTeach("");
    }

  };
  function handleModify(event) {
    event.preventDefault();
    let coname= "";
    let coID= "";
    let depaname= "";
    let teachingSlots="";

    if(typez=="Delete Course under Departement")
    {
      coID=event.target.courseID.value;
      depaname=event.target.courseDepart.value;
      axios.post('http://localhost:3000/api/user/hr/deleteCourse', {
        id:coID,
        departement:depaname
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });


    }
     else if (typez == "Add Course")
     {
      coname=event.target.courseName.value;
      coID=event.target.courseID.value;
      depaname=event.target.courseDepart.value;;
      teachingSlots=event.target.teach.value;

      axios.post('http://localhost:3000/api/user/hr/addCourse', {
      name:coname,
      id:coID,
      departement:depaname,
      teachingSlots:teachingSlots

      },{ withCredentials: true })
      .then(function (response) {
        message.success("Succesfully Added Course");
      })
      .catch(function (error) {
        message.error(error.response.data);
      });

     }
     else if ( typez =="Update Course under Departement")
     {
      coID=event.target.courseID.value;
      depaname=event.target.courseDepart.value;
      axios.post('http://localhost:3000/api/user/hr/updateCourse', {
      id:coID,
      departement:depaname
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });
    

     }else if(typez=="Delete Course")
     {
      coID=event.target.courseID.value;
      axios.post('http://localhost:3000/api/user/hr/deletethisCourse', {
        id:coID,
        },{ withCredentials: true })
        .then(function (response) {
          message.success(response.data);
        })
        .catch(function (error) {
          message.error(error.response.data);
        });


     }
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Modify Courses</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can Add Course , Update Course , Delete Course
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Add/Update/Delete Courses</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}
        >
          <option aria-label="None" value="" />
          <option  >Add Course</option>
          <option  >Update Course under Departement</option>
          <option  >Delete Course under Departement</option>
          <option  >Delete Course</option>
        
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
         <GridItem xs={12} sm={12} md={4} >
         {addCourseID}
       </GridItem>
       <GridItem xs={12} sm={12} md={4} >
         {addDepartement}
       </GridItem>
       <GridItem xs={12} sm={12} md={4} >
         {addCourse}
       </GridItem>
       <GridItem xs={12} sm={12} md={4} >
         {addTeach}
       </GridItem>
      
     

       </GridContainer>
       <GridContainer>
       <GridItem  xs={12} sm={12} md={8}  > 
       {addbutton}
       </GridItem>
       </GridContainer>
    
            <GridItem>
            <Table
              tableHeaderColor="primary"
              tableHead={["name ","courseID","courseDepartement"]}
              tableData={Courses}
            />
            </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
