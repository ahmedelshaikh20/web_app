import React , { useState,useEffect }from  'react';
import "antd/dist/antd.css";
import axios from "axios";
import { Form,Input, Button, Checkbox, message,version } from "antd";
import Icon from '@ant-design/icons';
import "./Login.css";
import loginImg from './guc.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'


const FormItem = Form.Item;

const verify = require("../Login/Auth");

const errorsDisplay = {
  textAlign: "center",
  margin: "1em",
  color: "#FF4040"
}

const  Reset2= ({match}) => {
  useEffect(() => {
  
}, [])


  const onSubmit = (values) => {
  

    let newPassword = values.newPassword;
   let token =match.params.token;
   
    let api = 'http://localhost:3000/api/user/resetpasswordnow/'+token;

    
    axios.post(api, {
        newPassword:newPassword
   
    },{ withCredentials: true })
    .then(function (response) {
          
        message.success(response.data);

        setTimeout(function () {
            window.location.href= '/'; 
         },5000); // 8 seconds
     
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
      <h4>Reset Password</h4>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      

      <Form.Item
        name="newPassword"
        rules={[{ required: true, message: 'Please input your newPassword!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="New Password"
        />
      </Form.Item>
     
      
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         Reset 
        </Button>
     
      </Form.Item>

        
        
      </Form>
    </div>
</div>


<div className="footer">
  <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Powered by GUC</a>
</div>
</div>



    
  </div>
  );
}


export default withRouter(Reset2);
