import React , { useState,useEffect }from  'react';
import "antd/dist/antd.css";
import axios from "axios";
import { Form,Input, Button, Checkbox, message,version } from "antd";
import Icon from '@ant-design/icons';
import "./Login.css";
import loginImg from './guc.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  Redirect } from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const FormItem = Form.Item;

const verify = require("../Login/Auth");

const errorsDisplay = {
  textAlign: "center",
  margin: "1em",
  color: "#FF4040"
}

const  Login= () => {


const antIcon = 
<LoadingOutlined style={{ fontSize: 70 }} spin />;

const spin =<Spin indicator={antIcon} />
const [Load,setLoad] = useState("");
const shady= makeStyles((theme) => ({
  lolbox:{
    top : 50,
    left: "35%"
  }
}));
const classed = shady();

  useEffect(() => {
   // sessionStorage.setItem("favoriteMovie", "Shrek");

   sessionStorage.clear()



    if (verify()) {
        window.location.href = "/admin/dashboard";
    }
}, [])

  const [errors, setErrors] = useState('');

  const onSubmit = (values) => {
    sessionStorage.clear();
    
    let email = values.email;
    let password = values.password;
    
   
    const getData = async () => { 
      setLoad(spin);
     await axios.post('http://localhost:3000/api/user/login', {
        email: email,
        password: password
      },{ withCredentials: true })
      .then(function (response) {
        if(response.data != "Successfully logged in.") 
        {  setErrors("Invalid Email or Password");
        setLoad("");
      }
    
      })
      .catch(function (error) {
        setLoad("");
       setErrors("Invalid Email or Password");
      });

     await axios.get('http://localhost:3000/api/user/viewProfile', {

      },{ withCredentials: true })
      .then(function (response) {
        let profile = response.data;
        sessionStorage.setItem("email", profile.email);
        sessionStorage.setItem("ID", profile.id);
        sessionStorage.setItem("username", profile.name);
        sessionStorage.setItem("daysOff", profile.daysOff);
        sessionStorage.setItem("Aboutme", profile.personalDetails);
        sessionStorage.setItem("depart", profile.departement);
        sessionStorage.setItem("faculty", profile.faculty);
        sessionStorage.setItem("role", profile.userType);

        console.log(profile);
        window.location.href = `/admin/dashboard`
      })
      .catch(function (error) {
        console.log(error);
      });

  
    };
    getData();
    };

 
    
   

  return (
  
  <div>

<div className={"lContainer"}>

<div className="lItem">
    <div className="loginImage">
      <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
    </div>

    <div className="loginForm">
      <h2>Login</h2>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
        {errors && (<p style={errorsDisplay}> {errors} </p>)}
      <Form.Item
      
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>


      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/forgotPassword">
          Forgot password?
        </a>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>

        <FormControl  className={classed.lolbox} >
              {Load}
        </FormControl>
    
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


export default Login;
