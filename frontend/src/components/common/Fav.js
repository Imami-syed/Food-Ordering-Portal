import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Fav = (props) => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [qty, setQty] = useState("");
    const [vendorid, setvendorid]=useState("");
    const [vendoremail, setvendoremail]=useState("");
    const [shop_name, setshop_name]=useState("");
    const [orderstatus, setorderstatus]=useState("");
    const [buyerid, setbuyerid]=useState("");
    const [foodid, setfoodid]=useState("");
    
    useEffect(() => {
        console.log(email)
        axios
            .post("http://localhost:4000/user/gettingfavourite", {email:email})
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    // const nuser={
    //   email: email,
    // }
    // useEffect(() => {
    //   console.log(nuser)
    //   axios
    //   .get("http://localhost:4000/user/vfood", nuser)
    //   .then((response) => {
    //     setUsers(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }, []);
    // console.log(users)
    // const sortChange = () => {
    //   let usersTemp = users;
    //     const flag = sortName;
    //     usersTemp.sort((a, b) => {
    //       if (a.date != undefined && b.date != undefined) {
    //         return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
    //       } else {
    //       return 1;
    //     }
    //   });
    //   setUsers(usersTemp);
    //   setSortName(!sortName);
    // };
    // const AddQuantity=(id) =>{
    //   const newqty= prompt("Enter Quantity: ");
    //   // axios.put("http://localhost:4000/user/addqty", {newqty: newqty, id:id});
    //   setQty(newqty)
    //   console.log(qty)
    //   alert('Quantity added successfully!!!')
    // };
  
    // const AddOrder=(id)=>{
    //   const neworder={
    //     qty:qty,
    //     vendorid:vendoremail,
    //     buyerid:email,
    //     shop_name:shop_name,
    //     orderstatus:orderstatus,
    //     foodid:id
    //   }
    //   axios.post('http://localhost:4000/user/gettingvendoremail').then((response) =>{
    //   setvendoremail(response.data)
    //   console.log(response.data)
    //   }).then(()=> {
    //     axios.post('http://localhost:4000/user/borders', neworder)
    //     .then((response) =>{
    //       alert("Sending Order details...")
    //       console.log(response.data);
    //     })
    //     alert('Order Placed successfully!!!')
    //   })
    //   console.log(id)
    // };
    // const customFunction = (event) => {
    //   console.log(event.target.value);
    //   setSearchText(event.target.value);
    // };
    return (
      <div>
          <Navbar4 />
            <Grid item xs={12} md={9} lg={9}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell> Sr No.</TableCell>
                                <TableCell>FoodItem</TableCell>
                                <TableCell>vendor Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, ind) => (
                                <TableRow key={ind}>
                                    <TableCell>{ind+1}</TableCell>
                                    <TableCell>{user.foodname}</TableCell>
                                    <TableCell>{user.vendoremail}</TableCell> 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Grid>
      </div>
    );
  };
  
  export default Foodlist2;