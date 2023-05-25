import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

import Navbar2 from '../templates/Navbar2';
const Register2 = (props) => {
  return (
    <>
<Navbar2 />

<div style={{ display: 'block', 
                  width: 1000, 
                  padding: 30 ,margin: 0}}>
<h1>Select the Buyer or vendor to redirect to the page</h1>
<Dropdown as={ButtonGroup} size="lg">
  <Button variant="primary">Select</Button>

  <Dropdown.Toggle split variant="primary" />

  <Dropdown.Menu>
    <Dropdown.Item href="/registerbuyer">Register Buyer</Dropdown.Item>
  <Dropdown.Item href="/registervendor">Register Vendor</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</div>
</>
  );  
};


export default Register2;