
import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import { AppBar, Toolbar,Container } from "@material-ui/core";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Card from "components/Card/Card.js";
import Box from '@material-ui/core/Box';
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse'
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
import { createDefaultClause } from "typescript";
import { element } from "prop-types";
const verify = require("../Login/Auth");


const useStylesz= makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
    color: "rgba(255,255,255,.62)",
    fontSize: "180px",
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




var cA= [];
const useStyles = makeStyles(styles);

export default function TableList() {
  const[flag, setFlag] = useState();
  const [faculty,setFaculty] = useState([]);
  const [test,setTest] = useState([]);
  const [test1,setTest1] = useState(["1"]);
  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
  let unmounted = false;

    axios.get('http://localhost:3000/api/user/instructor/viewSlotAssignments', {
    
    },{ withCredentials: true })
    .then(function (response) {
      if(!unmounted){
        let facc = [];
       var elements= [];
       
       response.data.forEach(element =>{
        
        
        
        elements.push(element['Course Name']);
        
       for(let element2 of element['Slot Assignments']){
            
            facc.push([element['Course Name'],element2['Day'], element2['Slot'], element2['Location'],element['ID']]);
            
            
        
       }
       
       })
       
       
       if(elements.length == 0){message.info("You Are Not Assigned To Any Course!")}
       setTest(elements)
       setFaculty(facc);
      }
    })
    .catch(function (error) {
      if(!unmounted){
      message.error(error.response.data);
      }
    });
    return () => {unmounted = true};
}, [])

  const classes = useStyles();
  const classesz = useStylesz();
  

  

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  





 
 const enterCourse=  <CustomInput

 labelText="Enter Course ID"
 id="course"
 formControlProps={{
   fullWidth: true
 }}
/>
const enterID=  <CustomInput
             
labelText="Enter Member ID"
id="id"
formControlProps={{
  fullWidth: true
}}
/>

const enterDay=  <CustomInput
             
labelText="Enter Day"
id="day"
formControlProps={{
  fullWidth: true
}}
/>

const enterSlot=  <CustomInput
             
labelText="Enter Slot"
id="slot"
formControlProps={{
  fullWidth: true
}}
/>

const enterNewSlot=  <CustomInput
             
labelText="Enter New Slot"
id="newSlot"
formControlProps={{
  fullWidth: true
}}
/>

const enterNewDay=  <CustomInput
             
labelText="Enter New Day"
id="newDay"
formControlProps={{
  fullWidth: true
}}
/>

const enterNewLocation=  <CustomInput
             
labelText="Enter New Location"
id="newLocation"
formControlProps={{
  fullWidth: true
}}
/>

const butt=   <Button  className={classesz.Button} color="primary" type="submit" >Done</Button>;

