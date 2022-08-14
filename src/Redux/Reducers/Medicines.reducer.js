import * as ActionTypes  from '../ActionType'


const initVal = {
    isLoading: false,
    Medicines:[],
    error: ''
}

export const MedicinesReducer = (state=initVal, action) => {
    switch(action.type) {
        case ActionTypes.GET_MEDICINES:
            return{
                ...state,
                isLoading: false,
                Medicines:action.payload,
                error: ''
            }
            default:
             return state
    }
}