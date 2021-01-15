import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from 'components/CustomButtons/Button.js';
import TextField from '@material-ui/core/TextField';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';
import 'antd/dist/antd.css';
import { message } from 'antd';
const verify = require('../Login/Auth');

const useStylesz = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 270,
    color: 'rgba(255,255,255,.62)',
    fontSize: '200px',
    marginTop: ' 0 px',
    marginBottom: '0px',
  },
  Button: {
    margin: theme.spacing(0),
    minWidth: 100,
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
    marginTop: '50px',
    marginRight: '0px',
    marginBottom: '0px',
  },
  Textbox: {
    margin: theme.spacing(2),
    minWidth: 200,
    color: 'rgba(255,255,255,.62)',
    fontSize: '180px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    fullWidth: true,
  },
  Textbox2: {
    margin: theme.spacing(0),
    minWidth: 200,
    color: 'rgba(255,255,255,.62)',
    fontSize: '180px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
  },
}));
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  useEffect(() => {
    if (!verify()) {
      window.location.href = '/';
    }
  }, []);

  const classes = useStyles();
  const classesz = useStylesz();

  const Month = (
    <CustomInput
      labelText="Enter Month"
      id="Month"
      formControlProps={{
        fullWidth: true,
      }}
    />
  );

  const Id = (
    <CustomInput
      labelText="Enter  ID "
      id="id"
      formControlProps={{
        fullWidth: true,
      }}
    />
  );

  const departement = (
    <CustomInput
      labelText="Enter Course Departement"
      id="courseDepart"
      formControlProps={{
        fullWidth: true,
      }}
    />
  );

  const butt = (
    <Button className={classesz.Button} color="primary" type="submit">
      Apply changes
    </Button>
  );
  const [Attendance, setAttendance] = useState([]);

  const [addMonth, setAddMonth] = useState('');
  const [addId, setAddId] = useState('');
  const [addCourseID, setAddCourseID] = useState('');

  const [addbutton, setbutton] = useState('');

  const [typez, setType] = useState('');

  let month;
  let _depart;
  let _courseID;
  let type;
  const handleModFac = (event) => {
    type = event.target.value;
    setbutton(butt);
    setType(type);
    console.log(type);
    if (type == 'Attendance Month') {
      //setAddCourse(courseName);
      setAddMonth(Month);
      setAddId('');
    }
    if (type == 'Attendance Id') {
      setAddMonth('');
      setAddId(Id);
    }
    if (type == 'My Attendance') {
      setAddId('');
      setAddMonth('');
    }
  };
  let attendaces = [];
  function handleModify(event) {
    event.preventDefault();
    let coname = '';
    let id = '';
    let depaname = '';
    let month = '';
    console.log(typez);
    if (typez == 'Attendance Month') {
      month = event.target.Month.value;
      if (month) {
        axios
          .post(
            `http://localhost:3000/api/v1/staff/attendanceMonth`,
            { month: month },
            { withCredentials: true },
          )
          .then(function (response) {
            console.log(response.data);
            let att = response.data.data.attendance;
            console.log(att);
            att.forEach((element) => {
              let signOut = '';
              //console.log('fku here');

              let signIn =
                element.signIn.day + '/' + element.signIn.month + '-' + element.signIn.hour;
              if (element.signOut) {
                signOut =
                  element.signOut.day + '/' + element.signOut.month + '-' + element.signOut.hour;
              }

              attendaces.push([signIn, signOut, element.date]);
            });
            console.log(attendaces);
            setAttendance(attendaces);
            console.log(Attendance);
            if (attendaces.length == 0) {
              message.success('Success but there is no records in the database');
            }
          })
          .catch(function (error) {
            message.error(error.response.data);
          });
      } else message.error('Month needed');
    } else if (typez == 'Attendance Id') {
      id = event.target.id.value;
      console.log(id);
      if (id) {
        axios
          .post(
            `http://localhost:3000/api/v1/HR2/viewStaffAttendance`,
            { id: id },
            { withCredentials: true },
          )
          .then(function (response) {
            console.log(response.data);
            let att = response.data.data.Attendance;
            console.log(att);
            att.forEach((element) => {
              let signOut;
              console.log('iam here');
              let signIn =
                element.signIn.day + '/' + element.signIn.month + '-' + element.signIn.hour;
              if (element.signOut) {
                signOut =
                  element.signOut.day + '/' + element.signOut.month + '-' + element.signOut.hour;
              }

              attendaces.push([signIn, signOut, element.date]);
            });
            console.log(attendaces);
            // console.log(attendaces);
            setAttendance(attendaces);
            if (attendaces.length == 0) {
              message.success('Success but there is no records in the database');
            }
          })
          .catch(function (error) {
            message.error(error.response.data);
          });
      } else message.error('ID needed');
    } else {
      axios
        .get(`http://localhost:3000/api/v1/staff/attendance`, { withCredentials: true })
        .then(function (response) {
          console.log(response.data);

          let att = response.data.data.attendance;
          console.log(att);
          att.forEach((element) => {
            let signOut = '';

            console.log('iam here');
            console.log(element.signIn.month);
            let signIn =
              element.signIn.day + '/' + element.signIn.month + '-' + element.signIn.hour;
            if (element.signOut) {
              signOut =
                element.signOut.day + '/' + element.signOut.month + '-' + element.signOut.hour;
            }
            attendaces.push([signIn, signOut, element.date]);
          });
          setAttendance(attendaces);
        })
        .catch(function (error) {
          message.error(error.response.data);
        });
    }
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>view Attendance</h4>
            <p className={classes.cardCategoryWhite}>
              You can view Your all Attendance or with specific month
            </p>
          </CardHeader>
          <CardBody>
            <form className={classes.container} onSubmit={handleModify}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl required className={classesz.formControl}>
                    <InputLabel htmlFor="age-native-required">View Attendance</InputLabel>
                    <Select
                      native
                      onChange={handleModFac}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option>My Attendance</option>
                      <option>Attendance Month</option>
                      <option>Attendance Id</option>
                    </Select>

                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  {addMonth}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  {addId}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  {addbutton}
                </GridItem>
              </GridContainer>

              <GridItem>
                <Table
                  tableHeaderColor="primary"
                  tableHead={['signin ', 'signout', 'date']}
                  tableData={Attendance}
                />
              </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
