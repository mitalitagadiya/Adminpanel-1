import { createStore } from 'redux'
import { rootReducer } from './Reducer/Index';

let store = createStore()

export const configurestore = () => {
    let store = createStore(rootReducer)
    return store;
}