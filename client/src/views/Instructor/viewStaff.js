
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
  
  
  const[rows, setRows] = useState([]);

  useEffect(() => {
    if (!verify()) {
      window.location.href = "/";
  }
  
    // axios.get('http://localhost:3000/api/user/instructor/viewDepartmentStaff', {
    
    // },{ withCredentials: true })
    // .then(function (response) {
    //   //   let facc = [];
       
    //   //  var cC = [];
    //   //  var rows1 = [];
    //   //  response.data.forEach(element =>{
        
    //   //   var t 
    //   //   var t2 
    //   //   var t3
    //   //   var t4
    //   //   var t5
    //   //   var t6
    //   //    t = element['Name'];
    //   //    t2 = element['Department'];
    //   //    t3 = element['Email'];
    //   //    t4 = element['Personal Details'];
    //   //    t5 = element['Courses'];
    //   //    t6 = element['Courses Coordinated'];
    //   //   //  rows.push(createData(t, t2, t3, t4, t5, t6));
    //   //   facc.push(createData(element['Name'], element['Department'], element['Email'], element['Personal Details'], element['Courses']));
    //   //   cA.push([element['Courses']]);
    //   //   cC.push();
        
    //   //  })
       
      
    //   //  setCoursesAssigned(cA);
    //   //  setCoursesCoordinated(cC);
    //   //  setFaculty(facc);
       
    // })
    // .catch(function (error) {

    //   message.error(error);

    // });
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
  
  function createData(name, email, department, personalDetails, history, history2) {
    return {
      name,
      email,
      department,
      personalDetails,
      history,
      history2
    };
  }




 
 const newfaculty=  <CustomInput

 labelText="Enter Course ID"
 id="facultynewname"
 formControlProps={{
   fullWidth: true
 }}
/>
// const enterfac=  <CustomInput
             
// labelText="Enter Faculty name"
// id="facultyname"
// formControlProps={{
//   fullWidth: true
// }}
// />
const butt=   <Button  className={classesz.Button} color="primary" type="submit" >Done</Button>;

const [addnew,setAdd] = useState("")
const [addfac,setAddfac] = useState("")

const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


   let fac_name = "Please enter faculty name"
   let type ="";
   const handleModFac = (event) => {
     type = event.target.value;
    
    setType(type);
  
    
     if(type == "Department")
    {
      setRows([]);
      setAdd("");
      setbutton("");
      const article = { title: '101' };
      axios.get('http://localhost:3000/api/user/instructor/viewDepartmentStaff', {
        
    },{ withCredentials: true })
    .then(function (response) {

      var r;
      
       response.data.forEach(element =>{
        
        var t 
        var t2 
        var t3
        var t4
        var t5
        var t6
         t = element['Name'];
         t3 = element['Department'];
         r = element['Department'];
         t2 = element['Email'];
         t4 = element['Personal Details'];
         t5 = element['Courses'];
         t6 = element['Courses Coordinated'];
         if(t3){
         setRows(rows => [...rows, createData(t, t2, t3, t4, t5, t6)]);
         }
       
       })
      
      if(!r) message.info("You Are Not Assigned To A Department");

      //  setFlag(true);
    })
    .catch(function (error) {
      
      message.error(error.response.data);

    });
    }

    else if(type == "Course"){
      setRows([]);
      setAdd(newfaculty);
      setbutton(butt);
      
      
    }

  };

  function handleModify(event) {
    event.preventDefault();
    var facname=  "" + event.target.facultynewname.value;
    let newname= "";
    
    if(typez=="Course")
    {
      setRows([]);
      axios.get('http://localhost:3000/api/user/instructor/viewCourseStaff', {
        
        params:{id:facname}
      },{ withCredentials: true })
      .then(function (response) {
          
        
         
        
         response.data.forEach(element =>{
          
          var t = "";
          var t2 = "";
          var t3 = "";
          var t4 = "";
          var t5 = "";
          var t6 = "";
           t = element['Name'];
           t3 = element['Department'];
           t2 = element['Email'];
           t4 = element['Personal Details'];
           t5 = element['Courses'];
           t6 = element['Courses Coordinated'];
          setRows(rows => [...rows, createData(t, t2, t3, t4, t5, t6)]);

         
          //  setRows([...rows, {

          //   name: t,
          //   department: t2,
          //   email: t3,
          //   personalDetails: t4,
          //   history: t4,
          //   history2:t6
          //  }]);
          
          
         
         })
        
        
         
       
        
      })
      .catch(function (error) {
  
        message.error(error.response.data);
  
      });
      

    }
    
  }

  var final = [];

  for(let element of rows){
      
    for(let element2 of element.history){
      
      final.push([element.email, element2]);


    }


  }

  var final2 = [];

  for(let element of rows){
      
    for(let element2 of element.history2){
      
      final2.push([element.email, element2]);


    }


  }

  


  function Row(props) {
    
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
          <TableRow className={classes.root}>
            <TableCell>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.department}</TableCell>
            <TableCell align="center">{row.personalDetails}</TableCell>
           
            <TableCell align="center">     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton></TableCell>
              <TableCell align="center">     <IconButton aria-label="expand row" size="small" onClick={() => setOpen1(!open1)}>
                {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton></TableCell>
       
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Courses Assigned
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                   
                    {final.map((historyRow) => {
                      var temp = historyRow[1];
                      if(!row.email.localeCompare(historyRow[0])){
                        
                     
                      
                     return  <TableRow key = {temp}>
                      <TableCell component="th" scope="row">
                        {temp}
                        
                      </TableCell>
                    </TableRow>

                   
                    
                        }
                    })}
                      
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Courses Coordinated
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                   
                    {final2.map((historyRow2) => {
                      var temp2 = historyRow2[1];
                      if(!row.email.localeCompare(historyRow2[0])){
                        
                     
                      
                     return  <TableRow key = {temp2}>
                      <TableCell component="th" scope="row">
                        {temp2}
                        
                      </TableCell>
                    </TableRow>

                   
                    
                        }
                    })}
                      
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }

    
    
  return (
    
    <GridContainer>
        
      <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>View Staff By Department Or Course</h4>
 
          </CardHeader>
          <CardBody>


          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Department/Course</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}

    
        >
          <option aria-label="None" value="" />
          <option>Department</option>
          <option>Course</option>
         
        
        </Select>

        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
       
       <GridItem  xs={12} sm={12} md={4} >
        {addnew}
       </GridItem>

       </GridContainer>
       <GridContainer>
       <GridItem  xs={12} sm={12} md={8} spacing={5} > 
       {addbutton}
       </GridItem>
       </GridContainer>

 

            <GridItem style={{ marginTop: `30px` }}>
            

          
          <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Department&nbsp;</TableCell>
            <TableCell align="center">Personal Details&nbsp;</TableCell>
            <TableCell align="center">Courses Assigned&nbsp;</TableCell>
            <TableCell align="center">Courses Coordinated&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {rows.map((row) => (
            
            
            <Row key={row.email} row={row} />
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    


            
            </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}