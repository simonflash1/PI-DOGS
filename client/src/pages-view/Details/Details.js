import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from '../../redux/actions/actions'
import { Link, useParams } from "react-router-dom";
import { NavBar } from '../../components/NavBar/NavBar';
import "./Details.css"

export const Details = () => {

  const { id } = useParams()

  const dispatch = useDispatch();

  const dogData = useSelector((state) => state.dogDetails)


  useEffect(() => {
    dispatch(getDogDetail(id))
  }, [dispatch, id])
  console.log(dogData)

  return (
    <div className='dog-details-container'>
      <h1>Detalles de la raza</h1>
      <NavBar />
      <img src={dogData.image || `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`}
        alt={dogData.name} className='dog-details-image' />
      <div className='detail_info'>
        <p>ID: {dogData.id}</p>

        <p>Nombre: {dogData.name}</p>

        {dogData.height?.metric ? (
          <p>Altura Minima: {dogData.height?.metric.split(' - ')[0]}</p>
        ) : (
          <p>Altura Minima: {dogData.height_min}</p>
        )}
        {dogData.height?.metric ? (
          <p>Altura Maxima: {dogData.height?.metric.split(' - ')[1]}</p>
        ) : (
          <p>Altura Maxima: {dogData.height_max}</p>
        )}


        {dogData.weight?.metric ? (
          <p>Peso Minimo: {dogData.weight?.metric.split(' - ')[0]}</p>
        ) : (
          <p>Peso Minimo: {dogData.weight_min}</p>
        )}
        {dogData.weight?.metric ? (
          <p>Peso Maximo: {dogData.weight?.metric.split(' - ')[1]}</p>
        ) : (
          <p>Peso Maximo: {dogData.weight_max}</p>
        )}

        {dogData.temperament ? (
          <p>Temperamentos: {dogData.temperament}</p>
        ) : (
          <p>Temperamentos: {dogData.temperaments?.map(temp => temp.name).join(', ')}</p>
        )}

        <p>Esperanza de vida: {dogData.life_span}</p>
      </div>
      <Link to='/home'>
        <button className='details-button'>
          Go Back to Home
        </button>
      </Link>
    </div>

  )
}
