import {
    GET_ALL_DOGS,
    SEARCH_BY_NAME,
    GET_DOG_DETAILS,
    GET_TEMPERAMENTS,
    GET_DOGS_BY_TEMP,
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
            }
            if (action.payload === 'DB') {
                return { ...state, filtered: state.filtered.filter((dog) => dog.created) }
            }
            if (action.payload === 'API') {
                return { ...state, filtered: state.filtered.filter((dog) => !dog.created) }
            } break;

        case GET_DOGS_BY_TEMP:
            return {
                ...state,
                filtered: action.payload
            };


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
            }
            return {
                ...state,
                filtered: filteredCopy
            };


        default:
            return state;
    }
};