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
import Navbar4 from "../templates/Navbar4";
const BOrders = (props) => {

  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/myordersbuyer", { email: email })
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
  const [temp, settemp] = useState("");
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const onSubmit = (id) => {
    settemp("Completed")
    if (temp !== "") {
      axios.post("http://localhost:4000/user/statusset", { id: id, status: temp }).then((res) => {
        window.location.reload(false);
        console.log(res.data)
        settemp("");

      })
    }
  }

  return (
    <>
      <Navbar4 />

      <p className="container">
      <h1 style={{ textAlign: "center" }}>Your Orders</h1>
        <h1 style={{ textAlign: "center" }}>Orders recived  {email}!!!</h1>
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
                    <TableCell>vendor Name</TableCell>
                    <TableCell>Canteen Name</TableCell>
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
                      <TableCell>{user.vendorid}</TableCell>
                      <TableCell>{user.shop_name}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.qty}</TableCell>
                      <TableCell>{user.orderstatus}</TableCell>
                      <TableCell>
                        {(() => {
                          if (user.orderstatus == "Readytopick") {
                            return <Button variant="primary" onClick={() => onSubmit(user._id)}>
                              Pickup
                            </Button>
                          }
                        })()}


                      </TableCell>
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


export default BOrders;