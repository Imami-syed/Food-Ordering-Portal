import { Navbar, Container ,Button, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Navbar2 = () => {
    const navigate = useNavigate();
  
    return (
        <>
  <Navbar bg="primary" variant="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">Order Now !!!</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Register" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/registerbuyer">Register Buyer</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/registervendor">
            Register Vendor
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  
                </>
    );
  };
  
  export default Navbar2;