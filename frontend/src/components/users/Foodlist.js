import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button } from 'react-bootstrap';
import Navbar3 from "../templates/Navbar3";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const Foodlist = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [foodname, setFoodName] = useState("");
  const [price, setprice] = useState("");
  const [rating, setrating] = useState("");
  const [vornv, setvornv] = useState("");
  const nuser={
    email: email,
  }
  useEffect(() => {
    console.log(nuser)
    axios
    .post("http://localhost:4000/user/food", nuser)
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  const deleteitem = (id) => {
    console.log(id)
    axios.delete(`http://localhost:4000/user/delete/${id}`).then((response) =>
    alert('Deleted'))
  };
  console.log(users)
  const updateFood=(id)=>{
    const newFood={
      foodname: foodname,
      price: price,
      vornv: vornv
    }
    foodname = prompt("Enter new name: ");
    price = prompt("Enter new price: ");
    vornv = prompt("Enter Veg or non Veg: ");
    axios.put('http://localhost:4000/user/update', {newFood: newFood, id: id});
  }
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
  return (
    <div>
        <Navbar3 />
        <div style={{ display: 'block', 
                  width: 1000, 
                  padding: 30 ,margin: 0}} className="container">
                    <Button variant="primary" href="/addfood">Add Item</Button>
</div>

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
                  <TableCell>Canteen name</TableCell>
                  <TableCell>Options</TableCell>
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
                    <TableCell>
                    <Button variant="warning" onClick={() => {updateFood(user._id)}} >Edit</Button> 
                     {' '}{' '}<Button variant="danger" onClick={() => {deleteitem(user._id)}}>Delete</Button>
                     </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
    </div>
  );
};

export default Foodlist;