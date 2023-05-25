import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button, Form } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Navbar4 from "../templates/Navbar4";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const Foodlist2 = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [qty, setQty] = useState("");
  const [vendorid, setvendorid] = useState("");
  const [vendoremail, setvendoremail] = useState("");
  const [vemail, setvemail] = useState("");
  const [shop_name, setshop_name] = useState("");
  const [food, setfood] = useState("");
  const [orderstatus, setorderstatus] = useState("");
  const [buyerid, setbuyerid] = useState("");
  const [foodid, setfoodid] = useState("");

  const nuser = {
    email: email,
  }
  const def = {
    email: email,
  };
  const [wallet, setwallet] = useState(0);
  const [bid, setidb] = useState(0);
  useEffect(() => {

    axios
      .post(`http://localhost:4000/user/buyerpage/${email}`, def)
      .then((response) => {
        console.log(response.data);

        setidb(response.data._id);

        setwallet(response.data.wallet);

        // alert("Success!!!");
      });
  }, []);
  console.log(bid, wallet);
  useEffect(() => {
    console.log(nuser)
    axios
      .get("http://localhost:4000/user/vfood", nuser)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(users)
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
  const AddQuantity = (id) => {
    const newqty = prompt("Enter Quantity: ");
    // axios.put("http://localhost:4000/user/addqty", {newqty: newqty, id:id});
    setQty(newqty)
    console.log(qty)
    alert('Quantity added successfully!!!')
  };
  const [price, setprice] = useState(0);
  const [itemname, setitem] = useState("");
  const AddFav = (id) => {
    axios.post('http://localhost:4000/user/gettingvendoremail', { id: id }).then((response) => {
      setvemail(response.data.email)
      setfood(response.data.name);
      console.log(response.data)
    })
    const newFav = {

      food: food,
      vemail: vemail,
      bemail: email,
    }
    axios.post('http://localhost:4000/user/addfav', newFav)
      .then((response) => {
        if (response.data == "") {
          alert("Already in favourites");
        } else {
          alert("Added to favourites!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [addamount, setamount] = useState(0);
  const AddOrder = (id) => {
    const neworder = {
      qty: qty,
      vendorid: vendoremail,
      buyerid: email,
      shop_name: shop_name,
      itemname: itemname,
      price: price,
      // orderstatus: orderstatus,
      foodid: id,
      date: Date.now()
    }

    axios.post('http://localhost:4000/user/gettingvendoremail', { id: id }).then((response) => {
      setvendoremail(response.data.email)
      setshop_name(response.data.canteenname)
      setprice(response.data.price);
      setitem(response.data.name);
      // console.log(response.data)
    })

    if (qty !== 0 && qty !== null && vendoremail !== "") {
      setamount(parseInt(qty)*parseInt(price));
      axios.post('http://localhost:4000/user/borders', neworder)
        .then((response) => {
          alert("Sending Order details...")
          setQty(0);
          console.log(response.data);
        })
      alert('Order Placed successfully!!!')
    }

    axios
      .post("http://localhost:4000/user/subwallet", { id: bid, wall: wallet, aa: addamount})
      .then((response) => {
        alert("amount deducted")

      });



    // console.log(neworder)  
  };
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  return (
    <div>
      <Navbar4 />
      <Grid item xs={12} md={9} lg={9}>
        <List component="nav" aria-label="mailbox folders">
          <TextField
            id="standard-basic"
            label="Search"
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          // onChange={customFunction}
          />
        </List>
      </Grid>
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
                  {''}{''}Date
                </TableCell>

                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Veg or Nonveg</TableCell>
                <TableCell>Favourites</TableCell>
                <TableCell>Canteen Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, ind) => (
                <TableRow key={ind}>
                  <TableCell>{ind}</TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.price}</TableCell>
                  <TableCell>{user.rating}</TableCell>
                  <TableCell>{user.vornv}</TableCell>
                  <TableCell>{user.canteenname}</TableCell>
                  <TableCell><Button variant="success" onClick={() => AddFav(user._id)}>Add to favourites</Button></TableCell>
                  <TableCell>

                    <TableCell><Button variant="primary" onClick={() => { AddQuantity() }}>Quantity</Button></TableCell>
                    {/* <Button variant="primary">Quantity</Button> */}
                  </TableCell>
                  <TableCell><Button variant="warning" onClick={() => { AddOrder(user._id) }}>Order</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </div>
  );
};

export default Foodlist2;