import React,{useState,useEffect} from "react";
// @material-ui/core components
// core components
import FormControl from '@material-ui/core/FormControl';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import axios from "axios";
import "antd/dist/antd.css";
import {  message } from "antd";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const verify = require("../Login/Auth");




const antIcon = 
<LoadingOutlined style={{ fontSize: 70 }} spin />;

const spin =<Spin indicator={antIcon} />

export default function TableList() {
const [Load,setLoad] = useState(spin);
  const shady= makeStyles((theme) => ({
    lolbox:{
      top : 50,
      left: "45%"
    }
  }));
  const classed = shady();

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 15,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
      function createData(Day,first,  second, third, fourth,fifth) {
        return { Day, first, second, third, fourth ,fifth};
      }

      const [rows,setRows] = useState([]);
      
      let Saturday = [];
      let Sunday = [];
      let Monday=[];
      let Tuesday=[];
      let Wednesday=[];
      let Thursday=[];

      let free= "FREE";
      let f1="FREE"
      let f2= "FREE"
      let f3="FREE"
      let f4="FREE"
      let f5="FREE"
 
      let s1;
      let s2;
       let s3;
       let s4;
       let s5;
        let s6;




    useEffect(() => {
      const getData = async () => {  
      await  axios.get('http://localhost:3000/api/user/viewProfile/', {
        },{ withCredentials: true })
        .then(function (response) {
            response.data.schedule.forEach(element =>{
                 if(element.day == "Saturday") {
                     Saturday.push(element);
                 }else if(element.day =="Sunday")
                 {
                    Sunday.push(element);
                 }else if(element.day =="Monday")
                 {
                    Monday.push(element);
                 }else if(element.day =="Tuesday")
                 {  Tuesday.push(element);
                     
                 }else if(element.day =="Wednesday")
                 {
                    Wednesday.push(element);
                 }else if(element.day =="Thursday")
                 {  Thursday.push(element);
                     
                 }
               })
               Saturday.forEach(e=>{
                   if(e.slot =="First"){
                       f1=e.course + "@ " + e.location +" ["+ e.type+"]";

                   }else if(e.slot =="Second"){
                    f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                   }else if(e.slot =="Third"){
                    f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                   }else if(e.slot == "Fourth"){
                    f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                   }else if(e.slot =="Fifth")
                   {
                    f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                   }

               });
               s1=createData('Saturday',f1,f2,f3,f4,f5);
               f1=free;f2=free;f3=free;f4=free;f5=free;
               Sunday.forEach(e=>{
                if(e.slot =="First"){
                    f1=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Second"){
                 f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot =="Third"){
                 f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot == "Fourth"){
                 f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Fifth")
                {
                 f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                }

            });
            s2=createData('Sunday',f1,f2,f3,f4,f5);

            f1=free;f2=free;f3=free;f4=free;f5=free;
            Monday.forEach(e=>{
                if(e.slot =="First"){
                    f1=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Second"){
                 f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot =="Third"){
                 f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot == "Fourth"){
                 f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Fifth")
                {
                 f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                }

            });
            s3=createData('Monday',f1,f2,f3,f4,f5);

            f1=free;f2=free;f3=free;f4=free;f5=free;
            Tuesday.forEach(e=>{
                if(e.slot =="First"){
                    f1=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Second"){
                 f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot =="Third"){
                 f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot == "Fourth"){
                 f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Fifth")
                {
                 f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                }

            });
            s4=createData('Tuesday',f1,f2,f3,f4,f5);

            f1=free;f2=free;f3=free;f4=free;f5=free;
            Wednesday.forEach(e=>{
                if(e.slot =="First"){
                    f1=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Second"){
                 f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot =="Third"){
                 f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot == "Fourth"){
                 f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Fifth")
                {
                 f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                }

            });
            s5=createData('Wednesday',f1,f2,f3,f4,f5);

            f1=free;f2=free;f3=free;f4=free;f5=free;
            Thursday.forEach(e=>{
                if(e.slot =="First"){
                    f1=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Second"){
                 f2=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot =="Third"){
                 f3=e.course + "@ " + e.location+" ["+ e.type+"]";


                }else if(e.slot == "Fourth"){
                 f4=e.course + "@ " + e.location+" ["+ e.type+"]";

                }else if(e.slot =="Fifth")
                {
                 f5=e.course + "@ " + e.location+" ["+ e.type+"]";
                }

            });
            s6=createData('Thursday',f1,f2,f3,f4,f5);

            f1=free;f2=free;f3=free;f4=free;f5=free;

           let final= [];
           final.push(s1);
           final.push(s2);
           final.push(s3);
           final.push(s4);
           final.push(s5);
           final.push(s6);

            setRows(final);



            

        })
        .catch(function (error) {
         console.log(error);
    
        });


       setLoad("");
      }  
      getData();

   


    }, [])

  
  const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
  });
  
  const classes = useStyles();
  
  return (
  
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} >
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>ViewSchedule</h4>
            <p className={classes.cardCategoryWhite}>
              Here you can ViewSchedule
            </p>
          </CardHeader>
          <CardBody>
    
          
            <GridItem>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Day</StyledTableCell>
            <StyledTableCell align="left">First Slot  (8:15 AM)</StyledTableCell>
            <StyledTableCell align="left">Second Slot (10:00 AM)</StyledTableCell>
            <StyledTableCell align="left">Third Slot (11:45 AM)</StyledTableCell>
            <StyledTableCell align="left">Fourth Slot (1:15 PM)</StyledTableCell>
            <StyledTableCell align="left">Fifth Slot  (3:45 PM)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Day}>
              <StyledTableCell component="th" scope="row">
                {row.Day}
              </StyledTableCell>
              <StyledTableCell align="left"> {row.first}</StyledTableCell>
              <StyledTableCell align="left">{row.second}</StyledTableCell>
              <StyledTableCell align="left">{row.third}</StyledTableCell>
              <StyledTableCell align="left">{row.fourth}</StyledTableCell>
              <StyledTableCell align="left">{row.fifth}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </GridItem>

            <GridItem>
            <FormControl  className={classed.lolbox} >
              {Load}
              </FormControl>
    
       
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
