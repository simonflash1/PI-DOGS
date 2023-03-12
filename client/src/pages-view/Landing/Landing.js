import React from 'react'
import { Link } from "react-router-dom";
import "./Landing.css"

export const Landing = () => {
  return (
    <div className='landing'>
      <h1>Bienvenidos a mi Proyecto Individual</h1>
      <h2>Henry Dogs</h2>
      <Link to ="/home">
        <button className='landing-button'>Ingresar</button>
      </Link>
    </div>
  )
}
