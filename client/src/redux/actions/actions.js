import axios from "axios"
import {
  GET_ALL_DOGS,
  SEARCH_BY_NAME,
  GET_DOG_DETAILS,
  GET_TEMPERAMENTS,
//GET_DOGS_BY_TEMP,
  ORDER_BY,
  FILTER_BY
} from "./constantes.js"



// FUNCION PARA TRAER TODAS LAS RAZAS----------(DB Y API)
export function getAllDogs() {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:3001/dogs/");
      dispatch({ type: GET_ALL_DOGS, payload: res.data });
    } catch (err) {
      return err;
    }
  }
}



// FUNCION QUE TRAE UNA RAZA POR QUERY (name) ------------

export function searchByName(name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      dispatch({ type: SEARCH_BY_NAME, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}



//   FUNCION QUE TRAE UNA RAZA POR ID --------

export function getDogDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/dogs/${id}`);
      dispatch({ type: GET_DOG_DETAILS, payload: res.data });
    } catch (error) {
      console.error(new Error(error));
    }
  };
}



//  FUNCION QUE TRAE TODOS LOS TEMPERAMENTOS
export function getTemperaments() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/temperaments`)
      .then((res) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}


// Ordenamiento
export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY, payload: order });
  };
}

//* Filtrado
export function filterBy(order) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY, payload: order });
  };
}