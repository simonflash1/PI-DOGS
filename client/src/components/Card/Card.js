import React from 'react'
import { Link } from 'react-router-dom';
import "./Card.css"

export const Card = ({ id, image, name, temperaments, weight_min, weight_max }) => {
  return (
    <div className="card">
      <img className="card-image" src={image || DEFAULT_IMAGE} alt={name + ".jpg"} width='250px' height='250px' />
      <p>
        <Link className="card-title" to={`/dogs/${id}`}>
          {name || 'No name provided'}
        </Link>
      </p>
      <p className="card-temperaments">Temperaments: {temperaments}</p>
      <p className="card-info">Dog Weight: {weight_min} kg to {weight_max} kg</p>
    </div>
  )
}

const DEFAULT_IMAGE = 'https://i.pinimg.com/564x/ab/51/b0/ab51b081a710c257758c41c165388ac7.jpg';
