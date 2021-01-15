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
  const [Loc,setLoc] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/hr/viewLocations', {

    },{ withCredentials: true })
    .then(function (response) {
       let locations = [];
       response.data.forEach(element =>{
        locations.push([element.name,element.type,element.currentCapacity,element.maxCapacity]);
       })
     
       setLoc(locations);
    })
    .catch(function (error) {
 
      message.error(error);

    });
}, [Loc])

  const classes = useStyles();
  const classesz = useStylesz();
 const officeName=  <CustomInput
c
 labelText="Enter Office  Name"
 id="officeName"
 formControlProps={{
   fullWidth: true
 }}
/>
const OfficeType=  <CustomInput
             
labelText="Enter Office Type "
id="officeType"
formControlProps={{
  fullWidth: true
}}
/>

const maxCapacity=  <CustomInput
             
labelText="Enter Office maxCapacity"
id="maxCapacity"
formControlProps={{
  fullWidth: true
}}
/>
const currentCapacity=  <CustomInput
             
labelText="Enter Office CurrentCapacity"
id="currentCapacity"
formControlProps={{
  fullWidth: true
}}
/>

const butt=   <Button  className={classesz.Button} color="primary" type="submit" >Apply change</Button>;

const [addOffice,setAddOffice] = useState("")
const [addmaxCapcity,setAddmaxCapcity] = useState("")

const [addcurrCapacity,setAddcurrCapacity] = useState("")

const [addType,setAddType] = useState("")

const [addnew,setAddnew] = useState("")

const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


   let officename ;
   let _maxCapacity;
   let _currentCapacity;
   let officeType;
   let type;
   const handleModFac = (event) => {
     type = event.target.value;
    setbutton(butt);
    setType(type);
  
    if(type == "Add Location" )
    { 
        setAddOffice(officeName);
        setAddType(OfficeType);
        setAddcurrCapacity("");
        setAddmaxCapcity(maxCapacity);

          
    }
    if(type =="Delete Location")
    { 
        setAddOffice(officeName);
        setAddType("");
        setAddcurrCapacity("");
        setAddmaxCapcity("");
    }
     if(type == "Update Location")
    {
        setAddOffice(officeName);
        setAddType(OfficeType);
        setAddcurrCapacity(currentCapacity);
        setAddmaxCapcity(maxCapacity);
    }

  };
  function handleModify(event) {
    event.preventDefault();
    let offname= "";
    let maxcap= "";
    let currcap= "";
    let currtype= "";


    if(typez=="Delete Location")
    {
        offname=event.target.officeName.value;

      axios.post('http://localhost:3000/api/user/hr/deleteLocation', {
        name: offname,
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });


    }
     else if (typez == "Add Location")
     {
        offname=event.target.officeName.value;
        maxcap=event.target.maxCapacity.value;
       // currcap=event.target.currentCapacity.value;;
        currtype=event.target.officeType.value;;


      axios.post('http://localhost:3000/api/user/hr/addLocation', {
        name: offname,
        type:currtype,
        maxCapacity:maxcap

      },{ withCredentials: true })
      .then(function (response) {
        message.success("Succesfully Added Location");
      })
      .catch(function (error) {
        message.error(error.response.data);
      });

     }
     else if ( typez =="Update Location")
     {
        offname=event.target.officeName.value;
        maxcap=event.target.maxCapacity.value;
        currcap=event.target.currentCapacity.value;;
        currtype=event.target.officeType.value;;
      axios.post('http://localhost:3000/api/user/hr/updateLocation', {
        name: offname,
        type:currtype,
        currentCapacity:currcap,
        maxCapacity:maxcap
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
            <h4 className={classes.cardTitleWhite}>Modify Location</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can Add Location , Update Location , Delete Location <br/> Location types  [ 'tutorital rooms' , 'lecture halls' , 'offices']
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Add/Update/Delete Location</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}
        >
          <option aria-label="None" value="" />
          <option  >Add Location</option>
          <option  >Update Location</option>
          <option  >Delete Location</option>
        
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
       <GridItem xs={12} sm={12} md={4} >
         {addOffice}
       </GridItem>
       <GridItem xs={12} sm={12} md={4} >
         {addType}
       </GridItem>
       <GridItem xs={12} sm={12} md={4} >
         {addcurrCapacity}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
       {addmaxCapcity}
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
              tableHead={["name ","type","currentCapacity","maxCapacity"]}
              tableData={Loc}
            />
            </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
