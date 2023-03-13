import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderBy, filterBy } from '../../redux/actions/actions';
import "./FilteredBy.css"



export const FilteredBy = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    const handleTemperaments = (e) => {
        dispatch(filterBy(e.target.value));
      }

    const handleFilterChange = (e) => {
        dispatch(filterBy(e.target.value));
    }

    const handleSortChange = (e) => {
        dispatch(orderBy(e.target.value));
    }
    //filtrar por temperamentos, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
    //ordenar tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.

    return (
        <div className='container-div'>
            <select className="selectCont" onChange={handleFilterChange} name="" id="">
                <option className="option" value="default">TODOS...</option>
                <optgroup className="optionGroup" label="DataBase">
                    <option className="option" value="DB">CREADOS</option>
                </optgroup>
                <optgroup className="optionGroup" label="API">
                    <option className="option" value="API">API</option>
                </optgroup>


            </select>
            <select className="selectCont" onChange={handleTemperaments} name="temperaments">
                <option className="option" value="default">TEMPERAMENTOS...</option>
                <optgroup className="optionGroup" label="Temperaments" >
                    {temperaments && temperaments.map(t => <option value={t}>{t}</option>)}
                </optgroup>
            </select>

            <select className="selectCont" onChange={handleSortChange} name="" id="">
                <option className="option" value="default">ORDEN...</option>
                <optgroup className="optionGroup" label="Alfabetico">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
                </optgroup><optgroup className="optionGroup" label="Peso">
                    <option className="option" value="MIN - MAX">MIN - MAX</option>
                    <option className="option" value="MAX - MIN">MAX - MIN</option>
                </optgroup>
            </select>
        </div>
    )
}
