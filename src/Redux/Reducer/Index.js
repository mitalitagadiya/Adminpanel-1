import { combineReducers } from "redux";
import { CouterReducer } from "./Counter.reducer";

export const rootReducer = combineReducers({
    counter: CouterReducer 
})