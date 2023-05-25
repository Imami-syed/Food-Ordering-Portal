import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React from 'react';
import Navbar2 from "../templates/Navbar2";

const Login = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [Batch_name, setbatch_name] = useState("");
  const [date, setDate] = useState(null);
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeContact_number = (event) => {
    setcontact_number(event.target.value);
  };
  const onChangebatch_name = (event) => {
    setbatch_name(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setAge("");
    setDate(null);
    setcontact_number("");
    setbatch_name("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newbuyer = {
      name: name,
      email: email,
      date: Date.now(),
      age: age,
      contact_number: contact_number,
      Batch_name: Batch_name,
      Password: Password,
    };

    axios
      .post("http://localhost:4000/user/login", newbuyer)
      .then((response) => {
        if(response.data.nsa == 0) {
          alert("Invalid credentials");
          console.log(response.data);
        }
        else if (response.data.nsa == 1) {
          alert("Success Login!!");
          console.log(response.data);
          var n = response.data.Element.email
          localStorage.setItem("email", response.data.Element.email)
          navigate(`/vendorpage/${n}`);
          alert("Redirecting to  ..." + response.data.Element.email)
          
        } else if (response.data.nsa == 2){
          alert("Success Login!!");
          console.log(response.data );
          var n = response.data.Element.email
          localStorage.setItem("email", response.data.Element.email)
          navigate(`/buyerpage/${n}`);
          alert("Redirecting to  ..." + response.data.Element.email)
        }
      });
    resetInputs();
  };

  return (
    <>
    <Navbar2 />
    <p className="container">
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          variant="outlined"
          value={Password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
    </p>
    </>
  );
  
};


export default Login;
