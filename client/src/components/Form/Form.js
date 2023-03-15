import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getAllDogs, getTemperaments } from '../../redux/actions/actions';

export const Form = () => {

    //   FUNCION PARA VALIDAR EL INPUT ----

    const validate = (form) => {
        let errors = {};

        if (!form.name.trim()) {
            errors.name = "Este campo es requerido";
        }

        if (!form.height_min.trim()) {
            errors.height_min = "Este campo es requerido";
        } else if (isNaN(form.height_min)) {
            errors.height_min = "Ingrese un número";
        }

        if (!form.height_max.trim()) {
            errors.height = "Este campo es requerido";
        } else if (isNaN(form.height_max)) {
            errors.height_max = "Ingrese un número";
        }

        if (!form.weight_min.trim()) {
            errors.weight_min = "Este campo es requerido";
        } else if (isNaN(form.weight_min)) {
            errors.weight_min = "Ingrese un número";
        }
        if (!form.weight_max.trim()) {
            errors.weight_max = "Este campo es requerido";
        } else if (isNaN(form.weight_max)) {
            errors.weight_max = "Ingrese un número";
        }

        if (!form.life_span.trim()) {
            errors.life_span = "Este campo es requerido";
        } else if (isNaN(form.life_span)) {
            errors.life_span = "Ingrese un número";
        }

        if (form.temperaments.length === 0) {
            errors.temperaments = "Debe seleccionar al menos un temperamento";
        }

        if (!form.image.trim()) {
            errors.image = "Este campo es requerido";
        } else if (!form.image.trim().match(/^(http|https):\/\/[^\s$.?#].[^\s]*$/)) {
            errors.image = "Ingrese una URL válida";
        }

        return errors;
    };



    //  FUNCION PARA TRAER LOS JUEGOS Y GENEROS DEL ESTADO GLOBAL --------
    const dispatch = useDispatch();
    const temperament = useSelector(state => state.temperaments);


    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments());
    }, [dispatch])


    //   FUNCION PARA SETEAR EL ESTADO QUE SE VA A ENVIAR PARA LA CREACION
    const [form, setForm] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperaments: [],
        image: "",
        createdByUser: true,
    })


    //  FUNCION PARA SETEAR ESTADO DE ERROR
    const [errors, setErrors] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperaments: [],
        image: "",
        createdByUser: true,
    })

    useEffect(() => {
        console.log(form);
    }, [form]);


    // FUNCIONES HANDLER PARA MANEJAR LOS EVENTOS ONCHANGE DE STRING Y ARRAY
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        validate({ ...form, [property]: value })
        setForm({ ...form, [property]: value })
    }

    const changeHandlerArray = (event) => {
        const property = event.target.name;
        const values = Array.from(event.target.selectedOptions, option => option.value);
        setForm({ ...form, [property]: [...form[property], ...values] });
    }


    // FUNCION PARA SUBMIT --------
    const submitHandler = (event) => {
        event.preventDefault()
        const formErrors = (validate(form))
        setErrors(formErrors);
        console.log(errors)
        if (Object.keys(formErrors).length === 0) {
            axios.post("/dogs", form)
                .then(res => alert("Creado con exito"))
                .catch(error => console.log(error.message))
        }
    }


    return (
        <div className='create-container'>
            <h1>Crea tu propia Raza</h1>
            <form className='create-form' onSubmit={submitHandler}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={form.name} onChange={changeHandler} name="name" placeholder='Ingrese un Nombre'></input>
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div>
                    <label>Altura Minima: </label>
                    <input type="text" value={form.height_min} onChange={changeHandler} name="height_min" placeholder='Ingrese Centimetros'></input>
                    {errors.height_min && <div className='error'>{errors.height_min}</div>}

                </div>
                <div>
                    <label>Altura Maxima: </label>
                    <input type="text" value={form.height_max} onChange={changeHandler} name="height_max" placeholder='Ingrese Centimetros'></input>
                    {errors.height_max && <div className='error'>{errors.height_max}</div>}

                </div>
                <div>
                    <label>Peso Minimo: </label>
                    <input type="text" value={form.weight_min} onChange={changeHandler} name="weight_min" placeholder='Ingrese KGs'></input>
                    {errors.weight_min && <div className='error'>{errors.weight_min}</div>}
                </div>
                <div>
                    <label>Peso Maximo: </label>
                    <input type="text" value={form.weight_max} onChange={changeHandler} name="weight_max" placeholder='Ingrese KGs'></input>
                    {errors.weight_max && <div className='error'>{errors.weight_max}</div>}
                </div>
                <div>
                    <label>Esperanza de Vida: </label>
                    <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" placeholder='Ingrese Años'></input>
                    {errors.life_span && <div className='error'>{errors.life_span}</div>}
                </div>

                <div>
                    <label>Temperamentos: </label>
                    <select multiple defaultValue={form.temperaments} onChange={changeHandlerArray} name="temperaments">
                        {temperament?.map(temperament => (
                            <option key={temperament.id} value={temperament.name}>
                                {temperament}
                            </option>
                        ))}
                    </select>
                    {errors.temperaments && <p className="error">{errors.temperaments}</p>}
                </div>
                <div>
                    <h2>Temperamentos Seleccionados:</h2>
                    <ul>
                        {form.temperaments.map((temperament) => (
                            <li key={temperament}>{temperament}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <label>URL Image: </label>
                    <input type="text" value={form.image} onChange={changeHandler} name="image" placeholder='Ingrese La URL'></input>
                    {errors.image && <div className='error'>{errors.image}</div>}
                </div>
                <button type="submit">Crear</button>
            </form>

        </div>
    )
}

/*
Este formulario debe ser controlado completamente con JavaScritp. 
No se pueden utilizar validaciones HTML, 
ni utilizar librerías especiales para esto. 
Debe contar con los siguientes campos:

Nombre.
Altura (diferenciar entre altura mínima y máxima de la raza).
Peso (diferenciar entre peso mínimo y máximo de la raza).
Años de vida.
Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
Botón para crear la nueva raza.
[IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la raza no pueda contener números, o que el peso/altura mínimo no pueda ser mayor al máximo.
*/