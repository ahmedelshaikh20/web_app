import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
import DayPicker from 'react-day-picker';
import moment from 'moment';
import Option from "components/Table/option.js";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const verify = require("../Login/Auth");

const mez = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2.5),
        width: '25ch',
      

      },
    },
  }));
const useStylesz= makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 270,
    color: "rgba(255,255,255,.62)",
    fontSize: "230px",
     marginTop: " 0 px",
    marginBottom: "0px",
    
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 330,
    color: "rgba(255,255,255,.62)",
    fontSize: "200px",
     marginTop: " 0 px",
    marginBottom: "0px",
    
  },
  Button: {
    size:"small",
    margin: theme.spacing(0),
    minWidth: 30,
    color: "rgba(255,255,255,.62)",
    fontSize: "14px",
    marginTop: "50px",
    marginRight: "0px",
    marginBottom: "0px",
  },
  Textbox:{
    margin: theme.spacing(2),
    minWidth: 50,
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



const shady= makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
      minWidth: 200,
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
  
    },
    lolbox:{
      top : 75,
      left: "94%"
      
    },
    formControl2: {
        margin: theme.spacing(3),
        minWidth: 260,
        color: "rgba(255,255,255,.62)",
        fontSize: "14px",
    
      },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
    },
    lastbox:{
      margin: theme.spacing(1),
      minWidth: 120,
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
    },
    
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
  const bb = mez();
  const classes = useStyles();
  const classesz = useStylesz();
  const classesz1 = shady();
  const [filter,setFilter] = useState("")

const [typez,setType] = useState("")


const [viewRTable,setviewRTable]=useState("");

  const [butfilter,setbut] = useState("")

const [courseID,setCourseID] = useState("");
const [InstructorID,setInstructorID]=useState("");


const [viewCourseCover,setCourseCover]=useState("");


const [Teachingassignments,setTeachingassignments]=useState("");

const [TeachData,setTeachData]=useState([]);

const [coverData,setCoverData]=useState([]);


const [viewAllStaff,setviewAllStaff]=useState("");


const filterbutton= <Button  style={{maxWidth: '100px', maxHeight: '40px', minWidth: '100px', minHeight: '40px'}}  className={classesz.Button} color="primary" type="submit" >APPLY FILTER</Button>;
let courseID_ =  <CustomInput
labelText="Enter CourseID"
id="coID"
formControlProps={{
  fullWidth: true
}}

/>

let InstructorID_ =   <CustomInput
labelText="Enter Instructor Email"
id="inID"
formControlProps={{
  fullWidth: true
}}

/>
const [myDepartData,setDepartdata] = useState([]);
const [StaffDepartT,setStaffDeapartT] = useState("");

  let viewStaffDepart =  
  <Table
 tableHeaderColor="primary"
 tableHead={["Email", "ID","isNew", "Faculty", "Departement","daysOff","Courses","coursesCoordintated" ,"annualLeave","accidentalLeave"]}
 tableData={myDepartData}
 />

 

 let courseCoverTable =  
 <Table
tableHeaderColor="primary"
tableHead={["courseID","Coverage"]}
tableData={coverData}
/>




let assigntable =  
<Table
tableHeaderColor="primary"
tableHead={["InstructorID","day","slot","course","location","type"]}
tableData={TeachData}
/>
//should put in tableData TeachData

let coveragedata = [];
let departdata =[];
  useEffect(() => { 
    if (!verify()) {
      window.location.href = "/"
    }
    axios.get('http://localhost:3000/api/hod/departmentStaff', {

    },{ withCredentials: true })
    .then(function (response) { 

        
      response.data.forEach(element =>{
    
          console.log(element.isNew);
        departdata.push(
            [element.email,
             element.id,(element.isNew).toString(),element.faculty,
             element.departement,element.daysOff.toString(),
             element.courses.toString(),element.coursesCoordintated.toString(),
             element.annualLeaves,
             element.accidentalLeaves])
       
        
    }
      );
      setDepartdata(departdata);
      
    })
    .catch(function (error) {
    });
    //fetchItems();
    axios.get('http://localhost:3000/api/hod/courseCoverage', {
    },{ withCredentials: true })
    .then(function (response) {
     response.data.forEach(ele=>{
        coveragedata.push([ele.id,ele.coverage])
     });
     setCoverData(coveragedata);
    })
    .catch(function (error) {   
    });

 

   
}, [])




const [EnterCOO,setEnterCOO] = useState("");

const [viewButton,setviewButton] = useState("");

const butt=   <Button  style={{maxWidth: '110px', maxHeight: '30px', minWidth: '110px', minHeight: '30px'}} className={classesz.Button} color="primary" type="submit" >View </Button>;


let EnterCOID =   <CustomInput
labelText="Enter courseID"
id="courseID"
formControlProps={{
    fullWidth: false
  }}
/>





const myfilter=    
<div>
<FormControl  className={classesz1.formControl} >

<InputLabel  htmlFor="age-native-required">Choose filter</InputLabel>
<Select
native
onChange={(event)=> {

    
let value = event.target.value;

if (value=="Filter By CourseID")
{
    setCourseID(courseID_);
    setInstructorID("");


}else if (value == "Filter By InstructorEmail")
{
    setInstructorID(InstructorID_);
    setCourseID("");

}

setbut(filterbutton);
   
 

}}
formControlProps={{
fullWidth: true
}}
inputProps={{
id: 'mefilter'

}}
>
<option aria-label="None" value="" />
<option  >Filter By CourseID</option>
<option  >Filter By InstructorEmail</option>

