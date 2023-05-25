import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import  {Button } from "@mui/material/Button";

// import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar3 from "../templates/Navbar3";
const Addfood = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [vornv, setVornv] = useState("");
  const [canteenname, setcanteenname] = useState("");
  const [date, setDate] = useState(null);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangecanteenname = (event) => {
    setcanteenname(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };
  const onChangeVornv = (event) => {
    setVornv(event.target.value);
  };
  const resetInputs = () => {
    setName("");
    setPrice("");
    setRating("");
    setDate(null);
    setVornv("");
  };
  useEffect(() => {
    axios.post('http://localhost:4000/user/vendor_details', { email: email }).then((response) => {
      setcanteenname(response.data)
      console.log(response.data)
    });
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();

    const newfood = {
      name: name,
      email: email,
      price: price,
      date: Date.now(),
      rating: rating,
      vornv: vornv,
      canteenname: canteenname,
    };

    axios
      .post("http://localhost:4000/user/addfood", newfood)
      .then((response) => {
        alert("Food item " + response.data.name + "\t added Successfully!!!");
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <>
      <Navbar3 />
      <div style={{
        display: 'block',
        width: 1000,
        padding: 30, margin: 0
      }}>

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
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              value={price}
              onChange={onChangePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Rating"
              variant="outlined"
              value={rating}
              onChange={onChangeRating}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Veg or Nonveg"
              variant="outlined"
              value={vornv}
              onChange={onChangeVornv}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Canteen name"
              variant="outlined"
              value={canteenname}
              onChange={onChangecanteenname}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="success" onClick={onSubmit}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );

};


export default Addfood;
