import {
    GET_ALL_DOGS,
    SEARCH_BY_NAME,
    GET_DOG_DETAILS,
    GET_TEMPERAMENTS,
//  GET_DOGS_BY_TEMP,
    ORDER_BY,
    FILTER_BY
} from "../actions/constantes";

const initialState = {
    allDogs: [],
    dogDetails: {},
    temperaments: [],
    filtered: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                filtered: action.payload
            };


        case GET_DOG_DETAILS:
            return {
                ...state,
                dogDetails: action.payload
            };


        case SEARCH_BY_NAME:
            return {
                ...state,
                allDogs: action.payload,
                filtered: action.payload
            };


        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };

        // Filtrado de perros por diferentes criterios
        case FILTER_BY:

        if (action.payload === 'default') {
            return { ...state, filtered: state.allDogs }
        } else if (action.payload === 'DB') {
            return { ...state, filtered: state.filtered.filter((dog) => dog.created) }
        } else if (action.payload === 'API') {
            return { ...state, filtered: state.filtered.filter((dog) => dog.created === false) }
        } else {
            const filteredDogs = state.allDogs.filter((dog) => {
                return dog.temperament && dog.temperament.includes(action.payload)
            });
            return { ...state, filtered: filteredDogs }
        }
        

        // Ordenamiento de perros por orden alfabético
        case ORDER_BY:
            const { payload } = action;
            let filteredCopy = [...state.filtered];
            if (payload === 'A-Z') {
                filteredCopy.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
            } else if (payload === 'Z-A') {
                filteredCopy.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
            } else if (payload === 'MIN - MAX') {
                filteredCopy.sort((a, b) => {
                    return a.weight[0] - b.weight[1];
                });
            } else if (payload === 'MAX - MIN') {
                filteredCopy.sort((a, b) => {
                    return b.weight[1] - a.weight[0];
                });
            }
            return {
                ...state,
                filtered: filteredCopy
            };


        default:
            return state;
    }
};