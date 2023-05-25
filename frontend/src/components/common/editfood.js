import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar3 from "../templates/Navbar3";
const Editfood = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [vornv, setVornv] = useState("");
  const [date, setDate] = useState(null);

  const onChangeName = (event) => {
    setName(event.target.value);
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

  const onSubmit = (event) => {
    event.preventDefault();

    const newfood = {
      name: name,
      price: price,
      email: email,
      date: Date.now(),
      rating: rating,
      vornv: vornv,
    };

    axios
      .post("http://localhost:4000/user/editfood", newfood)
      .then((response) => {
        alert("Changes made Successfully!!!");
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <>
    <Navbar3 />
    <div style={{ display: 'block', 
                  width: 1000, 
                  padding: 30 ,margin: 0}}>
  
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
        <Button variant="success" onClick={onSubmit} href="/food">
          Edit
        </Button>
      </Grid>
    </Grid>
          </div>
    </>
  );
  
};


export default Editfood;
