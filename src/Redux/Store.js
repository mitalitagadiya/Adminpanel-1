import { createStore } from 'redux'
import { rootReducer } from './Reducer/Index';

export const configurestore = () => {

    let store = createStore(rootReducer)

    return store;
}
