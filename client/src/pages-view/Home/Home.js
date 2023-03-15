import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getTemperaments } from '../../redux/actions/actions'
import { CardsContainer } from '../../components/CardsContainer/CardsContainer'
import { NavBar } from '../../components/NavBar/NavBar'
import { Pagination } from '../../components/Pagination/Pagination'
import { FilteredBy } from '../../components/FilteredBy/FilteredBy'
import { Footer } from '../../components/Footer/Footer'

export const Home = () => {

  const allDogs = useSelector((state) => state.filtered);
  const temperaments = useSelector((state) => state.temperaments)

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8)

  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

  useEffect(() => {
    if (allDogs.length === 0) {
      dispatch(getAllDogs())
      if (temperaments.length === 0) {
        dispatch(getTemperaments())
      }
    }
  }, [dispatch, allDogs, temperaments]);


  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>
      <NavBar />
      <Pagination
        dogsPerPage={dogsPerPage}
        totaldogs={allDogs.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <FilteredBy temperaments={temperaments}/>
      <CardsContainer currentDogs={currentDogs} />
      <Footer />
    </div>
  )
}
