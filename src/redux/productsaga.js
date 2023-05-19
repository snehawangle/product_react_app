import {take, takeEvery, takeLatest, put,all, delay, fork, call } from "redux-saga/effects";
import * as types from "./actionType";

import { loadProductSuccess, loadProductError } from "./actions";
import { loadProductsApi } from "./api";

export function onLoadProducts(){
    //yield takeEvery(types.LOAD_PRODUCTS_START, onLoadProductStartAsync)
    try{
        const response = yield call(loadProductsApi);
    }
}

const productSaga = [
    fork(onLoadProducts)
]

export default onLoadProducts(){
    yield all(...productSaga)
}