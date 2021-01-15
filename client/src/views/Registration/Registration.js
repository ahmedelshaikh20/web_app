import React,{useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import avatar from "assets/img/faces/marc.jpg";
import NativeSelect from '@material-ui/core/NativeSelect';
import "antd/dist/antd.css";
import { Form,Input, Checkbox, message,version } from "antd";
const verify = require("../Login/Auth");

const useStylesz= makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3.5),
    minWidth: 120,
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
  }
}));

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  useEffect(() => {
    if (!verify()) {
        window.location.href = "/";
    }
}, [])
  const classes = useStyles();

  const classesz = useStylesz();

  let email= "";
  let username = "";
  let faculty = "";
  let depart ="";
  let office ="";
  let personalDetails= "";
  let salary= "";
  let daysOff ;
  let userType;
  let gender;

  function handleRegisteration(event) {
    event.preventDefault();
    email=event.target.email.value;
    username=event.target.username.value;
    faculty=event.target.faculty.value;
    depart=event.target.depart.value;
    office=event.target.office.value;
    personalDetails=event.target.personal.value;
    salary=event.target.salary.value;

    if(gender =="Male")
    {
      gender="m";

    }else if (gender == "Female")
    {
      gender="f";
    }

    var body = {
      email: email,
      name:username,
      gender:gender
    }
    if(office){
      body.officeLocation=office;
    }
    if(faculty)
    {
     body.faculty=faculty;
    }
    if(salary)
    {
    body.salary=salary;
    }
    if(personalDetails){
      body.personalDetails=personalDetails;
    }
    if(depart)
    {
      body.departement=depart;
    }
    if(userType)
    {
      body.userType=userType;
    }
    if(daysOff)
    {
      body.daysOff=[daysOff];
    }
  
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/user/register',
      data: body,
      withCredentials: true
    })
    .then(function (response) {
      message.success("User has been Registered.");
    })
    .catch(function (error) {
      message.error(error.response.data);
    
    });
    

  


  };

  const handleGender = (event) => {
    const name = event.target;
    gender= name.value;
  };
  const handleuserType = (event) => {
    const name1 = event.target;
   userType=name1.value;
  };
  const handleDay = (event) => {
    const name2 = event.target;
    daysOff=name2.value;
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Register a GUC staff</h4>
              <p className={classes.cardCategoryWhite}>Complete Registration</p>
            </CardHeader>
            <CardBody>
            <form className={classes.container} onSubmit={handleRegisteration} >
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    
                  />
                </GridItem>
             
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                     
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Faculty"
                    id="faculty"
                  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  id="depart"
                    labelText="Department"
                  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Office Number"
                 
                    id="office"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} spacing={5}> 
              <FormControl required className={classesz.formControl} >
        <InputLabel htmlFor="age-native-required">userType</InputLabel>
        <Select
          native
          onChange={handleuserType}
          formControlProps={{
            fullWidth: true
          }}

          inputProps={{
            id: 'uType',
 
          }}
        >
          <option aria-label="None" value="" />
          <option  >HR</option>
          <option  >TA</option>
          <option   >DR</option>
          <option   >HOD</option>
          <option  >CC</option>
    

        
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
       </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  id="personal"
                    labelText="PersonalDetails"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  id="salary"
                    labelText="Salary"
                  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <br/>
                <GridItem xs={12} sm={12} md={4} spacing={5}> 
              <FormControl  className={classesz.formControl} >
        <InputLabel >DaysOff</InputLabel>
        <Select
          native
          onChange={handleDay}
          formControlProps={{
            fullWidth: true
          }}

          inputProps={{
            id: 'daysOff'
          
          }}
        >
          <option aria-label="None" value="" />
          <option  >Saturday</option>
          <option  >Sunday</option>
          <option   >Monday</option>
          <option   >Tuesday</option>
          <option  >Wednesday</option>
          <option  >Thursday</option>
          <option  >Friday</option>

        
        </Select>
      
      </FormControl>
       </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl required className={classesz.lastbox}  >
        <InputLabel  htmlFor="age-native-required">Gender</InputLabel>
        <Select
          native
          onChange={handleGender}
          formControlProps={{
            fullWidth: true
          }}

          inputProps={{
            id: 'age-native-required',
            name: 'gender',
          }}
        >
          <option aria-label="None" value="" />
          <option  >Female</option>
          <option  >Male</option>
        
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
       </GridItem>
              </GridContainer>

              <br/>
       
              <CardFooter>
              <Button color="primary"  type="submit">Register</Button>
            </CardFooter>
            
            
          
              </form>
           
            </CardBody>
           
          </Card>
        
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
         
        </GridItem>
      </GridContainer>
    </div>
  );
}