</Select>
</FormControl>
</div>


  
   let viewType;




   function handleFilter(event) {
    event.preventDefault();
    let filoption=event.target.mefilter.value;
     let Fcourse = "";
     let FinsID="";
     let true_coID = [];
     let true_InID = [];
     let array ;
     let arrayb;
    if(filoption=="Filter By CourseID")
    {
      Fcourse = event.target.coID.value;
      myDepartData.forEach(ele=>{
        array=ele[6].split(",");
        arrayb=ele[7].split(",");
        if(array.includes(Fcourse) || arrayb.includes(Fcourse))
        {
            true_coID.push(ele);
        }

      })
      setviewAllStaff(<Table
        tableHeaderColor="primary"
        tableHead={["Email", "ID","isNew", "Faculty", "Departement","daysOff","Courses","coursesCoordintated" ,"annualLeave","accidentalLeave"]}
        tableData={true_coID}
        />);
     
    }else if(filoption=="Filter By InstructorEmail")
    {
        FinsID = event.target.inID.value;
        myDepartData.forEach(ele=>{
            if(ele.includes(FinsID) )
            {
                true_InID.push(ele);
            }
    
          })
          setviewAllStaff(<Table
            tableHeaderColor="primary"
            tableHead={["Email", "ID","isNew", "Faculty", "Departement","daysOff","Courses","coursesCoordintated" ,"annualLeave","accidentalLeave"]}
            tableData={true_InID}
            />);
       
    }
   }
   


   const handleviewTeach = async (event)=>{
    event.preventDefault();
    const courseID = event.target.courseID.value;

     console.log(courseID);
  let data = [];

   await  axios.post('http://localhost:3000/api/hod/courseTeachingassignments/',{
       courseId:courseID
   }
   ,{ withCredentials: true })
    .then(function (response) {
        console.log(response.data);

         if(response.data  =="This course doesnt exist")
         {
             message.error("This course doesnt exist");
         }else if(response.data=="This course is not in your department")
         {
            message.error("This course is not in your department");

         }
    
        for (const ele of response.data)
        { 
           if( ! (ele.assignments).length==0)
           {
            //   console.log("hi im entered")
            for(const ass of ele.assignments)
            {
             data.push([ele.user,ass.day,ass.slot,ass.course,ass.location,ass.type]);
            }
          //  data.push([ele.user,"","","","",""]);

           }
          
        }
        //console.log(data);
          setTeachData(data);
        setTeachingassignments(<Table
            tableHeaderColor="primary"
            tableHead={["InstructorID","day","slot","course","location","type"]}
            tableData={data}
            />);
    })
    .catch(function (error) {   
        message.error("Please Write a valid course");
    });

   // 
   // setTeachingassignments(assigntable);
   }
   const handleTableView = (event)=>{
    event.preventDefault();
    viewType = event.target.value;
    if(viewType == "View Staff in Departement")
    {
        setTeachingassignments("");
        setEnterCOO("");
        setviewButton("");
        setStaffDeapartT("");
      //setviewRTable(viewStaffDepart);
      setviewAllStaff(<Table
        tableHeaderColor="primary"
        tableHead={["Email", "ID","isNew", "Faculty", "Departement","daysOff","Courses","coursesCoordintated" ,"annualLeave","accidentalLeave"]}
        tableData={myDepartData}
        />);
      setFilter(myfilter);
      setCourseCover("") ;//settable
      setCourseID("");
      setInstructorID("");
      setbut("");


    }
    if(viewType == "View CourseCoverage")
    {
        setTeachingassignments("");
        setviewAllStaff("");
        setEnterCOO("");
        setviewButton("");
        setCourseCover(courseCoverTable) ;//settable
        setviewRTable("");
        setFilter("");
        setCourseID("");
        setInstructorID("");
        setbut("");

         



    }else if (viewType == "View courseTeachingassignments")
    {
        setviewAllStaff("");
        setEnterCOO(EnterCOID);
        setviewButton(butt);
       // setTeachingassignments(assigntable);
        setCourseCover("") ;//settable
        setviewRTable("");
        setFilter("");
        setCourseID("");
        setInstructorID("");
        setbut("");
    }
   }
  



  return (
    <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
        <Card >

          <CardHeader  color="primary">
            <h4 className={classes.cardTitleWhite}>
              Here you can view Staff in your Departement , view Course Coverage , view Course Teaching assignments
            </h4>
            <p className={classes.cardCategoryWhite}>
             Please select which table to view.
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
            <GridItem xs={12} sm={12} md={4} > 
            <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required"> Select Which Table To View </InputLabel>
        <Select
          native
          onChange={handleTableView}
          formControlProps={{
            fullWidth: true
          }}
        >
          <option aria-label="None" value="" />
          <option  >View Staff in Departement</option>
          <option  >View CourseCoverage</option>
          <option  >View courseTeachingassignments</option>
      
        
        </Select>
      
        <FormHelperText>Required</FormHelperText>
      </FormControl>
               </GridItem>
            </GridContainer>
         
   
          

        
            <form onSubmit={handleviewTeach}>

                <GridContainer>
              
                <GridItem >
                {EnterCOO}
              
                </GridItem>
                <GridItem>
                {viewButton}
                </GridItem>
            

                </GridContainer>
                  </form>
                <form onSubmit={handleFilter}>
                <GridContainer>
         
               {filter}
              

                <GridItem xs={4} sm={4} md={2}>
                    {courseID}
                    {InstructorID}
                </GridItem>
            
                <GridItem xs={4} sm={4} md={2}>
                    {butfilter}
                </GridItem>
              
              
               {viewCourseCover}
               {viewAllStaff}
               {Teachingassignments}
        
           
               </GridContainer>
           
               </form>
          </CardBody>
         
        </Card>
      </GridItem>
   
    </GridContainer>

  
  );
}
