import React, { useContext } from "react";
import "./Navbar.css";
// import Profile from "../../img/ekd.jpeg";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
// let Profile = require("../img/ekd.jpeg");

export default function Navbar() {
  // const user = false;
  const {user, dispatch} = useContext(Context);
  const PF = "http://127.0.0.1:7000/img"

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"});
  };

  return (
    <div className="top">
      <div className="topLeft" >
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-github"></i>
      </div>

      <div className="topCenter" >
        <ul className="topList">
          <li className="topListItem"><Link to="/" className="link">Home</Link></li>
          <li className="topListItem"><Link to="/" className="link">About</Link></li>
          <li className="topListItem"><Link to="/" className="link">Contact</Link></li>
          <li className="topListItem"><Link to="/write" className="link">Write</Link></li>
          {/* if there is a user, show Logout, if there is no user hide logout */}
          <li className="topListItem" onClick={handleLogout}>{user && "Logout"}</li>
        </ul>
      </div>
      <div className="topRight" >
        {/* if there is a user, display user image, if not show home only */}
        {
          user ? (
            <Link to="/settings">
            <img
              className="topImg"
              src={PF + user.profile}
              alt="profile" 
              />
            </Link>
          ) : (

            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">Login</Link>
              </li>
              {/* <li className="topListItem">
                <Link to="/register" className="link">Register</Link>
              </li> */}
            </ul>

          )
        }
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
