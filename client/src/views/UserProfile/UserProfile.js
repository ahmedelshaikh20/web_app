import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

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
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import avatar from "assets/img/faces/marc.jpg";
import "antd/dist/antd.css";
import axios from "axios";
import { Form,Input, Checkbox, message,version } from "antd";
const verify = require("../Login/Auth");

const styles1 = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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
const useStyles1 = makeStyles(styles1);

export default  function  UserProfile() {
  const [profile, setProfile] = useState({});

  const [profstate, setprofState] = useState('');

  const [course, setCourse] = useState('');

let email ="";
let aboutme ="";
let username ="";
let emazzil ="";
let xs ="";
let y ="";
let z ="";
let tocourse ;

  useEffect(() => {

    if (!verify()) {
        window.location.href = "/";
    }

      axios.get('http://localhost:3000/api/user/viewProfilefast', {

    },{ withCredentials: true })
    .then(function (response) {

      let x = response.data.daysOff;
      x=x.toString();
 
      setprofState(x);
    setProfile(response.data);

    })
    .catch(function (error) {
 

    });


    axios.get('http://localhost:3000/api/user/myCourses', {

    },{ withCredentials: true })
    .then(function (response) {
      if((response.data.length) >0)
      {
       let b = response.data;
       let z = b.toString();

       setCourse(<div>
        <div className={classes.typo}>
        <div className={classes.note}><strong>
        myCourses
          </strong></div>
         <h5>{ z}</h5>
        </div>
        <br/>
        </div> )
      }
        

    })
    .catch(function (error) {
 

    });



  

}, [profile])




  const classes = useStyles();
  const classes1 = useStyles1();



  function handleUpdateProfile(event) {
    event.preventDefault();

    let password = event.target.password.value;
    let newPassword =  event.target.newPassword.value;
    let personalDetails= event.target.aboutme.value; 

    var body = {

    }
    if(password)
    {
    body.password=password;
    }
    if(newPassword)
    {
    body.newPassword=newPassword;
    }
    if(personalDetails)
    {
    body.personalDetails=personalDetails;
    }
  
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/user/updateProfile',
      data: body,
      withCredentials: true
    })
    .then(function (response) {
      message.success(response.data);
    })
    .catch(function (error) {
      message.error(error.response.data);
    
    });
    


  

}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>

            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            
            </CardHeader>
            <CardBody>
              <GridContainer>
          
       
              </GridContainer>
             
              <form className={classes.container} onSubmit={handleUpdateProfile} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <TextField
              
                name="password"
                type="password"
                label="Password"
                style={{ margin: 8 }}
                placeholder="Enter your current password."
           
               fullWidth
               margin="normal"
              InputLabelProps={{
            shrink: true,
          }}
              />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <TextField
                id="newPassword"
                label="NewPassword"
                style={{ margin: 8 }}
                placeholder="Enter your new password"
               type="password"
               fullWidth
               margin="normal"
              InputLabelProps={{
            shrink: true,
          }}
        />
                </GridItem>
             
             
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                 <br/>
                 <br/><br/>
                </GridItem>
           
              
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Let's make GUC GREAT AGAIN."
                    id="aboutme"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
           
              <CardFooter>
              <Button color="primary" type="submit" >Update Profile</Button>
            </CardFooter>
            <GridItem xs={12} sm={12} md={12}>
        
              </GridItem>
            </form>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardCategory}>{sessionStorage.getItem('role')}</h4>

               <br/>
              <div className={classes.typo}>
            <div className={classes.note}><strong>
            Email
              </strong></div>
             <h5>{profile.email}</h5>
           </div>
           <br/>

       
              <div className={classes.typo}>
            <div className={classes.note}> <strong>
            Username
              </strong></div>
             <h5>{ profile.name}</h5>
           </div>
           <br/>

              <div className={classes.typo}>
            <div className={classes.note}><strong>
            ID
              </strong></div>
             <h5>{ profile.id}</h5>
           </div>
           <br/>

         
              <div className={classes.typo}>
            <div className={classes.note}><strong>
            Faculty
              </strong></div>
             <h5>{ profile.faculty}</h5>
           </div>
         

           <br/>
              <div className={classes.typo}>
            <div className={classes.note}><strong>
            Departement
              </strong></div>
             <h5>{ profile.departement}</h5>
           </div>
           <br/>

           <br/>
              <div className={classes.typo}>
            <div className={classes.note}><strong>
            DaysOFF
              </strong></div>
             <h5>{ profstate}</h5>
           </div>
           <br/>

          {course}

           <div className={classes.typo}>
          <div className={classes.note}><strong>
            About me 
              </strong></div>
          <Quote
            text={profile.personalDetails}
          />
        </div>
            
            
          
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
