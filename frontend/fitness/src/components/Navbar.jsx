import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeStyle = ({ isActive }) => ({
  fontWeight: isActive ? "600" : "400",
});

const Navbar = () => {
  return (
    <div className="w-screen py-3 text-lg border-b-2 ">
      <div className="w-[90%] mx-auto flex justify-between">
        <div className="font-serif  text-2xl ">
          <Link to="/">
            {" "}
            Fit<span className="ml-[2px]">Freaks</span>
          </Link>
        </div>
        <div>
          <nav className="flex gap-6 ">
            <NavLink to="/" style={activeStyle} className="">
              Home
            </NavLink>
            <NavLink to="/exercise" style={activeStyle} className="">
              Exercise
            </NavLink>
            <NavLink to="/food" style={activeStyle} className="">
              Food
            </NavLink>{" "}
            <NavLink to="/goals" style={activeStyle} className="">
              Goals
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
