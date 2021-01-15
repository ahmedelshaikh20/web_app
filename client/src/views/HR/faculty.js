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

const useStyles = makeStyles(styles);

export default function TableList() {
  const [faculty,setFaculty] = useState([]);

  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
    axios.get('http://localhost:3000/api/user/hr/viewFaculty', {

    },{ withCredentials: true })
    .then(function (response) {
       let facc = [];
       response.data.forEach(element =>{
         facc.push([element.name]);
       })
     
       setFaculty(facc);
    })
    .catch(function (error) {
 

    });
}, [faculty])

  const classes = useStyles();
  const classesz = useStylesz();
 const newfaculty=  <CustomInput
c
 labelText="Enter Faculty New Name"
 id="facultynewname"
 formControlProps={{
   fullWidth: true
 }}
/>
const enterfac=  <CustomInput
             
labelText="Enter Faculty name"
id="facultyname"
formControlProps={{
  fullWidth: true
}}
/>
const butt=   <Button  className={classesz.Button} color="primary" type="submit" >Apply change</Button>;

const [addnew,setAdd] = useState("")
const [addfac,setAddfac] = useState("")

const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


   let fac_name = "Please enter faculty name"
   let type ="";
   const handleModFac = (event) => {
     type = event.target.value;
    setbutton(butt);
    setType(type);
  
    if(type =="Delete Faculty" || type == "Add Faculty" )
    { 
      setAddfac(enterfac)
      setAdd("");
      
          
    }
     if(type == "Update Faculty")
    {
      setAddfac(enterfac);
      setAdd(newfaculty);
    }

  };
  function handleModify(event) {
    event.preventDefault();
    let facname= event.target.facultyname.value;
    let newname= "";

    if(typez=="Delete Faculty")
    {
      axios.post('http://localhost:3000/api/user/hr/deleteFaculty', {
        name: facname,
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });


    }
     else if (typez == "Add Faculty")
     {
      axios.post('http://localhost:3000/api/user/hr/addFaculty', {
        name: facname,
      },{ withCredentials: true })
      .then(function (response) {

        message.success("Faculty has been added");
      })
      .catch(function (error) {
        message.error(error.response.data);
      });

     }
     else if ( typez =="Update Faculty")
     {
      newname = event.target.facultynewname.value;
      axios.post('http://localhost:3000/api/user/hr/updateFaculty', {
        name: facname,
        newName:newname
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
            <h4 className={classes.cardTitleWhite}>Modify Faculty</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can Add faculty , Update faculty , Delete Faculty
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Add/Update/Delete Faculty</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}

    
        >
          <option aria-label="None" value="" />
          <option  >Add Faculty</option>
          <option  >Update Faculty</option>
          <option  >Delete Faculty</option>
        
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
       <GridItem xs={12} sm={12} md={4} spacing={5}>
         {addfac}
       </GridItem>
       <GridItem  xs={12} sm={12} md={4} >
        {addnew}
       </GridItem>

       </GridContainer>
       <GridContainer>
       <GridItem  xs={12} sm={12} md={8} spacing={5} > 
       {addbutton}
       </GridItem>
       </GridContainer>
    
            <GridItem>
            <Table
              tableHeaderColor="primary"
              tableHead={["Faculty Name"]}
              tableData={faculty}
            />
            </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
