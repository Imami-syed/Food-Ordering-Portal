import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../templates/Navbar2";
const Profile = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile") // unimplemented
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div>
    <Navbar2/>
    <h1>Home Page</h1>
    <br />
    <ul>
      <li>
        <Link to="/users">UsersList</Link>
      </li>
      <li>
        <Link to="/buyer">buyerlist</Link>
      </li>
      <li>
        <Link to="/foods">foodlist</Link>
      </li>
      {/* <li> */}
        {/* <Link to="/vendor">vendorlist</Link> */}
      {/* </li> */}
     
    </ul>
  </div>;
};

export default Profile;
