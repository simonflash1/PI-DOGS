import React from 'react'
import "./Search.css"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchByName } from "../../redux/actions/actions"


export const Search = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
      }
    
      const inputSubmitHandler = (e) => {
        e.preventDefault();
        const validName = /^[a-zA-Z0-9\s]+$/.test(name);
        if (name === "" || !validName) {
          window.alert(
            "Por favor ingrese un nombre válido para la búsqueda (solo letras, números y espacios)."
          );
        } else {
          dispatch(searchByName(name))
        }
      };

    return (
        <div className='search-container'>
      <form onSubmit={inputSubmitHandler}>
        <div>
          <input className='search-input' type="text" id="mySearch" placeholder='Ingrese una raza' onChange={e => { handleInputChange(e) }} value={name} />
          <button className='search-button' type="submit">Buscar</button>
        </div>
      </form>
    </div>
    )
}
