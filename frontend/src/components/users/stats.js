import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Navbar3 from "../templates/Navbar3";
const Statspage = (props) => {



    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));



    const [Completed, setstat] = useState("");
    const [Pending, settemp] = useState("");
    const [Total, settotal] = useState("");

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/myorders", { email: email })
            .then((response) => {
                setUsers(response.data);
                setSortedUsers(response.data);
                setSearchText("");
                settotal(users.length);
                var a = 0;
                var b = 0;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].orderstatus === "Completed") {
                        a++;
                    }
                    else {
                        b++;
                    }
                }
                setstat(a);
                settemp(b);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        var a;
        var b;

    }, []);




    return (
        <>
            <Navbar3 />
<p className="container">

<h1>Welcome to Statistics page!</h1> <br/>

    <h2>        Orders Placed:    {Total}   <br/>
            Completed Orders:    {Completed}   <br/>
            Pending Orders:    {Pending}   <br/>
            </h2>
</p>
        </>

    );

};

export default Statspage;