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

import {applyMiddleware, createStore} from "redux";
import creteSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const sagaMiddleware = creteSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development"){
    middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

//sagaMiddleware.run(rootSaga);

export default store;