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
const options = [
  'Pending',
  'Rejected',
  'Accepted'
];
const ITEM_HEIGHT = 58;


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
  
  let viewSubmittedReq  = [] ;
  const bb = mez();
  const classes = useStyles();
  const classesz = useStylesz();
  const classesz1 = shady();


  const fetchItems = async  () =>{
   let comment ="";
    await axios.get('http://localhost:3000/api/user/request/viewSubmittedRequests/', {
    },{ withCredentials: true })
    .then(function (response) {
        
      response.data.forEach(element =>{
        if(element.status=="Rejected")
        {
          id_comment.forEach(ele=>{
            if(ele.includes(element.id))
            {
              viewSubmittedReq.push([element.id,element.course,element.day,element.dateOfLeave,element.dayToBeReplaced,element.type,element.status,ele[1]]);

            }
          })

        }
        else
        {
          viewSubmittedReq.push([element.id,element.course,element.day,element.dateOfLeave,element.dayToBeReplaced,element.type,element.status]);

        }
  
      });
      setmySubReq(viewSubmittedReq);


      //console.log("finished @ axios ",viewSubmittedReq)
      
 

    })
    .catch(function (error) {   
    });
  

  }
  let me ;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosenotused = (event)=>{
    setAnchorEl(null);

  }

  const [myCourse,setMyCourse] = useState([])

  const [myViewReplace,setmyViewReplace] = useState([])

  let [mySubReq,setmySubReq] = useState([])

  const [filter,setFilter] = useState("")


const butt=   <Button  className={classesz.Button} color="primary" type="submit" >SEND REQUEST</Button>;

const [addCourseID,setCourseID] = useState("")
const [addDay,setDay] = useState("")

const [addDayReplaced,setDayReplaced] = useState("")


const [addSlot,setSlot] = useState("")

const [addmyDate,setmyDate] = useState("")

const [addReason,setReason] = useState("")


const [addReason2,setReason2] = useState("")


const [addLeave,setLeave] = useState("")


const [addbutton,setbutton] = useState("")

const [typez,setType] = useState("")


const[testtable,setTest] = useState("");


const [startDate, setStartDate] = useState(null);



const [viewRTable,setviewRTable]=useState("");

const [viewSub,setviewSub]=useState("");

const [viewAllSub,setviewAllSub]=useState("");




  let viewReplaceTable =  
  <Table
 tableHeaderColor="primary"
 tableHead={["RequestId", "Sender", "Course", "Day", "DateOfLeave","Reason","Status","Action"]}
 tableData={myViewReplace}
 />

  let courseoption=[];
  let role ;
  let viewReplacement  = [] ;
  let req_finished = false;

let id_comment = [];

  useEffect(() => { 

    axios.get('http://localhost:3000/api/user/hr/getComment', {
    },{ withCredentials: true })
    .then(function (response) {
       id_comment = response.data;
    })
    .catch(function (error) {   
    });

    fetchItems();

    me = sessionStorage.getItem('email');
    role = sessionStorage.getItem('role');
    axios.get('http://localhost:3000/api/user/myCourses', {
    },{ withCredentials: true })
    .then(function (response) {
     response.data.forEach(ele=>{
       courseoption.push(<Option name={ele}/>); 
     });
     setMyCourse(courseoption);
    })
    .catch(function (error) {   
    });

    
  


      
    axios.get('http://localhost:3000/api/user/request/viewReplacement/', {

    },{ withCredentials: true })
    .then(function (response) { 
     
      response.data.forEach(element =>{
        
        if(role == "HOD")
        {
          viewReplacement.push([element.requestId,element.sender,element.course,element.day,element.dateOfLeave,element.reason,element.status,
            <div>
             <Button  onClick={() => handleaccept(element.requestId)} color="primary" >Accept Request</Button> 
              

             <Button  onClick={() => handlereject(element.requestId)} color="primary" >Reject Request</Button>
             </div>
          ]);

        }else{

        if(element.sender == me)
        {
          viewReplacement.push([element.requestId,element.sender,element.course,element.day,element.dateOfLeave,element.reason,element.status, <Button  onClick={() => handlecancel(element.requestId)} color="primary" >Cancel Request</Button>]);

        }
        else if (element.sender != me)
        {

          viewReplacement.push([element.requestId,element.sender,element.course,element.day,element.dateOfLeave,element.reason,,element.status, <Button  onClick={() => handleaccept(element.requestId)} color="primary" >Accept Request</Button>]);

        }}

      });

      setmyViewReplace(viewReplacement);
      
    })
    .catch(function (error) {
    });

 

   
}, [])




