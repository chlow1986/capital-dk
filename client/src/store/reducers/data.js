import {FETCH_LIST} from '../actions';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case `${FETCH_LIST}_SUCCESS`:
      const result = action.payload;
      console.log("results reducer : ", result);
      // const pokemonResultsList = results.map(pokemon => {
      //   const id = parseInt(getId(pokemon.url), 10);
      //   return { id, ...pokemon };
      // });
      return {
        ...state,
        ...result,
        isLoading: false,
      };
    case `${FETCH_LIST}_FAIL`:
      console.log("results reducer failed: ");
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}