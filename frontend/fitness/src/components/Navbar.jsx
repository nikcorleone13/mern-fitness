import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeStyle = ({ isActive }) => ({
  fontWeight: isActive ? "600" : "400",
});

const Navbar = () => {
  return (
    <div className="text-Primary w-screen py-5 text-xl border-b-2 border-b-Secondary ">
      <div className="w-[90%] mx-auto flex justify-between">
        <div className="font-sans text-2xl font-bold uppercase">
          <Link to="/">
            {" "}
            Fit<span className="ml-[2px]">Freaks</span>
          </Link>
        </div>
        <div>
          <nav className="flex gap-8 ">
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
