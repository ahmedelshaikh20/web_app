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

export default function UserProfile() {
  useEffect(() => {
    if (!verify()) {
      window.location.href = '/';
    }
  }, []);
  const classes = useStyles();

  const classesz = useStylesz();

  let month = '';
  let day = '';
  let hour = '';
  let id = '';

  function handleSignin(event) {
    event.preventDefault();
    month = event.target.month.value;
    day = event.target.day.value;
    hour = event.target.hour.value;
    id = event.target.id.value;
    if (month && day && hour && id) {
      axios
        .post(
          'http://localhost:3000/api/v1/HR2/AddSignin',
          {
            month: month,
            day: day,
            hour: hour,
            id: id,
          },
          { withCredentials: true },
        )
        .then(function (response) {
          message.success(response.data);
        })
        .catch(function (error) {
          message.error(error.response.data);
        });
    } else message.error('One or More Field are Empty');
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add signOut to GUC staff</h4>
            </CardHeader>
            <CardBody>
              <form className={classes.container} onSubmit={handleSignin}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="month"
                      id="month"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="day"
                      id="day"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="hour"
                      id="hour"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="id"
                      id="id"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <br />

                <CardFooter>
                  <Button color="primary" type="submit">
                    Add SignIn
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
