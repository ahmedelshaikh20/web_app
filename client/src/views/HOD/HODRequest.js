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


// Or import the input component
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



const [HODREQ,setHODREQ] = useState([])


  let   HODREQUESTS =  
  <Table
 tableHeaderColor="primary"
 tableHead={["RequestId", "Sender", "Departement", "Type","Day","DayToBeReplaced","Reason","DayOfLeave","Status","Action"]}
 tableData={HODREQ}
 />

 
let HODREQDATA= [];


let rejectComment =   <CustomInput
labelText="Reject comment"
id="comment"
formControlProps={{

}}

/>
  useEffect(() => { 
    if (!verify()) {
      window.location.href = "/";
  }
      
  axios.get('http://localhost:3000/api/hod/staffRequests', {

  },{ withCredentials: true })
  .then(function (response) { 
   
    response.data.forEach(element =>{

      HODREQDATA.push([element.id,element.sender.name,element.departement.name,element.type,element.day,element.dayToBeReplaced,element.reason,element.dayOfTheLeave,element.status,
          <div>
        <form className={classes.container} onSubmit={handlereject} >
          <Button  style={{maxWidth: '110px', maxHeight: '30px', minWidth: '110px', minHeight: '30px'}}   onClick={() => handleaccept(element.id)} color="primary" >Accept Request</Button> 
        
        

          <input id="reqID" name="reqID" type="hidden" value={element.id}></input>
          {rejectComment}
           <Button   style={{maxWidth: '110px', maxHeight: '30px', minWidth: '110px', minHeight: '30px'}}    color="primary"  type="submit" >Reject Request</Button>
           </form>
      

                 
              
           </div>
        ]);

      

    });

    setHODREQ(HODREQDATA);
    
  })
  .catch(function (error) {
  });




   
}, [])

  

   const handleaccept = (requestID) =>{     
    axios.post('http://localhost:3000/api/hod/acceptRequest',
     {    
      requestId: requestID
      }
     ,{ withCredentials: true })
    .then(function (response) { 
      message.success(response.data);

    })
    .catch(function (error) {
      message.error(error.response.data);

    });



   }


   const handlereject = (requestID) =>{   

    requestID.preventDefault();

   
    axios.post('http://localhost:3000/api/hod/rejectRequest',{
      requestId:requestID.target.reqID.value,
      comment:requestID.target.comment.value
    }
    ,{ withCredentials: true })
    .then(function (response) { 
      message.success(response.data);
    })
    .catch(function (error) {
      message.error(error.response.data);

    });


   }









  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card >

          <CardHeader  color="primary">
            <h4 className={classes.cardTitleWhite}>
             view Leave/dayOff Request
            </h4>
            <p className={classes.cardCategoryWhite}>
             Here you can view staff request.
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container}  >

            <GridContainer>
            <GridItem xs={12} sm={12} md={4} > 
         
               </GridItem>
            </GridContainer>
            </form>
            <GridContainer>
             
               {HODREQUESTS}
            
           
               
               </GridContainer>
           
            
          </CardBody>
         
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
