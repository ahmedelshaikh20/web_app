import React , { useState,useEffect }from  'react';
import "antd/dist/antd.css";
import axios from "axios";
import { Form,Input, Button, Checkbox, message,version } from "antd";
import Icon from '@ant-design/icons';
import "./Login.css";
import loginImg from './guc.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  Redirect } from "react-router-dom";
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

const FormItem = Form.Item;

const verify = require("../Login/Auth");

const errorsDisplay = {
  textAlign: "center",
  margin: "1em",
  color: "#FF4040"
}

const  Reset1= () => {
  useEffect(() => {

}, [])

  const [errors, setErrors] = useState("");

  let generated_link ;
  let hh;

  const onSubmit = (values) => {
    let email = values.email;    
    axios.post('http://localhost:3000/api/user/resetPassword', {
      email: email,
    },{ withCredentials: true })
    .then(function (response) {
    hh="/resetpasswordnow/"+response.data;
    generated_link=<a href={hh}>Please Click on this Link to Reset Password.</a>

    setErrors(generated_link);

    })
    .catch(function (error) {
     message.error(error.response.data);
    });

  };

  return (
  
  <div>

<div className={"lContainer"}>

<div className="lItem">
    <div className="loginImage">
      <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
    </div>

    <div className="loginForm">
      <h2>Reset Password</h2>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
     
      <Form.Item
      
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Please Enter Your Email" />
      </Form.Item>


      
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Send Reset Link
        </Button>
     
      </Form.Item>

        
        
      </Form>
  
      <GridContainer>
      <GridItem>
       {errors}
      </GridItem>
      </GridContainer>
     
    </div>
</div>


<div className="footer">
  <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Powered by GUC</a>
</div>
</div>



    
  </div>
  );
}


export default Reset1;
