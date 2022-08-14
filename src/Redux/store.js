import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './Reducers'


export const configurestore = () => {
 const store = createStore(rootReducer, applyMiddleware(thunk))

    return store
}