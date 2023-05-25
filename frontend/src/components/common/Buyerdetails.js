import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Navbar4 from "../templates/Navbar4";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const Buyerpage = (props) => {

  const [wallet, setwallet] = useState(0);
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

  const { email, setEmail } = useParams()
  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [addamount, setamount] = useState(0);
  // const [contact_number, setcontact_number] = useState("");
  const [Batch_name, setbatch_name] = useState("");
  const [date, setDate] = useState(null);
  const [Password, setPassword] = useState("");
  const def = {
    email: email,
  };
  const onChangeAmount = (event) => {
    setamount(event.target.value);
  };
  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    axios
      .post("http://localhost:4000/user/editbuyer", newassign)
      .then((response) => {
        alert("Changes made succesfully!")
        console.log(response.data);
      });
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
  const [id, setid] = useState("");
  const newassign = {
    id: id,
    name: name,
    email: email,
    age: age,
    contact_number: contact_number,
    Batch_name: Batch_name,
    Password: Password
  }
  useEffect(() => {

    axios
      .post(`http://localhost:4000/user/buyerpage/${email}`, def)
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setid(response.data._id);
        setAge(response.data.age);
        setwallet(response.data.wallet);
        setcontact_number(response.data.contact_number);
        setbatch_name(response.data.Batch_name);
        setPassword(response.data.Password)
        // alert("Success!!!");
      });
  }, []);
  // console.log(id);
  const addingtowallet = () => {
    axios
      .post("http://localhost:4000/user/addwallet",{id:id,wall:addamount,aa:wallet})
      .then((response) => {
       alert("added")

      });
  }
  return (
    <>
      <Navbar4 />
      <h1 style={{ textAlign: "center" }}>Welcome {email}!!!<br />Your role is Buyer!!!  </h1>
      <div style={{ textAlign: "center" }}>
        <h1 >Wallet: {wallet}</h1>
        <Grid item xs={12}>
          <TextField
            id="standard-password-input"
            label="Add"
            variant="outlined"
            value={addamount}
            onChange={onChangeAmount}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="success" onClick={()=>addingtowallet()}>
            ADD
          </Button>
        </Grid>
      </div>

      <a>
        Details :<br />
        1. {name}<br />
        2. {email}<br />
        3. {age}<br />
        4. {contact_number}<br />
        5. {Batch_name}<br />
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
              <InputLabel id="demo-controlled-open-select-label">Batch name</InputLabel>
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
              Edit
            </Button>
          </Grid>
        </Grid>
      </a>
    </>

  );

};

export default Buyerpage;