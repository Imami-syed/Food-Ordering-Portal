import { Navbar, Container ,Button, Nav} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Navbar3 = () => {
    const navigate = useNavigate();
  
    return (
        <>
  <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Profile !!!</Navbar.Brand>
    <Nav className="me-auto">
      {/* <Nav.Link href='/editbuyer'>Dashboard</Nav.Link> */}
      {/* <Nav.Link href="/register2">Register</Nav.Link> */}
      <Nav.Link href="/food">Food List</Nav.Link>
      <Nav.Link href="/vorder">Orders</Nav.Link>
      <Nav.Link href="/statspage">Statistic Page</Nav.Link>
      {/* <Nav.Link href="/vorder">Orders</Nav.Link> */}
      {/* <Nav.Link href="/addfood">AddFood List</Nav.Link> */}
      <Nav.Link href="/">logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  
                </>
    );
  };
  
  export default Navbar3;