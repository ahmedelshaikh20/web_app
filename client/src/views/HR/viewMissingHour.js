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

  const Id = (
    <CustomInput
      labelText="Enter  ID "
      id="id"
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
  const [stat, setstats] = useState([]);

  const [addMonth, setAddMonth] = useState('');
  const [addId, setAddId] = useState('');
  const [addbutton, setbutton] = useState('');
  const [typez, setType] = useState('');

  let month;

  let type;
  const handleModFac = (event) => {
    type = event.target.value;
    setbutton(butt);
    setType(type);
    console.log(type);

    if (type == 'Using Id') {
      setAddId(Id);
    } else {
      setAddId('');
    }
  };
  let stats = [];
  function handleModify(event) {
    event.preventDefault();
    let id = '';
    let month = '';
    console.log(typez);
    if (typez == 'MissingHours') {
      axios
        .get(
          `http://localhost:3000/api/v1/staff/missingDays`,

          { withCredentials: true },
        )
        .then(function (response) {
          let att = response.data;
          // console.log(att);

          let ded = att.deduction + 0;
          let totalHours = att.totalHours + 0;
          let missingHours = att.missingHours + 0;
          let numberOfDays = att.numberOfDays + 0;
          let missingDays = att.missingDays + 0;
          let extraHours = att.extraHours + 0;
          console.log(ded);
          stats.push([totalHours, missingHours, numberOfDays, missingDays, extraHours, ded]);
          setstats(stats);
        })
        .catch(function (error) {
          //message.error(error.response.data);
        });
    } else if (typez == 'Using Id') {
      let id = event.target.id.value;
      console.log(id);
      axios
        .post(
          `http://localhost:3000/api/v1/HR2/viewMissingHours`,
          { id: id },
          { withCredentials: true },
        )
        .then(function (response) {
          let att = response.data;
          console.log(att);

          let totalHours = att.totalHours + 0;
          let missingHours = att.missingHours + 0;
          let numberOfDays = att.numberOfDays + 0;
          let missingDays = att.missingDays + 0;
          let ded = 0 + '';
          let extraHours = 0 + '';
          console.log(ded);
          stats.push([totalHours, missingHours, numberOfDays, missingDays, extraHours, ded]);
          setstats(stats);
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
            <h4 className={classes.cardTitleWhite}>view MissingHours</h4>
            <p className={classes.cardCategoryWhite}>
              You can view Missing Hours , totalHours , MissingDays
            </p>
          </CardHeader>
          <CardBody>
            <form className={classes.container} onSubmit={handleModify}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl required className={classesz.formControl}>
                    <InputLabel htmlFor="age-native-required">View MissingHours</InputLabel>
                    <Select
                      native
                      onChange={handleModFac}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option>MissingHours</option>
                      <option>Using Id</option>
                    </Select>

                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
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
                  tableHead={[
                    'Total Hours ',
                    'Missing hours',
                    'Number of days',
                    'missingDays',
                    'ExtraHours',
                    'Deduction',
                  ]}
                  tableData={stat}
                />
              </GridItem>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
