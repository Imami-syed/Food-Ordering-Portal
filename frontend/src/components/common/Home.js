import React from "react";
import { useState, useEffect } from "react";
import Navbar2 from "../templates/Navbar2";
import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image';
const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Imami");
  }, []);
     

  return <> 
  <Navbar2 /> 
  <p className="container"><h1 style={{ textAlign: "center" }}>Welcome to Home page !! </h1>
  </p></>;
  
};

export default Home;
