import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import avatar from 'assets/img/faces/marc.jpg';
import NativeSelect from '@material-ui/core/NativeSelect';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, message, version } from 'antd';
import Table from 'components/Table/Table.js';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { withStyles } from '@material-ui/core/styles';

const verify = require('../Login/Auth');

const useStylesz = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3.5),
    minWidth: 120,
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
  },
  lastbox: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
  },
  Button: {
    margin: theme.spacing(0),
    minWidth: 120,
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
    marginTop: '40px',
    marginRight: '0px',
    marginLeft: ' 0px',
    marginBottom: '0px',
  },
  Button1: {
    margin: theme.spacing(0),
    minWidth: 120,
    color: 'rgba(255,255,255,.62)',
    fontSize: '14px',
  },
}));

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const antIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />;

  const spin = <Spin indicator={antIcon} />;
  const [Load, setLoad] = useState(spin);
  const shady = makeStyles((theme) => ({
    lolbox: {
      top: 30,
      left: '45%',
    },
  }));
  const classed = shady();
  const classes = useStyles();

  const classesz = useStylesz();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!verify()) {
      window.location.href = '/';
    }

    const getData = async () => {
      await axios
        .get('http://localhost:3000/api/user/hr/viewUsers', {}, { withCredentials: true })
        .then(function (response) {
          let usersz = [];
          let isNew;
          let salary;
          response.data.forEach((element) => {
            isNew = element.isNew.toString();
            if (!element.salary) {
              salary = 'none';
            } else {
              salary = element.salary;
            }
            usersz.push([
              element.email,
              element.name,
              element.id,
              element.userType,
              element.faculty,
              element.departement,
              salary,
              isNew,
            ]);
          });

          setUsers(usersz);
        })
        .catch(function (error) {});

      setLoad('');
    };
    getData();
  }, [users]);

  let email = '';
  let username = '';
  let faculty = '';
  let depart = '';
  let office = '';
  let personalDetails = '';
  let salary = '';
  let daysOff;
  let userType;
  let gender;
  let staffemailz;
  let extrahours;
  let anual;

  function handleDeleteStaff(event) {
    event.preventDefault();

    staffemailz = event.target.staffEmail.value;

    axios
      .post(
        'http://localhost:3000/api/user/deleteStaff',
        {
          email: staffemailz,
        },
        { withCredentials: true },
      )
      .then(function (response) {
        message.success(response.data);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });
  }
  function handleRegisteration(event) {
    event.preventDefault();
    email = event.target.email.value;
    faculty = event.target.faculty.value;
    depart = event.target.depart.value;
    office = event.target.officeLocation.value;
    salary = event.target.salary.value;
    extrahours = event.target.Extrahours.value;
    anual = event.target.annual.value;
    var body = {
      email: email,
    };
    if (office) {
      body.officeLocation = office;
    }
    if (faculty) {
      body.faculty = faculty;
    }
    if (salary) {
      body.salary = salary;
    }
    if (anual) {
      body.annualLeaves = anual;
    }
    if (extrahours) {
      body.extraHours = extrahours;
    }
    if (depart) {
      body.departement = depart;
    }
    if (userType) {
      body.userType = userType;
    }
    if (daysOff) {
      body.daysOff = [daysOff];
    }
    body.personalDetails = 'lolll';
    console.log(body);
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/user/updateStaff',
      data: body,
      withCredentials: true,
    })
      .then(function (response) {
        message.success(response.data);

        //console.log(response);
      })
      .catch(function (error) {
        message.error(error.response.data);
      });

    /*
    axios.post('http://localhost:3000/api/user/updateStaff', {
        email: email,
    
        salary:salary,
        daysOff:[daysOff],
        faculty:faculty,
        departement:depart,
        userType:userType,
        officeLocation:office,
        extraHours:extrahours,
        annualLeaves:anual

      },{ withCredentials: true })
      .then(function (response) {
    
        message.success(response.data);

      
      })
      .catch(function (error) {
   
        message.error(error.response.data);

      });
*/
  }
  const handleuserType = (event) => {
    const name1 = event.target;
    userType = name1.value;
  };
  const handleDay = (event) => {
    const name2 = event.target;
    daysOff = name2.value;
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update a GUC staff Member</h4>
              <p className={classes.cardCategoryWhite}>
                Enter the email of the member that you want to update
              </p>
            </CardHeader>
            <CardBody>
              <form className={classes.container} onSubmit={handleRegisteration}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="officeLocation"
                      id="officeLocation"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Faculty"
                      id="faculty"
                      formControlProps={{
                        fullWidth: true,
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
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Extra Hours"
                      id="Extrahours"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} spacing={5}>
                    <FormControl className={classesz.formControl}>
                      <InputLabel htmlFor="age-native-required">userType</InputLabel>
                      <Select
                        native
                        onChange={handleuserType}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          id: 'daysOff',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option>HR</option>
                        <option>TA</option>
                        <option>DR</option>
                        <option>HOD</option>
                        <option>CC</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      id="annual"
                      labelText="Annual leaves"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      id="salary"
                      labelText="Salary"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <br />
                  <GridItem xs={12} sm={12} md={4} spacing={5}>
                    <FormControl className={classesz.formControl}>
                      <InputLabel htmlFor="age-native-required">DayOff</InputLabel>
                      <Select
                        native
                        onChange={handleDay}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          id: 'daysOff',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option>Saturday</option>
                        <option>Sunday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer></GridContainer>

                <br />

                <CardFooter>
                  <Button className={classesz.Button1} color="primary" type="submit">
                    Update Staff
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}></GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>GUC STAFF MEMBERS</h4>
              <p className={classes.cardCategoryWhite}>Here you can view all GUCSTAFF members</p>
            </CardHeader>
            <CardBody>
              <form className={classes.container} onSubmit={handleDeleteStaff}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Enter Staff Email You Want To Delete"
                      id="staffEmail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <Button className={classesz.Button} color="primary" type="submit">
                      Delete staff
                    </Button>
                    ;
                  </GridItem>
                </GridContainer>
                <GridContainer></GridContainer>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    'Email',
                    'userName',
                    'ID',
                    'userType',
                    'Faculty',
                    'Departement',
                    'Salary',
                    'userNew',
                  ]}
                  tableData={users}
                />
              </form>

              <FormControl className={classed.lolbox}>{Load}</FormControl>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
