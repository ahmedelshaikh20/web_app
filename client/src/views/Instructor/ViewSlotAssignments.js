
import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
import { createDefaultClause } from "typescript";
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
  const [test,setTest] = useState([]);
 

  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
  let unmounted = false;
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
      
       if(elements.length == 0){message.info("You Are Not Assigned To Any Course!")}
       setTest(elements)
       
       setFaculty(facc);
      
    })
    .catch(function (error) {
   
      message.error("You Don't have any slot assignments to View");
      
    });
}, [])

  const classes = useStyles();
  const classesz = useStylesz();
  

  

// for(let e of test){

//     console.log(e);


// }

// console.log(test.length);

var o = [];
  return (
    
    <GridContainer>
        
      <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>View Slot Assignments</h4>
 
          </CardHeader>
          <CardBody>

        


            <GridItem>
            

            
            
      {test.map((value, index) => {
         var temp = [];
         var temp2;
         var temp3;
         var temp4;
         var temp5;
        //  console.log(value);
          for(let element of faculty){
              if(!element[0].localeCompare(value)){
                    temp.push([element[1], element[2], element[3]]);
                    temp2 = element[4];
                    temp3 = element[1];
                    temp4 = element[2]
                    temp5 = '' + temp2 + temp3 + temp4;
              }
              
          }

          
          if(temp.length == 0){return}
          
          else{
            
            
        return  <GridItem> <Card>   <CardBody> <h4 className={classes.cardTitleBlack}>{value}</h4>
            <Table key={temp5}
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