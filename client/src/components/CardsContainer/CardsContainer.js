import React from 'react'
import { Card } from '../Card/Card'
import { useSelector } from "react-redux"
import "./CardsContainer.css"


export const CardsContainer = ( {currentDogs} ) => {

  const allDogs = useSelector(state => state.allDogs)

  return (
    <section className='cards-container'>
  <div className="card-grid">
    {currentDogs.length ?
      currentDogs && currentDogs.map(dog =>
        <Card key={dog.id}
          id={dog.id}
          image={dog.image}
          name={dog.name}
          temperaments={dog.temperament ? dog.temperament : dog.temperaments}
          weight_min={dog.weight_min ? dog.weight_min : dog.weight[0]}
          weight_max={dog.weight_max ? dog.weight_max : dog.weight[1]}
        />
      ) :
      !currentDogs.lenght && allDogs.lenght ?
        <div className="cards_empty">
          <h2>No hay Razas para los filtros aplicados!!</h2>
        </div> :
        (<h1>Cargando...</h1>)
    }
  </div>
</section>

  )
}