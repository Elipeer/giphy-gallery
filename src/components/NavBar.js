import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-con">
      <div className="generic-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav-links inline-block">
        <div className="white-color">
          <div className="inline-block mr-30">
            <b onClick={() => navigate("/")} className="pointer">
              Home
            </b>
          </div>

          <b onClick={() => navigate("favorites")} className="pointer">
            Favorites
          </b>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
