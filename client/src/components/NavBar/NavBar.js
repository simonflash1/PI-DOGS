import React from 'react'
import { Link } from "react-router-dom";
import { Search } from '../Search/Search';
import "./NavBar.css"

export const NavBar = () => {
  return (
    <div className="main-container">
      <Link to="/home">HOME</Link>
      <Link to="/create">CREATE</Link>
      <Link to="/about">ABOUT</Link>
      <Search />
    </div>
  )
  //<Search />
}