import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import  {Button } from "@mui/material/Button";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar2 from "../templates/Navbar2";
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))
const Registerbuyer = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [Batch_name, setbatch_name] = useState("");
  const [date, setDate] = useState(null);
  const [Password, setPassword] = useState("");

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
      .post("http://localhost:4000/user/registerbuyer", newbuyer)
      .then((response) => {
        alert("Registered Buyer " + response.data.name + "\tSuccessfully!!!");
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
          label="Name"
          variant="outlined"
          value={name}
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
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
          />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contact_number}
          onChange={onChangeContact_number}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <TextField
          label="Batch Name"
          variant="outlined"
          value={Batch_name}
          onChange={onChangebatch_name}
          />
      </Grid> */}
      <div className="container">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Batch Name</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Batch_name}
          onChange={onChangebatch_name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>UG1</MenuItem>
          <MenuItem value={2}>UG2</MenuItem>
          <MenuItem value={3}>UG3</MenuItem>
          <MenuItem value={4}>UG4</MenuItem>
          <MenuItem value={5}>UG5</MenuItem>
        </Select>
      </FormControl>
      </div>
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


export default Registerbuyer;