const courseID =  
<div>
<FormControl  className={classesz1.formControl} >

<InputLabel  htmlFor="age-native-required">Please select CourseID</InputLabel>

<Select
  native
  formControlProps={{
    fullWidth: true
  }}
  inputProps={{
    id: 'courseID'
  }}
>
  <option aria-label="None" value="" />
  {myCourse}
</Select>
<FormHelperText>Required</FormHelperText>
</FormControl>
</div>







const day=    
<div>
<FormControl  className={classesz1.formControl} >
     
<InputLabel  htmlFor="age-native-required">Please select day</InputLabel>
   <Select
native
formControlProps={{
  fullWidth: true
}}
inputProps={{
  id: 'dayOff'

}}
>

  


<option aria-label="None" value="" />
<option  >Saturday</option>
<option  >Sunday</option>
<option   >Monday</option>
<option   >Tuesday</option>
<option  >Wednesday</option>
<option  >Thursday</option>        
</Select>
<FormHelperText>Required</FormHelperText>
</FormControl>
</div>


const leavetypes =
<div>
<FormControl  className={classesz1.formControl} >

<InputLabel  htmlFor="age-native-required">Leave Request Type</InputLabel>

<Select
  native
  formControlProps={{
    fullWidth: true
  }}
  inputProps={{
    id: 'leaveType',

  }}
>
  <option aria-label="None" value="" />
  <option  >Maternal Leave</option>
  <option  >Sick Leave</option>
  <option  >Accidental Leave</option>
</Select>
<FormHelperText>Required</FormHelperText>
</FormControl>
</div>
const dayReplaced=    
<div>
<FormControl  className={classesz1.formControl2} >
     
<InputLabel  htmlFor="age-native-required">Please select dayToBeReplaced</InputLabel>
   <Select
native
formControlProps={{
  fullWidth: true
}}
inputProps={{
  id: 'dayToBeReplaced'

}}
>


<option aria-label="None" value="" />
<option  >Saturday</option>
<option  >Sunday</option>
<option   >Monday</option>
<option   >Tuesday</option>
<option  >Wednesday</option>
<option  >Thursday</option>        
</Select>
<FormHelperText>Required</FormHelperText>
</FormControl>
</div>

const myDate =
<FormControl  className={classesz1.formControl} >

<CustomInput
labelText="dateOfLeave YYYY/mm/dd"
id="datleave"
formControlProps={{
  fullWidth: true
}}


/>
<FormHelperText>Required</FormHelperText>


</FormControl>
const slot = 
<div>
<FormControl  className={classesz1.formControl} >
<InputLabel htmlFor="age-native-required">Please select a slot</InputLabel>


 <Select
native
formControlProps={{
  fullWidth: true
}}
inputProps={{
  id: 'slot'

}}
>
<option aria-label="None" value="" />
<option  >First</option>
<option  >Second</option>
<option   >Third</option>
<option   >Fourth</option>
<option  >Fifth</option>
</Select>
<FormHelperText>Required</FormHelperText>
</FormControl>
</div>

const Reason= 
<div>

<TextField
className={bb.root}
id="reason"
label="Reason"
multiline
rows={4}

variant="outlined"

/>
</div>


const Reason2= 
<div>

<TextField
className={bb.root}
id="reason2"
label="Reason"
multiline
rows={4}

variant="outlined"

/>
</div>




const myfilter=    
<div>
<FormControl  className={classesz1.formControl} >

