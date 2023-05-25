import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar2 from "./components/templates/Navbar2";
import Profile from "./components/users/Profile";
import RegisterBuyer from "./components/common/RegisterBuyer";
import RegisterVendor from "./components/common/RegisterVendor";
import Register2 from "./components/common/page";
import Login from "./components/common/login";
import BuyerList from "./components/users/BuyerList";
import Buyerpage from "./components/common/Buyerdetails";
import Vendorpage from "./components/common/Vendordetails";
import Foodlist from "./components/users/Foodlist";
import Foodlist2 from "./components/users/Foodlist2";
import Addfood from "./components/common/addfood";
import Editfood from "./components/common/editfood";
import VendoOrder_display from "./components/users/VendorOrder_display";
import BOrders from "./components/common/BOrders"
import Statspage from "./components/users/stats";

const Layout = () => {
  return (
    <div>
      {/* <Navbar2 /> */}
      {/* <div className="container"> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="buyer" element={<BuyerList />} />
          <Route path="register" element={<Register />} />
          <Route path="register2" element={<Register2 />} />
          <Route path="registerbuyer" element={<RegisterBuyer />} />
          <Route path="registervendor" element={<RegisterVendor />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login/>} />
          <Route path="buyerpage/:email" element={<Buyerpage/>} />
          <Route path="editbuyer" element={<Buyerpage/>} />
          <Route path="vendorpage/:email" element={<Vendorpage/>} />
          <Route path="addfood" element={<Addfood/>} />
          <Route path="editfood" element={<Editfood/>} />
          <Route path="food" element={<Foodlist/>} />
          <Route path="vfood" element={<Foodlist2/>} />
          <Route path="border" element={<BOrders/>} />
          <Route path="vorder" element={<VendoOrder_display/>} />
          <Route path="statspage" element={<Statspage/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;