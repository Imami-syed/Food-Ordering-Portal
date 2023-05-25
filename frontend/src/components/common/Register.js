import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React from 'react';
import { useNavigate } from "react-router-dom";

// const Sel=() => {
  
// };
const Register = (props) => {
  // // const options=[
  //   // {label: 'Buyer', value: 'buyer'},
  //   // {label: 'Vendor', value: 'vendor'}
  // // ]
  // const navigate = useNavigate();

  // return ( <div>
  //    <select>
  //       <option onScroll={() => navigate("/registerbuyer")}>Buyer</option>
  //       <option onClick={() => navigate("/registervendor")}>Vendor</option>
  //    </select>
  //  </div>
  // );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setDate(null);
    setAge("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      date: Date.now(),
      age: age,
    };

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
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
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
  
};


export default Register;
// export default Sel;