<InputLabel  htmlFor="age-native-required">Filter By Status</InputLabel>
<Select
native
onChange={(event)=> {
let tt = event.target.value;
let accepted= [];
let rejected= [];
let pending= [];
//console.log("viewbefore: " +viewSubmittedReq.length);
// viewSubmittedReq
if(tt=="Accepted"){
console.log(mySubReq);

mySubReq.forEach(ele=>{

  if(ele.includes("Accepted"))
{
accepted.push(ele);
}

})


setviewAllSub(<Table
tableHeaderColor="primary"
tableHead={["RequestId", "Course", "Day", "DateOfLeave","dayToBeReplaced","RequestType","Status"]}
tableData={accepted}
/>);


}else if(tt=="Rejected"){
  mySubReq.forEach(ele=>{
    if(ele.includes("Rejected"))
{
rejected.push(ele);

}
});

setviewAllSub(<Table
  tableHeaderColor="primary"
  tableHead={["RequestId", "Course", "Day", "DateOfLeave","dayToBeReplaced","RequestType","Status","Comment"]}
  tableData={rejected}
  />);


}else if (tt=="Pending"){

  console.log(mySubReq);
  mySubReq.forEach(ele=>{
if(ele.includes("Pending"))
{
  console.log("hello iam pending");

pending.push(ele);

}

});
setviewAllSub(<Table
  tableHeaderColor="primary"
  tableHead={["RequestId", "Course", "Day", "DateOfLeave","dayToBeReplaced","RequestType","Status"]}
  tableData={pending}
  />);


}
}}
formControlProps={{
fullWidth: true
}}
inputProps={{
id: 'mefilter'

}}
>
<option aria-label="None" value="" />
<option  >Accepted</option>
<option  >Pending</option>
<option   >Rejected</option> 
</Select>
</FormControl>
</div>


   let type;

   let viewType;

   const handleaccept = (requestID) =>{     
    axios.post('http://localhost:3000/api/user/replacement/accept',
     {    
       id: requestID
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

    axios.post('http://localhost:3000/api/user/replacement/reject',{
      id:requestID
    }
    ,{ withCredentials: true })
    .then(function (response) { 
      message.success(response.data);
    })
    .catch(function (error) {
      message.error(error.response.data);

    });



   }



   const handlecancel = (requestID) =>{     
    axios.post('http://localhost:3000/api/user/request/cancelRequest', {
       id:requestID
    },{ withCredentials: true })
    .then(function (response) { 
      message.success(response.data);
      setTimeout(function(){
        window.location.reload(1);
     }, 5000);
     
    })
    .catch(function (error) {
      message.error(error.response.data);

    });



   }



   const handleTableView = (event)=>{
    event.preventDefault();
    viewType = event.target.value;
    if(viewType == "View Replacemnt Table")
    {
      setviewRTable(viewReplaceTable);
      setviewSub("");
       setFilter("");
       setviewAllSub( "");
  


    }
    if(viewType == "View Your Submitted Request")
    {
     
      setFilter(myfilter);
      setviewAllSub( <Table
        tableHeaderColor="primary"
        tableHead={["RequestId", "Course", "Day", "DateOfLeave","dayToBeReplaced","RequestType","Status","Comment"]}
        tableData={mySubReq}
        />
        );
      setviewRTable("");


    }
   }
   const handleModFac = (event) => {
     type = event.target.value;
    setbutton(butt);
    setType(type);
  
    if(type == "Send Replacement Request" )
    { 
        setLeave("");
        setDayReplaced("")
        setCourseID(courseID);
        setDay(day);    
        setSlot(slot);  
        setmyDate(myDate);   
        setReason(Reason);
        setReason2("");

    }
    if(type =="Send SlotLinking Request")
    { 
        setDayReplaced("")
        setLeave("");

            setCourseID(courseID);
            setDay(day);    
            setSlot(slot);  
            setmyDate("");   
            setReason("");
            setReason2(Reason2);

    }
     if(type == "Send ChangeDayOff Request")
    {
        setLeave("");

        setDayReplaced(dayReplaced);
        setCourseID("");
        setDay(day);    
        setSlot("");  
        setmyDate("");   
        setReason("");
        setReason2("");

    }
    if(type == "Send LeaveRequest Request")
    {
        setLeave(leavetypes);
        setDayReplaced("")
        setCourseID("");
        setDay("");    
        setSlot("");  
        setmyDate(myDate);   
        setReason(Reason);
        setReason2("");

    }

  };

  let ftype ;
  const handleFilter=(event) =>{
    // here fix filter
    console.log("shadyyy")
  ftype =event.target.value;
  console.log(ftype);

  }

  function handleModify(event) {
    event.preventDefault();
   let courseID;///
   let day; ///
   let slot;  /// awl 3 dolt l replacement wslot linking
   let reason;
   let dayOfLeave;
   let dayToBeReplaced ; 
   let LeaveType;


    if(typez=="Send Replacement Request")
    {
      courseID=event.target.courseID.value;
      day=event.target.dayOff.value;
      slot=event.target.slot.value;
      reason=event.target.reason.value;
      dayOfLeave=event.target.datleave.value;

      axios.post('http://localhost:3000/api/user/request/send/replacement', {
        courseId:courseID,
        day:day,
        slot:slot,
        dateOfLeave:dayOfLeave,
        reason:reason
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
   
        message.error(error.response.data);
      });
    }
     else if (typez == "Send SlotLinking Request")
     {
      courseID=event.target.courseID.value;
      day=event.target.dayOff.value;
      slot=event.target.slot.value;
      reason=event.target.reason2.value;


      axios.post('http://localhost:3000/api/user/request/send/slotLinking', {
        courseId:courseID,
        day:day,
        slot:slot,
        reason:reason
    
      },{ withCredentials: true })
      .then(function (response) {
        console.log(response.data);
        if(! (response.data))   {
          message.error("Error cant send slotLinking request")
        }
        else
        {
         // console.log(response.data);
          message.success(response.data); // to fix later

        }

      })
      .catch(function (error) {
   
        message.error(error.response.data);
      });


     }
     else if ( typez =="Send ChangeDayOff Request")
     {
      
      day=event.target.dayOff.value;
      dayToBeReplaced=event.target.dayToBeReplaced.value;

      axios.post('http://localhost:3000/api/user/request/send/changeDayOff', {
        dayWanted:day,
        dayToBeReplaced:dayToBeReplaced
    
      },{ withCredentials: true })
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
   
        message.error(error.response.data);
      });

     }else if(typez=="Send LeaveRequest Request")
     {
       if(event.target.leaveType.value == "Maternal Leave")
       {
        LeaveType="MLeave"

       }else if(event.target.leaveType.value == "Sick Leave")
       {
        LeaveType="SLeave"


       }else if(event.target.leaveType.value == "Accidental Leave")
       {
        LeaveType="ALeave"

       }
      reason=event.target.reason.value;
      dayOfLeave=event.target.datleave.value;
      

      axios.post('http://localhost:3000/api/user/request/send/leaveRequest', {
        leaveType:LeaveType,
        dateOfLeave:dayOfLeave,
        reason:reason
    
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
            <h4 className={classes.cardTitleWhite}>Send Requests</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can Send Replacment , slot linking , change day off and leave  requests
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container} onSubmit={handleModify} >
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.formControl}  >
        <InputLabel  htmlFor="age-native-required">Please Select Request Type</InputLabel>
        <Select
          native
          onChange={handleModFac}
          formControlProps={{
            fullWidth: true
          }}
        >
          <option aria-label="None" value="" />
          <option  >Send Replacement Request</option>
          <option  >Send SlotLinking Request</option>
          <option  >Send ChangeDayOff Request</option>
          <option  >Send LeaveRequest Request</option>
        
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
      


       </GridItem>
      
              </GridContainer>
              <GridContainer>
       <GridItem xs={12} sm={12} md={3} >
        {addLeave}
       {addDayReplaced}
        {addCourseID}
       </GridItem>
       <GridItem xs={12} sm={12} md={3} >
       {addDay}
       </GridItem>
       <GridItem xs={12} sm={12} md={3} >
        {addSlot}
       </GridItem>

       </GridContainer>
       <GridContainer>
       <GridItem  xs={12} sm={12} md={3}  > 
       {addReason2}
        {addmyDate}
       </GridItem>
       

       <GridItem  xs={12} sm={12} md={4}   >
         {addReason}
         </GridItem>

       </GridContainer>
       <GridItem  xs={12} sm={12} md={4}   >
       {addbutton}
      </GridItem>
            </form>
          </CardBody>
      
        </Card>
      
      </GridItem>

    

        <GridItem xs={12} sm={12} md={12}>
        <Card >

          <CardHeader  color="primary">
            <h4 className={classes.cardTitleWhite}>
              viewReplacement , DayOff Requests
            </h4>
            <p className={classes.cardCategoryWhite}>
             Please select which request table to view.
            </p>
          </CardHeader>
          <CardBody>
          <form className={classes.container}  >


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
          <option  >View Replacemnt Table</option>
          <option  >View Your Submitted Request</option>
      
        
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
               </GridItem>
            </GridContainer>
            </form>
            <GridContainer>
                {filter}
               {viewRTable}
               {viewSub}
               {viewAllSub}
           
               
               </GridContainer>
           
            
          </CardBody>
         
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
