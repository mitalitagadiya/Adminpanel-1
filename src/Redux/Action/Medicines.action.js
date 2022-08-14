
import * as ActionTypes from '../ActionType'

export const getMedicinesAction = () => (dispatch) => {

    try {
        fetch('http://localhost:3004/Medicines')
            .then((response) => response.json())
            .then((data) => dispatch({type:ActionTypes.GET_MEDICINES, payload: data}));
    } catch (e) {

    }


}