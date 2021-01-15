import React, { useEffect } from 'react';
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

export default function Dashboard() {
  useEffect(() => {
    if (!verify()) {
      window.location.href = '/';
    }
  }, []);
  const classes = useStyles();

  const classesz = useStylesz();

  function handleSignIn(event) {
    event.preventDefault();
    console.log('sadasdasdsadsadsadasdasdsadasdas hel;llo');

    axios
      .post('http://localhost:3000/api/v1/staff/signin', {}, { withCredentials: true })
      .then(function (response) {
        message.success(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        // message.error(error.response);
      });
    // axios
    //   .post(
    //     'http://localhost:3000/api/v1/HR2/AddSignin',
    //     {
    //       month: '12',
    //       day: '5',
    //       hour: '23:00',
    //       id: 'id',
    //     },
    //     { withCredentials: true },
    //   )
    //   .then(function (response) {
    //     message.success(response.data);
    //   })
    //   .catch(function (error) {
    //     message.error(error.response.data);
    //   });
  }

  function handleSignOut(event) {
    event.preventDefault();

    axios
      .post(
        'http://localhost:3000/api/v1/staff/signout',
        {},

        { withCredentials: true },
      )
      .then(function (response) {
        //console.log(response.data);
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
              <h4 className={classes.cardTitleWhite}>Dashboard</h4>
            </CardHeader>
            <CardBody>
              <form className={classes.container} onSubmit={handleSignIn}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}></GridItem>

                  <GridItem xs={12} sm={12} md={4}></GridItem>
                </GridContainer>

                <GridContainer></GridContainer>

                <br />

                <CardFooter>
                  <Button color="primary" onClick={handleSignIn}>
                    signin
                  </Button>
                  <Button color="primary" onClick={handleSignOut}>
                    signOut
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}></GridItem>
      </GridContainer>
    </div>
  );
}
