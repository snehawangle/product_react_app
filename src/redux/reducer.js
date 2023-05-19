// let initialState = {};
// function butterBread(state = initialState, action) {
//   if (action.type === 'BUTTER_BREAD') {
//     let newState;
//     if (action.bothSides) {
//       newState = butterSides(initialState, true);
//     }else {
//       newState = butterSides(initialState, false);
//     }
//     return newState;
//   } else {
//     return state
//   }
// }

// function butterSides(initialState, bothSides){
//   let newBreadState = Object.assign(initialState);
//   newBreadState.butterBothSides = bothSides;
//   return newBreadState;
// }
import * as types from "./actionType";

const initialState ={
  products: [],
  loading: false,
  error: null
}

const productReducer = (state = initialState, action) => {
  switch(action.type){
    case types.LOAD_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default productReducer;