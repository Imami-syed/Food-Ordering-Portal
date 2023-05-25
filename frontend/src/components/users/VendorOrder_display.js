import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import axios from "axios";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Navbar3 from "../templates/Navbar3";
// import { LaptopWindows } from "@material-ui/icons";
const VendoOrder_display = (props) => {

  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/myorders", { email: email })
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const [Staus, setstat] = useState("");
  const [temp, settemp] = useState("");
  const [Accepted, setAccepted] = useState("Accepted")
  const [Cooking, setCook] = useState("Cooking")
  const [Readytopick, setpick] = useState("Readytopick")
  // const [,setAccepted]=useState("Accepted")


  ////rejecting the deal
  const onreject= (id) => {

    axios.post('http://localhost:4000/user/findorders', { id: id }).then((res) => {
      console.log(res.data)
      setstat(res.data.orderstatus)
      rejecting(id);
    })

  }
  const rejecting= (id) => {

    if (Staus === "Placed") {
      console.log("here ")
      settemp("Rejected");
    }

    if (temp !== "") {
      axios.post("http://localhost:4000/user/statusset", { id: id, status: temp }).then((res) => {
        window.location.reload(false);
        console.log(res.data)

      })
    }
    
  }

/////Accepting the Deal
  const onSubmit = (id) => {

    axios.post('http://localhost:4000/user/findorders', { id: id }).then((res) => {
      console.log(res.data)
      setstat(res.data.orderstatus)
      setting(id);
    })

  }
  const setting = (id) => {

    if (Staus === "Placed") {
      console.log("here ")
      settemp(Accepted);

    }
    else if (Staus === Accepted) {
      settemp(Cooking);
    }
    else if (Staus === Cooking) {
      settemp(Readytopick);
    }

    if (temp !== "") {
      axios.post("http://localhost:4000/user/statusset", { id: id, status: temp }).then((res) => {
        window.location.reload(false);
        console.log(res.data)
        settemp("");

      })
    }
    console.log(Staus)
    console.log(temp);
  }
  return (
    <>
      <Navbar3 />

      <p className="container">
        <h1 style={{ textAlign: "center" }}>Orders recived{email}!!!<br />Your role is Vendor!!!  </h1>
      </p>
      <div>
        <Grid container>
          <Grid item xs={12} md={9} lg={9}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> Sr No.</TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={sortChange}>
                        {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button>
                      Date
                    </TableCell>
                    <TableCell>Food Name</TableCell>
                    <TableCell>Buyer Name</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                    {/* <TableCell>price</TableCell> */}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{ind}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>{user.itemname}</TableCell>
                      <TableCell>{user.buyerid}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.qty}</TableCell>
                      <TableCell>{user.orderstatus}</TableCell>
                      <TableCell> <Button variant="primary" onClick={() => onSubmit(user._id)}>
                        Move to next stage
                      </Button></TableCell>
                      <TableCell> <Button variant="primary" onClick={() => onreject(user._id)}>
                        Reject
                      </Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>

    </>

  );

}

export default VendoOrder_display;