import { combineReducers } from "redux";
import Medicines from "../../Containers/Medicines/Medicines";
import { CounterReducer } from "./Counter.reducer";
import { MedicinesReducer } from "./Medicines.reducer";

 

 export const rootReducer = combineReducers({
    Counter:CounterReducer,
    Medicines: MedicinesReducer
})