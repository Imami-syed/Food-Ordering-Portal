import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Navbar3 from "../templates/Navbar3";
const Vendorpage = (props) => {
  const {email, setEmail}=useParams()
  const [Manager_name, setManager_Name] = useState("");
  const [Shop_name, setShop_name] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [open_time, setopen_time] = useState("");
  const [close_time, setclose_time] = useState("");
  const [date, setDate] = useState(null);
  const [Password, setPassword] = useState("");
const def ={
  email: email,
};
const onChangeUsername = (event) => {
  setManager_Name(event.target.value);
};
const onSubmit = (event) => {
  axios
  .post("http://localhost:4000/user/editvendor",newassign)
  .then((response) => {
    alert("Changes made succesfully!")
    console.log(response.data);
  });
};
const onChangeEmail = (event) => {
  setEmail(event.target.value);
};

const onChangeShop_name = (event) => {
  setShop_name(event.target.value);
};
const onChangeContact_number = (event) => {
  setcontact_number(event.target.value);
};
const onChangeopen_time = (event) => {
  setopen_time(event.target.value);
};
const onChangeclose_time = (event) => {
  setclose_time(event.target.value);
};
const onChangePassword = (event) => {
  setPassword(event.target.value);
};
const newassign={
  Manager_name:Manager_name,
  email:email,
  Shop_name:Shop_name,
  contact_number:contact_number,
  open_time:open_time,
  close_time: close_time,
  Password:Password
}
useEffect(() => {
  axios
  .post(`http://localhost:4000/user/vendorpage/${email}`, def)
  .then((response) => {
    console.log(response.data);
    setManager_Name(response.data.Manager_name);
    setShop_name(response.data.Shop_name);
    setcontact_number(response.data.contact_number);
    setopen_time(response.data.open_time);
    setclose_time(response.data.close_time);
    setPassword(response.data.Password)
    // alert("Success!!!");
  });
},   []);

  return (
    <>    <Navbar3/>
    <p className="container">
    <h1 style={{ textAlign: "center" }}>Welcome {email}!!!<br />Your role is Vendor!!!  </h1>
  <a>
    Details :<br />
    1. {Manager_name}<br />
    2. {email}<br />
    3. {Shop_name}<br />
    4. {contact_number}<br />
    5. {open_time}<br />
    5. {close_time}<br />
    <Grid container align={"center"} spacing={2}>
    <Grid item xs={12}>
        <TextField
          label="Manager name"
          variant="outlined"
          value={Manager_name}
          onChange={onChangeUsername}
        />
      </Grid>
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
          label="Shop Name"
          variant="outlined"
          value={Shop_name}
          onChange={onChangeShop_name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contact_number}
          onChange={onChangeContact_number}
        />
      </Grid><Grid item xs={12}>
        <TextField
          label="Open time"
          variant="outlined"
          value={open_time}
          onChange={onChangeopen_time}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Close time"
          variant="outlined"
          value={close_time}
          onChange={onChangeclose_time}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={Password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="success" onClick={onSubmit}>
          Edit
        </Button>
      </Grid>
    </Grid>
  </a>
  </p>  
  </>

  );
  
};

export default Vendorpage;