import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const NavBar = (props) => {
  const [alignment, setAlignment] = React.useState(props.mode);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  return (
    <div className="nav-con">
      <div className="generic-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav-links inline-block">
        <div className="white-color">
          <div className="inline-block mr-30">
            <b>Home</b>
          </div>

          <b onClick={() => navigate("favorites")}>Favorites</b>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.persistedReducer.mode
  };
};

export default connect(mapStateToProps)(NavBar);
