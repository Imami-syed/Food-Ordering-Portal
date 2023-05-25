import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar2 from "../templates/Navbar2";


const RegisterVendor = (props) => {
  const [Manager_name, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  const [Shop_name, setShop_name] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [open_time, setopen_time] = useState("");
  const [close_time, setclose_time] = useState("");
  const [Password, setPassword] = useState("");

  const onChangename = (event) => {
    setManagerName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeopen_time = (event) => {
    setopen_time(event.target.value);
  };
  const onChangeclose_time = (event) => {
    setclose_time(event.target.value);
  };
  const onChangeContact_number = (event) => {
    setcontact_number(event.target.value);
  };
  const onChangeShop_name = (event) => {
    setShop_name(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setManagerName("");
    setEmail("");
    setShop_name("");
    setclose_time("");
    setopen_time("");
    setcontact_number("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      Manager_name: Manager_name,
      email: email,
      contact_number: contact_number,
      Shop_name: Shop_name,
      open_time: open_time,
      close_time: close_time,
      Password: Password,
    };

    axios
      .post("http://localhost:4000/user/registerVendor", newVendor)
      .then((response) => {
        alert("Registered Vendor\t" + response.data.Manager_name + "\tSuccessfully!!!");
        console.log(response.data);
      });

    resetInputs();
  };

  return (

    <>
    <Navbar2 />
    <div style={{ display: 'block', 
                  width: 1000, 
                  padding: 30 ,margin: 0}}>
                  
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Manager name"
          variant="outlined"
          value={Manager_name}
          onChange={onChangename}
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
           id="standard-password-input"
           label="Password"
           type="password"
          variant="outlined"
          value={Password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
      <Button variant="success" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
    </div>
    </>
  );
  
};
export default RegisterVendor;
