import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "@material-ui/core/Table";
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
import { positions } from '@material-ui/system';
import { createDefaultClause } from "typescript";
import { Typography } from "@material-ui/core";
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
  },
  table: {
    minWidth: 650,
  },
};


const useStyles = makeStyles(styles);

export default function TableList() {
  const [faculty,setFaculty] = useState([]);
  const [button1,setButton1] = useState("");
  const [button2,setButton2] = useState("");
  const[rows, setRows] = useState([]);
  var rows1 = [];
  function createData(id, senderID, status, courseID, reason, day, slot) {
    return {
        id,
        senderID,
        status,
        courseID,
        reason,
        day,
        slot,
        
    };
  }



  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
    let unmounted = false;
    axios.get('http://localhost:3000/api/user/coordinator/viewSlotLinkingRequests', {

    },{ withCredentials: true })
    .then(function (response) {
        setRows([]);
        var flag = false;
       
       response.data.forEach(element =>{
        flag = true;
        var t = "";
        var t2 = "";
        var t3 = "";
        var t4 = "";
        var t5 = "";
        var t6 = "";
        var t7 = "";
        t = element['ID'];
        t2 = element['Sender ID'];
        t3 = element['Status'];
        t4 = element['Course ID'];
        t5 = element['Reason'];
        t6 = element['Day'];
        t7 = element['Slot'];
       
            
          
            // const b1 = <GridContainer  ><Button  style={styles} className={classesz.Button} id = {accept} color="primary" type="submit" >Accept</Button> </GridContainer>;
            // const b2 = <Button style={{maxWidth: '30px', maxHeight: '5px', minWidth: '30px', minHeight: '5px'}} className={classesz.Button} id = {reject} color="primary" type="submit" >Accept</Button>;
            setRows(rows => [...rows, createData(t, t2, t3, t4, t5, t6, t7)]);
            
       })

      
       if(!flag){message.info("You Don't Have Any Slot Linking Requests")}
       
      
    })
    .catch(function (error) {
      
      message.error(error.response.data);
      
    });
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
  
 
  function Row(props) {
    
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const classes = useRowStyles();
    
    return (
        <React.Fragment>
          <TableRow className={classes.root}>
     
            <TableCell align="center">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.senderID}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="center">{row.courseID}</TableCell>
            <TableCell align="center">{row.reason}</TableCell>
            <TableCell align="center">{row.day}</TableCell>
            <TableCell align="center">{row.slot}</TableCell>
            <TableCell align="center"> <div><Button style={{ height: 20, width: '50%', position: 'relative' }}  color="primary" onClick={() => handleAccept(row.id)}>Accept</Button><Button style={{ height: 0, width: '50%', position: 'relative' }}  color="primary" onClick={() => handleReject(row.id)}>Reject</Button></div></TableCell>
              
       
          </TableRow>
        
        </React.Fragment>
      );
    }

    const handleAccept = (id) =>{     
        axios.post('http://localhost:3000/api/user/coordinator/acceptSlotLinkingRequest',
         {    
           id: id
          }
         ,{ withCredentials: true })
        .then(function (response) { 
          message.success(response.data);
    
        })
        .catch(function (error) {
          message.error(error.response.data);
    
        });
    
        axios.get('http://localhost:3000/api/user/coordinator/viewSlotLinkingRequests', {

    },{ withCredentials: true })
    .then(function (response) {
        setRows([]);
        var flag = false;
       
       response.data.forEach(element =>{
        flag = true;
        var a = element['Status'];
        var t = element['ID'];
        var t2 = element['Sender ID'];
        var t3 = element['Status'];
        var t4 = element['Course ID'];
        var t5 = element['Reason'];
        var t6 = element['Day'];
        var t7 = element['Slot'];
       
            
          
            // const b1 = <GridContainer  ><Button  style={styles} className={classesz.Button} id = {accept} color="primary" type="submit" >Accept</Button> </GridContainer>;
            // const b2 = <Button style={{maxWidth: '30px', maxHeight: '5px', minWidth: '30px', minHeight: '5px'}} className={classesz.Button} id = {reject} color="primary" type="submit" >Accept</Button>;
            setRows(rows => [...rows, createData(t, t2, t3, t4, t5, t6, t7)]);
            
       })

      
       if(!flag){message.info("You Don't Have Any Slot Linking Requests")}
       
      
    })
    .catch(function (error) {
      
      message.error(error.response.data);
      
    });
    
       }

       const handleReject = (id) =>{     
        axios.post('http://localhost:3000/api/user/coordinator/rejectSlotLinkingRequest',
         {    
           id: id
          }
         ,{ withCredentials: true })
        .then(function (response) { 
          message.success(response.data);
    
        })
        .catch(function (error) {
          message.error(error.response.data);
    
        });
    
        axios.get('http://localhost:3000/api/user/coordinator/viewSlotLinkingRequests', {

    },{ withCredentials: true })
    .then(function (response) {
        setRows([]);
        var flag = false;
       
       response.data.forEach(element =>{
        flag = true;
        var a = element['Status'];
        var t = element['ID'];
        var t2 = element['Sender ID'];
        var t3 = element['Status'];
        var t4 = element['Course ID'];
        var t5 = element['Reason'];
        var t6 = element['Day'];
        var t7 = element['Slot'];
       
            
          
            // const b1 = <GridContainer  ><Button  style={styles} className={classesz.Button} id = {accept} color="primary" type="submit" >Accept</Button> </GridContainer>;
            // const b2 = <Button style={{maxWidth: '30px', maxHeight: '5px', minWidth: '30px', minHeight: '5px'}} className={classesz.Button} id = {reject} color="primary" type="submit" >Accept</Button>;
            setRows(rows => [...rows, createData(t, t2, t3, t4, t5, t6, t7)]);
            
       })

      
       if(!flag){message.info("You Don't Have Any Slot Linking Requests")}
       
      
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
            <h4 className={classes.cardTitleWhite}>Slot Linking Requests</h4>
           
          </CardHeader>
          <CardBody>



            <GridItem>

            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center" style={{color: 'purple'}}>Request ID</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Sender ID</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Status&nbsp;</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Course ID&nbsp;</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Reason&nbsp;</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Day&nbsp;</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Slot&nbsp;</TableCell>
            <TableCell align="center" style={{color: 'purple'}}>Accept/Reject&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {rows.map((row) => (
            
            
                 <Row  row={row} />
            
           
            
            
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    

            </GridItem>
            
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}