const [addCourse,setCourse] = useState("")
const [addID,setID] = useState("")
const [addDay,setDay] = useState("")
const [addSlot,setSlot] = useState("")
const [addNewSlot,setNewSlot] = useState("")
const [addNewDay,setNewDay] = useState("")
const [addNewLocation,setNewLocation] = useState("")
const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


  
   let type ="";
   const handleModFac = (event) => {
     type = event.target.value;
    
    setType(type);
  
    
     if(type == "Delete Assignment")
    {
      setFlag(false);
      setID(enterID);
      // setCourse(enterCourse);
      setDay(enterDay);
      setSlot(enterSlot);
      setNewDay("");
      setNewSlot("");
      setNewLocation("");
      setbutton(butt);
    }

    else if(type == "Add Assignment"){
      setFlag(true);
      setDay("");
      setSlot("");
      setID(enterID);
      setCourse(enterCourse);
      setNewDay("");
      setNewSlot("");
      setNewLocation("");
      setbutton(butt);
      
      
    }

    else if(type == "Update Assignment"){
      setFlag(false);
      setDay(enterDay);
      setSlot(enterSlot);
      setID(enterID);
      setNewDay(enterNewDay);
      setNewSlot(enterNewSlot);
      setNewLocation(enterNewLocation);
      setbutton(butt);
      
      
    }

    else if(type == "Remove Member"){
      setFlag(true);
      setDay("");
      setSlot("");
      setID(enterID);
      setCourse(enterCourse);
      setNewDay("");
      setNewSlot("");
      setNewLocation("");
      setbutton(butt);
      
      
    }


  };

  function handleModify(event) {
    event.preventDefault();
    
    
    if(typez=="Add Assignment")
    {
      var courseID=  "" + event.target.course.value;
      var memberID=  "" + event.target.id.value;
      axios.post('http://localhost:3000/api/user/instructor/assignToSlot', {
        id:memberID,
        course:courseID
        
        
      },{ withCredentials: true })
      .then(function (response) {
          
        
         
        message.success(response.data);

        
        
         
       
        
      })
      .catch(function (error) {
  
        message.error(error.response.data);
  
      });
      

    }

    else if(typez=="Delete Assignment"){
      
      
      var memberID=  "" + event.target.id.value;
      var day = "" + event.target.day.value;
      var slot = "" + event.target.slot.value;
      axios.post('http://localhost:3000/api/user/instructor/deleteSlotAssignment', {
        id:memberID,
        day:day,
        slot:slot
      },{ withCredentials: true })
      .then(function (response) {
  
        
        message.success(response.data);
        
        
  
      })
      .catch(function (error) {
  
        message.error(error.response.data);
  
      });





    }


    else if(typez=="Update Assignment"){
      
      
      var memberID=  "" + event.target.id.value;
      var day = "" + event.target.day.value;
      var slot = "" + event.target.slot.value;
      var newDay = "" + event.target.newDay.value;
      var newSlot = "" + event.target.newSlot.value;
      var newLocation = "" + event.target.newLocation.value;
      axios.post('http://localhost:3000/api/user/instructor/updateSlotAssignment', {
        id:memberID,
        day:day,
        slot:slot,
        newDay:newDay,
        newSlot:newSlot,
        newLocation:newLocation
      },{ withCredentials: true })
      .then(function (response) {
  
        
        message.success(response.data);
        
        
  
      })
      .catch(function (error) {
  
        message.error(error.response.data);
  
      });





    }

    else if(typez=="Remove Member")
    {
      var courseID=  "" + event.target.course.value;
      var memberID=  "" + event.target.id.value;
      axios.post('http://localhost:3000/api/user/instructor/removeAssignedMember', {
        id:memberID,
        course:courseID
        
        
      },{ withCredentials: true })
      .then(function (response) {
          
        
         
        message.success(response.data);

        
        
         
       
        
      })
      .catch(function (error) {
  
        message.error(error.response.data);
  
      });
      

    }



    axios.get('http://localhost:3000/api/user/instructor/viewSlotAssignments', {
    
    },{ withCredentials: true })
    .then(function (response) {
        let facc = [];
       var elements= [];
       
       response.data.forEach(element =>{
        
        
        
        elements.push(element['Course Name']);
        
       for(let element2 of element['Slot Assignments']){
            
            facc.push([element['Course Name'],element2['Day'], element2['Slot'], element2['Location'],element['ID']]);
            
            
        
       }
       
       })
       
       
      
       setTest(elements)
       setFaculty(facc);
       
    })
    .catch(function (error) {

      message.error(error.response.data);

    });

    
  }

  

  


 

    
    
  return (
    
    <GridContainer>
        
      <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Modify Staff Assignments</h4>
 
          </CardHeader>
          <CardBody>


          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Assign/Update/Delete/Remove</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}

    
        >
          <option aria-label="None" value="" />
          <option>Add Assignment</option>
          <option>Delete Assignment</option>
          <option>Update Assignment</option>
          <option>Remove Member</option>
        
        </Select>

        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
       
          
      
          
              <GridItem  xs={12} sm={12} md={4} >
        {addID}
       </GridItem>
      
       {test1.map((value,index) => {
        //  console.log(!flag);
        if(flag){
            
          
          
        return   <GridItem  xs={12} sm={12} md={4} >
        {addCourse}
       </GridItem>
                  }

        else{return}
      })}
       <GridItem  xs={12} sm={12} md={4} >
        {addDay}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
        {addSlot}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
        {addNewDay}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
        {addNewSlot}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
        {addNewLocation}
       </GridItem>
       </GridContainer>
       <GridContainer>
       <GridItem  xs={12} sm={12} md={8} spacing={5} > 
       {addbutton}
       </GridItem>

       </GridContainer>

       </form>
          
       <AppBar position="relative" color="primary" style={{ top: 30 }}> 
      
        <toolbar style = {{marginLeft:12}}>
          <Typography position="relative" variant="" color="inherit" >
            Slot Assignments
          </Typography>
          </toolbar>
      
    </AppBar>
    
            <GridItem style={{ marginTop: `60px` }}>
            

            {test.map((value, index) => {
         var temp = [];
         
        
          for(let element of faculty){
            var temp2;
            var temp3;
            var temp4;
            var temp5;
              if(!element[0].localeCompare(value)){
                    temp.push([element[1], element[2], element[3]]);
                    temp2 = element[0];
                    temp3 = element[1];
                    temp4 = element[2];
                    temp5 = element[4]
              }
          }

          
          if(temp.length == 0){return}
          
          else{
            
            
        return  <GridItem> <Card>   <CardBody> <h4 className={classes.cardTitleBlack}>{value}</h4>
            <Table key={value}
        tableHeaderColor="primary"
        tableHead={["Day", "Slot", "Location"]}
        tableData= {temp}
      /> </CardBody> </Card>  </GridItem>
          }
      })}
          
    


            
            </GridItem>
            
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}