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

  let salary = '';
  let fid = '';

  function handleUpdateSalary(event) {
    event.preventDefault();
    salary = event.target.salary.value + '';
    fid = event.target.id.value;
    if (fid && salary) {
      axios
        .post(
          'http://localhost:3000/api/v1/HR2/UpdateSalary',
          {
            salary: salary,
            id: fid,
          },
          { withCredentials: true },
        )
        .then(function (response) {
          console.log(response.data);
          message.success(response.data.status);
        })
        .catch(function (error) {
          message.error(error.response.data);
        });
    } else message.error('One or more Fields are missed ');
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update salary to staff</h4>
            </CardHeader>
            <CardBody>
              <form className={classes.container} onSubmit={handleUpdateSalary}>
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

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="salary"
                      id="salary"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer></GridContainer>

                <br />

                <CardFooter>
                  <Button color="primary" type="submit">
                    Update
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
