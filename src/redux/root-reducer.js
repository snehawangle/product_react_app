// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import {Provider} from "react-redux";
// import {createStore} from "redux";
// import reducers from "./store";

// const store = createStore(reducers);
// ReactDOM.render(<Provider store={store}>
//        <App/>
//    </Provider>,
//    document.getElementById('root')
// );


import { combineReducers } from "redux";
import productReducer from "./reducer";

const rootReducer = combineReducers({
  data: productReducer
});

export default rootReducer;